//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';

contract Swap is ERC721Enumerable {

    address collectionNFTAddress;

    constructor(address _collectionNFTAddress) {
        collectionNFTAddress = _collectionNFTAddress;
    }
    
    function swap(uint256 tokenId) external view {
        require(IERC721(collectionNFTAddress).ownerOf(tokenId) == msg.sender, "Not an NFT owner");
        IERC721(collectionNFTAddress).safeTransferFrom(msg.sender, collectionNFTAddress, tokenId);

    }
}

