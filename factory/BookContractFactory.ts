import { ethers } from 'ethers';
import BookContractFactory from '../hardhat/src/artifacts/contracts/BookContractFactory.sol/BookContractFactory.json';
import BookContract from '../hardhat/src/artifacts/contracts/BookContract.sol/BookContract.json';

import detectEthereumProvider from '@metamask/detect-provider';

const BookContractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

// request access to the user's MetaMask account
async function requestAccount() {
  await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
}

async function createBookContract(
  bookTitle,
  bookSymbol,
  published,
  hashString
) {
  const provider = await detectEthereumProvider();
  if (provider) {
    await requestAccount();
    const accounts = await ethers.getSigners();
    console.log(accounts);
   
    const webProvider = new ethers.providers.Web3Provider(provider);
    const signer = await webProvider.getSigner();
    console.log(`signer: ${signer}`)
    const contract = new ethers.Contract(
      BookContractAddress,
      BookContractFactory.abi,
      signer[0]
    );
    const transaction = await contract.connect(signer[1].getAddress()).createBookContract(
      bookTitle,
      bookSymbol,
      published,
      hashString
    );
    console.log(`transaction ${transaction}`);
    const receipt = await transaction.wait();
    console.log(`transaction receipt ${receipt}`);
  } else {
    console.log('Please install MetaMask!');
  }
}

module.exports = {
  requestAccount,
  createBookContract,
};
