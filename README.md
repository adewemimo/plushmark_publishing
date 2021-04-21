# PLUSHMARK PUBLISHING

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#cold-pitch-for-plushmark">Cold Pitch for the Project - PlushMark</a></li>
        <li><a href="#developer-bio">Developer's Bio</a></li>
        <li><a href="#problem-statement">Problem Statement</a></li> 
        <li><a href="#why-blockchain">Why Blockchain?</a></li>
        <li><a href="#benefits">Benefits</a></li>
        <li><a href="#requirements">Project Requirements</a></li>
      </ul>
    </li>
     <li>
      <a href="#system-architecture">System Architecture and Specifications</a>
      <ul>
        <li><a href="#usecase-diagram">UseCase Diagram</a></li>
        <li><a href="#sequence-diagram">Sequence Diagram</a></li>
        <li><a href="#case-diagram">Case Diagram</a></li>
        <li><a href="#smartcontract-specifications">Smart Contract Specifications</a></li>
      </ul>
    </li>
    <li>
      <a href="#components-installation">Components and Installation</a>
      <ul>
        <li><a href="#technology-stack">PlushMark DApp Components and Technology Stack</a></li>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
        <a href="#additional-documentation">Additional Documentation</a>
      <ul>
        <li><a href="#project-presentation-deck">Project Presentation Deck</a></li>
        <li><a href="#competitive-feature-matrix">Competitive Feature Matrix</a></li>
        <li><a href="#market-opportunity">Market Opportunity and ROI</a></li>
        <li><a href="#resume">Resume</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#acknowledgements">Acknowledgements</a></li>
      </ul>
    </li>
  </ol>
</details>


## ABOUT THE PROJECT
### Cold Pitch for Project - PlushMark
PlushMark Publishing is a decentralized  borderless peer-to-peer publishing platform that would serve as a level playing ground for writers and would encourage interactions among publishers, authors, translators, editors and reader. It would also provide a mechanism for copyright and licensing of authors' works especially the best ones. Essentially, it is a marketplace for publishers, authors and any interested parties. 
Blockchain technology is considered for this project because of its following features - 
•	decentralization, 
•	Immutable database, 
•	direct payment using cryptocurrency and 
•	inclusion of smart contract.
The platform would be an Ethereum based platform.
The project's scope is 
•	an implementation of a smart contract that handles licensing, sales and/or resales of Tokens which represent copies of digital materials/books and collectible made from bestsellers with inclusion of art and, 
•	integration with decentralized cloud storage.

### Developer's Bio
Seun Soetan is a blockchain software developer. She also possessed more than five years plus of experience as an I.T. System Support and Business Analyst. Seun is currently studying blockchain development at George Brown College, Toronto, and she would be graduating in August 2021. She has a Bachelor of Science in Computer Science and Masters in Geoinformatics. Her main interests are implementing optimal solutions that allow for easier completion of tasks, researching and developing blockchain based applications.

### Problem Statements
Publishers and authors have difficulties in managing copyrights of the books published and intellectual properties. Authors are looking for avenues where their work is easily assessable to others and, they can collaborate with other actors(publishers, editors, translators, e.t.c) in the industry when needed to have a successful book launch. Also, authors who want to publish their work without the publishers currently find it difficult to do so because of the lack of a platform to facilitate independent publishing. Publishers are looking for ways to generate more revenue in the sales of their published books for example bestsellers with additional features like author’s signatures, celebrity signature and/or some forms of art included in the book to make limited collectibles or editions. In the resales of books(secondary market) by readers, both authors and publishers are looking to get rewarded from the sales of these books which would limit the negative impacts of these secondary markets on the direct sales of their own books (primary market).

### Why Blockchain?

### Benefits
* Generate new revenue
* Increases Efficiency
* Easy accessibility

#### Generate New Revenue
Author and publishers will through this platform have access to new stream of revenue through:
* conversion of bestsellers and published books to NFTs for sales on the platform.
* authors can easily published other works thereby creating for them additional income


#### Increases Efficiency
efficiency in publishing process is increased with the use of smart contracts where each smart contract would have its own specifics as dictated by the author and publishers. Since this is an open plaform, publishers can easily search out for authors with great works and license these materials. The DApp would also make the managing of copyrights and intellectual properties more efficient.

#### Easy accessibility
It is a borderless, open platform that allows for easy accessibilty to author's best works and also subject matter experts in the indusrty for a successful project launch. The easy accessiblity factor encourages and promotes collaboration.  


### Project Requirements
The following user stories are considered to be implemented in the PlushMark Publishing DApp:
* As an author, I want to be able to create my own digital book in the DApp and know the number of NFTs for the copies of the book in circulation so that it is easy for me to manage copyright.
* As a publisher, I want to have approval from the authors on the DApp to create tokens for copies of digital books as this means I published the books.
* When a book contract is created, the DApp should have the address of the creator.
* When approval is given to the publisher, DApp should have the address of the approved.
* As a publisher, I want to be able to convert my bestsellers to collectibles and tokenized them on the DApp with a limited edition in circulation so that I can trade them.
* As a reader, I want to be able to purchase token on the DApp so I have the copyright to a copy of a book.
* As an author or a publisher, I should be able to be credited for the sale of a token.
* As a reader, I should be able to transfer ownership of token so I can resell. 
* As an author or a publisher, I should be able to get a percentage from the re-transfer of token. 
* The DApp should be able to list all book contracts created on the platform.


## Components and Installation
### PlushMark DApp Components and Technology Stack

* Contract Factory that creates the book smart contracts and defines the basic structure of the contracts
* Smart contracts that implement ERC721 Non-Fungible (book) Tokens using Hardhat, and solidity programming language
* A web frontend using next.js
* Ethers library to connect to Ethereum chains (via Metamask)
* an IPFS connection to upload book to get the hash for use in creating the smart contract. 












This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
