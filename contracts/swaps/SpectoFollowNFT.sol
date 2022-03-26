// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';

contract SpectoFollowNFT is ERC721Enumerable {

	constructor() ERC721("SpectoFollowNFT", "SFOL")  {}

	function mint(uint256 num) public payable {
		uint256 supply = totalSupply();
		for(uint256 i; i < num; i++){
			_safeMint( msg.sender, supply + i );
		}
	}
	
	function walletOfOwner(address _owner) public view returns(uint256[] memory) {
        uint256 tokenCount = balanceOf(_owner);

        uint256[] memory tokensId = new uint256[](tokenCount);
        for(uint256 i; i < tokenCount; i++){
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokensId;
    }
}