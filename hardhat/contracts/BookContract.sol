
// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract BookContract is ERC721 {

    uint256 public totalCount;
    uint256 public soldCount;
    bool published;
    address payable bookFactory;

    struct BookCopy{
        uint256 copyNumber;
        uint256 price;
        address tokenHolder;
        address author;
        address publisher;
        SoldStatus status;
    }

    enum SoldStatus {FOR_SALE, SOLD}

    BookCopy[] public bookCopies;

    mapping(uint256 => BookCopy) public bookTokens;

    //uint256 public bookBalance;
    uint256 public authorBalance;
    uint256 public publisherBalance;
    uint256 public contractBalance;

    bool lock;

    event bookTokenCreated(uint256 indexed tokenID);



    constructor(string memory _bookTitle_, string memory _bookSymbol_, bool _published_) ERC721(_bookTitle_, _bookSymbol_) {
        published = _published_;
        bookFactory = payable(address(msg.sender));
    }

    modifier onlyOwner(uint256 _tokenId){
        require(msg.sender == bookTokens[_tokenId].publisher || msg.sender == bookTokens[_tokenId].author, "Published Right: restricted");
        _;
    }


    function createBookToken(uint256 _price, address _author) public {

        //bool published should be set to true before token can be created
        require(published == true, "published not yet set");

        totalCount++;

         BookCopy memory _book = BookCopy ({
            copyNumber : totalCount,
            price : _price,
            tokenHolder : msg.sender,
            publisher: msg.sender,
            author: _author,
            status: SoldStatus.FOR_SALE
         });

        //create unique Id for the tokens
        bookCopies.push(_book);
        uint256 tokenId = bookCopies.length - 1;

        _safeMint(msg.sender, tokenId);

        bookTokens[tokenId] = _book;

        emit bookTokenCreated(tokenId);

    }

    function setPublishedState(bool publishedState, uint256 _tokenId) public onlyOwner(_tokenId) {
        published =  publishedState;
    }

    function buyBook(uint256 _tokenId)public payable{
       
        require(msg.value >= bookTokens[_tokenId].price);
        require(msg.sender != address(0));
        address payable buyer = payable(address(msg.sender));
            
        if (msg.value > bookTokens[_tokenId].price) {
                 buyer.transfer(msg.value - bookTokens[_tokenId].price);
            }

        contractBalance += bookTokens[_tokenId].price * 10/100;
        authorBalance += bookTokens[_tokenId].price * 50/100;
        publisherBalance += bookTokens[_tokenId].price * 40/100;
        soldCount++;

    }

    function transferBookToken(address buyer, uint _tokenId)public {
        require(msg.sender != address(0));
        address owner = msg.sender;

        transferFrom(owner, buyer, _tokenId);
        bookTokens[_tokenId].tokenHolder = buyer;
        bookTokens[_tokenId].status = SoldStatus.SOLD;


    }

    function authorClaim(address payable author, uint256 _tokenId) public payable {
        require(author == bookTokens[_tokenId].author, "Wrong Author");
        uint amount = authorBalance;
        authorBalance = 0;
        author.transfer(amount);
    }

    function publisherClaim(address payable publisher, uint256 _tokenId) public payable {
        require(publisher == bookTokens[_tokenId].publisher, "Wrong Publisher");
        uint amount = publisherBalance;
        publisherBalance = 0;
        publisher.transfer(amount);
    }

    function withdrawContractBalance() public payable {
        require(!lock, "re-entrancy attack");
        lock = true;
        require(bookFactory.send(address(this).balance));
        lock = false;

    }


}