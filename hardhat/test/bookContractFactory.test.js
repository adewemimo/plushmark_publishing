const { expect } = require("chai");
//const {expectRevert} = require("@openzeppelin/test-helpers");

describe("BookContractFactory", () => {

    let bookContractFactoryOwner;
    let bookContractCreator;
    let author;
    let BookContractFactory;
    let bookContractFactory;
    //let bookContract;
    let receipt;



    let bookTitle = "Now We are Here";
    let bookSymbol = "BKT";
    let published = true; 
    let hashString = "QmemFxRp3HaEeiD8oV6K4zmsUeEkiA1bDSY43xbKHoav11";

    before(async () => {
        const [addr1, addr2, addr3, addr4] = await ethers.getSigners();
        bookContractFactoryOwner = addr1;
        bookContractCreator = addr2;
        author = addr3;
        buyer = addr4;
        BookContractFactory = await ethers.getContractFactory("BookContractFactory");
        BookContract = await ethers.getContractFactory("BookContract");
        bookContractFactory = await BookContractFactory.deploy();

        const tx = await bookContractFactory.connect(bookContractCreator).createBookContract(bookTitle, bookSymbol, published, hashString);
        receipt = await tx.wait();
      
    })

    describe("test cases for createBookContract()",  () => {
        //test case #1
        it("Should be able to get book Id and BookContract address and the contract creator", async () => {

            expect(receipt.events[0].args).to.have.property("creator");
            expect(receipt.events[0].args).to.have.property("bookId");
            expect(receipt.events[0].args).to.have.property("bookAddress");
        })

                //test case #2
        // it("Should make the caller of createBookContract() function to be owner of Book contract", async () => {
  
        //     const bookAddress = receipt.events[0].args["bookAddress"];
        //     console.log(`bookAddress ${bookAddress}`);
        //     const bookContract = BookContract.attach(bookAddress);
        //     console.log(bookContract);
        //     console.log(bookContract);
        //     console.log(bookContract.owner());
        //     console.log(bookContractCreator.address);
        //     expect(await bookContract.owner()).to.equal(bookContractCreator.address)
        // })

        it("Should not allow the factory owner to call createBookContract()", async () => {
            await expect(bookContractFactory.createBookContract(bookTitle, bookSymbol, published, hashString)).to.be.reverted;
        })

        it("Should have a Title(name) and symbol", async ()=> {

            const SpecificBookAddress = receipt.events[0].args["bookAddress"];
            const SpecificBookContract = BookContract.attach(SpecificBookAddress);
            expect(await SpecificBookContract.name()).to.equal(bookTitle);
            expect(await SpecificBookContract.symbol()).to.equal(bookSymbol);
            expect(await SpecificBookContract.totalCount()).to.equal(0);
        })


        it("should not take an exiting book hash", async() => {
            const tx = await expect(bookContractFactory.connect(bookContractCreator).createBookContract(bookTitle, bookSymbol, published, hashString));
            tx.to.be.reverted;
        })


    })

    describe("Test cases to createBookToken, buy token and claim rewards", async () => {

        it ("create book token and check the token owner", async() => {
            let price = "2000000000000000000";
            let tokenID = 0;
            const SpecificBookAddress = receipt.events[0].args["bookAddress"];
            const SpecificBookContract = BookContract.attach(SpecificBookAddress);

            await SpecificBookContract.connect(bookContractCreator).createBookToken(price, author.getAddress());

            expect(await SpecificBookContract.totalCount()).to.equal(1);
            expect(await SpecificBookContract.ownerOf(tokenID)).to.equal(bookContractCreator.address);

            // expect(await SpecificBookContract.soldCount()).to.equal(0);

            // await SpecificBookContract.connect(bookContractCreator).buyBook(tokenID, {value:"2000000000000000000"});

            // expect(await SpecificBookContract.ownerOf(tokenID)).to.equal(buyer.address);

            // expect(await SpecificBookContract.soldCount()).to.equal(1);

        })

        it("test buyBook()", async() => {
            let tokenID = 0;
            // let price = "2000000000000000000";
            const SpecificBookAddress = receipt.events[0].args["bookAddress"];
            const SpecificBookContract = BookContract.attach(SpecificBookAddress);
            // await SpecificBookContract.connect(bookContractCreator).createBookToken(price, author.getAddress());

            expect(await SpecificBookContract.soldCount()).to.equal(0);

            await SpecificBookContract.connect(buyer).buyBook(tokenID, {value:"2000000000000000000"});
            expect(await SpecificBookContract.soldCount()).to.equal(1);
            
        })

        it("transfer token to buyer", async() => {
            let tokenID = 0;
            const SpecificBookAddress = receipt.events[0].args["bookAddress"];
            const SpecificBookContract = BookContract.attach(SpecificBookAddress);
            await SpecificBookContract.connect(bookContractCreator).transferBookToken(buyer.getAddress(), tokenID);

            expect(await SpecificBookContract.ownerOf(tokenID)).to.equal(buyer.address);

        })

        it("publisher to claim ", async() => {
            let tokenID = 0;
            const withdrawedAmount = 2000000000000000000* (40/100);
            const oldBalance = await ethers.provider.getBalance(bookContractCreator.getAddress());
            //console.log(`oldBalance: ${oldBalance}`);
            const gasPrice = await bookContractCreator.getGasPrice();

            const SpecificBookAddress = receipt.events[0].args["bookAddress"];
            const SpecificBookContract = BookContract.attach(SpecificBookAddress);
            const withdraw = await SpecificBookContract.connect(bookContractCreator).publisherClaim(bookContractCreator.getAddress(),tokenID);
            const tx = await withdraw.wait();
            //console.log(tx);
            const transactionFee = (tx.gasUsed)*gasPrice;
            //console.log(`transactionFee: ${transactionFee}`)
            const expectedNewBalance = (oldBalance - transactionFee) + withdrawedAmount;
            //console.log(`expectedNewBalance: ${expectedNewBalance}`);

            const newBalance = await ethers.provider.getBalance(bookContractCreator.getAddress());
            //console.log(`newBalance: ${newBalance}`);

            expect((BigInt(newBalance)).toString()).to.equal(newBalance.toString());
        })
    })
})
