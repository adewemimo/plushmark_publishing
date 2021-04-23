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
    let buyer



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
        it("Should be able to get book Id and BookContract address and the contract creator", async () => {

            expect(receipt.events[0].args).to.have.property("creator");
            expect(receipt.events[0].args).to.have.property("bookId");
            expect(receipt.events[0].args).to.have.property("bookAddress");
        })


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

    describe("Test cases to bookContract - createBookToken, buy token and claim rewards", async () => {

        it ("create book token and check the token owner", async() => {
            let price = "2000000000000000000";
            let tokenID = 0;
            const SpecificBookAddress = receipt.events[0].args["bookAddress"];
            const SpecificBookContract = BookContract.attach(SpecificBookAddress);

            await SpecificBookContract.connect(bookContractCreator).createBookToken(price, author.getAddress());

            expect(await SpecificBookContract.totalCount()).to.equal(1);
            expect(await SpecificBookContract.ownerOf(tokenID)).to.equal(bookContractCreator.address);


        })

        it("test buyBook()", async() => {
            let tokenID = 0;
            // let price = "2000000000000000000";
            const SpecificBookAddress = receipt.events[0].args["bookAddress"];
            const SpecificBookContract = BookContract.attach(SpecificBookAddress);

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
            const gasPrice = await bookContractCreator.getGasPrice();

            const SpecificBookAddress = receipt.events[0].args["bookAddress"];
            const SpecificBookContract = BookContract.attach(SpecificBookAddress);
            const withdraw = await SpecificBookContract.connect(bookContractCreator).publisherClaim(bookContractCreator.getAddress(),tokenID);
            const tx = await withdraw.wait();
            const transactionFee = (tx.gasUsed)*gasPrice;
            const expectedNewBalance = (BigInt(oldBalance) - BigInt(transactionFee)) + BigInt(withdrawedAmount);

            const newBalance = await ethers.provider.getBalance(bookContractCreator.getAddress());

            expect((BigInt(newBalance)).toString()).to.equal(expectedNewBalance.toString());
        })

        it("Author to claim ", async() => {
            let tokenID = 0;
            const authorWithdrawedAmount = 2000000000000000000* (50/100);
            const oldAuthorBalance = await ethers.provider.getBalance(author.getAddress());
            

            const SpecificBookAddress = receipt.events[0].args["bookAddress"];
            const SpecificBookContract = BookContract.attach(SpecificBookAddress);
            const withdraw = await SpecificBookContract.connect(bookContractCreator).authorClaim(author.getAddress(), tokenID);
            const tx = await withdraw.wait();
            
            const expectedNewBalance = BigInt(oldAuthorBalance) + BigInt(authorWithdrawedAmount);
            const newAuthorBalance = await ethers.provider.getBalance(author.getAddress());
            expect(newAuthorBalance.toString()).to.equal(expectedNewBalance.toString());
        })

        // it("Marketplace Platform Owner to claim reward ", async() => {
        //     let tokenID = 0;
        //     const platformWithdrawedAmount = 2000000000000000000* (10/100);
        //     const oldFactoryBalance = await ethers.provider.getBalance(bookContractFactoryOwner.getAddress());
        //     const gasPrice = await bookContractFactoryOwner.getGasPrice();

        //     const SpecificBookAddress = receipt.events[0].args["bookAddress"];
        //     const SpecificBookContract = BookContract.attach(SpecificBookAddress);
        //     const withdraw = await SpecificBookContract.connect(bookContractFactoryOwner).withdrawContractBalance();
        //     const tx = await withdraw.wait();
        //     const transactionFee = (tx.gasUsed)*gasPrice;
        //     const expectedNewBalance = (BigInt(oldFactoryBalance) - BigInt(transactionFee)) + BigInt(platformWithdrawedAmount);
        //     const newFactoryBalance = await ethers.provider.getBalance(bookContractFactoryOwner.getAddress());
        //     expect(newFactoryBalance.toString()).to.equal(expectedNewBalance.toString());
        // })


    })
})
