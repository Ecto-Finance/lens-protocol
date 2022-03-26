//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol';

contract SpectoSwap is IERC721Receiver, ERC721Enumerable, Ownable {

    
	// Original non-lens NFT
    address collectionNFTAddress;
    // Lens Follow NFT
    address followNFTAddress;

    error NotNFTOwner();

    event SwapToLens();
    event SwapFromLens();

    constructor(address _collectionNFTAddress, address _followNFTAddress) ERC721('test','test') {
        collectionNFTAddress = _collectionNFTAddress;
        followNFTAddress = _followNFTAddress;
        
    }

    /**
	 * @notice Allows swap to lens NFT
	 * @param tokenId of collection NFT you wish to swap
	 * 
	 */
    function swapToLens(uint256 tokenId) external {
        if(IERC721(collectionNFTAddress).ownerOf(tokenId) != msg.sender) revert NotNFTOwner();
        IERC721(collectionNFTAddress).safeTransferFrom(msg.sender, address(this), tokenId);
        IERC721(followNFTAddress).safeTransferFrom(address(this), msg.sender, tokenId);
        emit SwapToLens();
    }

	/**
	 * @notice Allows swap from lens
	 * @param tokenId of follow NFT you wish to swap
	 * 
	 */
    function swapFromLens(uint256 tokenId) external {
        if(IERC721(followNFTAddress).ownerOf(tokenId) != msg.sender) revert NotNFTOwner();
        IERC721(followNFTAddress).safeTransferFrom(msg.sender, address(this), tokenId);
        IERC721(collectionNFTAddress).safeTransferFrom(address(this), msg.sender, tokenId);
        emit SwapFromLens();
    }

    function updateCollectionNFTAddress(address _newAddress) public onlyOwner {
        collectionNFTAddress = _newAddress;
    }

    function updateFollowNFTAddress(address _newAddress) public onlyOwner {
        followNFTAddress = _newAddress;
    }

    function onERC721Received(address,address from, uint256, bytes calldata) external pure override returns(bytes4){
    	require(from != address(0x0));
    	return IERC721Receiver.onERC721Received.selector;
    }
}