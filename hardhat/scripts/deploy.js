const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const BookContractFactory = await ethers.getContractFactory("BookContractFactory");
  const bookContractFactory = await BookContractFactory.deploy();

  await bookContractFactory.deployed();

  //await bookContractFactory.wait();

  console.log("Book Contract Factory Address :", bookContractFactory.address);

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });








  

