import { ethers } from 'ethers';
import BookContractFactory from '../hardhat/src/artifacts/contracts/BookContractFactory.sol/BookContractFactory.json';
import BookContract from '../hardhat/src/artifacts/contracts/BookContract.sol/BookContract.json';

import detectEthereumProvider from '@metamask/detect-provider';

const BookContractFactoryAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

// // request access to the user's MetaMask account
// async function requestAccount() {
//   await window.ethereum.request({
//     method: 'eth_requestAccounts',
//   });
// }

// Detect Metamask Ethereum provider.
// this returns the provider, or null if it wasn't detected
let provider; 

async () => {
  provider = await detectEthereumProvider();

}


if (provider) {
  startApp(provider); // Initialize your app
} else {
  console.log('Please install MetaMask!');
}

function startApp(provider) {
  // If the provider returned by detectEthereumProvider is not the same as
  // window.ethereum, something is overwriting it, perhaps another wallet.
  if (provider !== window.ethereum) {
    console.error('Do you have multiple wallets installed?');
  }
  // Access the decentralized web!
}

//access user's account from metamask
function connect() {
  ethereum
    .request({ method: 'eth_requestAccounts' })
    .then(handleAccountsChanged)
    .catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    });
}

let contract

async function createBookContract(
  bookTitle,
  bookSymbol,
  published,
  hashString
) {
  if (provider) {
    await connect();
    const webProvider = new ethers.providers.Web3Provider(provider);
    const signer = await webProvider.getSigner(0);
    console.log(`signer: ${signer.getAddress()}`)
    contract = new ethers.Contract(
      BookContractFactoryAddress,
      BookContractFactory.abi,
      signer
    );

  let currentAccount = null;
  ethereum
    .request({ method: 'eth_accounts' })
    .then(handleAccountsChanged)
    .catch((err) => {
    // Some unexpected error.
    // For backwards compatibility reasons, if no accounts are available,
    // eth_accounts will return an empty array.
    console.error(err);
    });

  // Note that this event is emitted on page load.
  // If the array of accounts is non-empty, you're already
  // connected.
  ethereum.on('accountsChanged', handleAccountsChanged);
   
  const transaction = await contract.connect(currentAccount).createBookContract(
      bookTitle,
      bookSymbol,
      published,
      hashString
    );
    console.log(`transaction ${transaction}`);
    const receipt = await transaction.wait();
    console.log(`transaction receipt ${receipt}`);
  } else {
    console.log('Error in creating Book Contract');
  }
}

// For now, 'eth_accounts' will continue to always return an array
function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts
    console.log('Please connect to MetaMask.');
  } else if (accounts[1] !== currentAccount) {
    currentAccount = accounts[1];
    // Do any other work!
  }
}

module.exports = {
  createBookContract,
};
