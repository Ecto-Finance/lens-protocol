//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';

contract Swap is ERC721Enumerable {

	// Original non-lens NFT
    address collectionNFTAddress;
    // Lens Follow NFT
    address followNFTAddress;

    error NotNFTOwner();

    event SwapToLens(address);
    event SwapFromLens(address);

    constructor(address _collectionNFTAddress, address _followNFTAddress) {
        collectionNFTAddress = _collectionNFTAddress;
        followNFTAddress = _followNFTAddress;

    }
    
    /**
	 * @notice Allows swap to lens NFT
	 * @param tokenId of collection NFT you wish to swap
	 * 
	 */
    function swapToLens(uint256 tokenId) external view {
        if(IERC721(collectionNFTAddress).ownerOf(tokenId) == msg.sender) revert NotNFTOwner();
        IERC721(collectionNFTAddress).safeTransferFrom(msg.sender, address(this), tokenId);
        IERC721(followerNFTAddress).safeTransferFrom(address(this), msg.sender, tokenId);
        emit SwapToLens(msg.sender);
    }

	/**
	 * @notice Allows swap from lens
	 * @param tokenId of follow NFT you wish to swap
	 * 
	 */
    function swapFromLens(uint256 tokenId) external view {
        if(IERC721(collectionNFTAddress).ownerOf(tokenId) == msg.sender) revert NotNFTOwner();
        IERC721(followerNFTAddress).safeTransferFrom(msg.sender, address(this), tokenId);
        IERC721(collectionNFTAddress).safeTransferFrom(address(this), msg.sender, tokenId);
        emit SwapFromLens(msg.sender);
    }
}