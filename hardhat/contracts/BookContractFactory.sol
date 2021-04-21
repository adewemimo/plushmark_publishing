  
// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

import "./BookContract.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BookContractFactory is Ownable {

    struct BookDetail{
        string title; 
        string symbol;
        uint256 bookID;
        address creator;
        string hashString;
    }

   mapping(address => BookDetail) public BookAuthors;

   address[] public bookAddresses;

    uint256 bookContractsCount;


    modifier notTheOwner(){
        require(msg.sender != owner(), "BookContractFactory: restricted");
        _;
    }

    event bookContractCreated(address indexed creator, uint256 indexed bookId, address indexed bookAddress);

    function createBookContract(string memory _bookTitle, string memory _bookSymbol, bool _published, string memory _hashString) external notTheOwner returns (uint256 id, address newBookAddress){
        // require that a book contract for this hash has not be created before
        
        BookContract _newBook = new BookContract(_bookTitle, _bookSymbol, _published);

        newBookAddress = address(_newBook);

        require(bytes(BookAuthors[newBookAddress].hashString).length == 0 , "contract already created");

        bookAddresses.push(newBookAddress);
        id = bookAddresses.length - 1;

        BookDetail memory newBookDetail = BookDetail({
            title: _bookTitle,
            symbol: _bookSymbol,
            bookID: id,
            creator: msg.sender,
            hashString: _hashString
        });

        BookAuthors[newBookAddress] = newBookDetail;

        bookContractsCount++;

        emit bookContractCreated(msg.sender, id, newBookAddress);

        return (id, newBookAddress);
        

    }




}