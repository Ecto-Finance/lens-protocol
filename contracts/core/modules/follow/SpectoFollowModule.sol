// SPDX-License-Identifier: AGPL-3.0-only

pragma solidity 0.8.10;

import {IFollowModule} from '../../../interfaces/IFollowModule.sol';
import {Errors} from '../../../libraries/Errors.sol';
import {Events} from '../../../libraries/Events.sol';
import {ModuleBase} from '../ModuleBase.sol';
import {FollowValidatorFollowModuleBase} from './FollowValidatorFollowModuleBase.sol';
import {IERC721} from '@openzeppelin/contracts/token/ERC721/IERC721.sol';

/**
 * @title ApprovalFollowModule
 * @author Lens Protocol
 *
 * @notice This follow module only allows addresses that are approved for a profile by the profile owner to follow.
 */
contract SpectoFollowModule is IFollowModule, FollowValidatorFollowModuleBase {
    
    // Collection address
    address collection;

    constructor(address hub) ModuleBase(hub) {}

    /**
     * @notice This follow module works on custom profile owner approvals.
     *
     * @param data The arbitrary data parameter, decoded into:
     *      address[] addresses: The array of addresses to approve initially.
     *
     * @return An abi encoded bytes parameter, which is the same as the passed data parameter.
     */
    function initializeFollowModule(uint256 profileId, bytes calldata data)
        external
        override
        onlyHub
        returns (bytes memory)
    {
        address owner = IERC721(HUB).ownerOf(profileId);
        if (msg.sender != owner) revert Errors.NotProfileOwner();
        address[] memory collection = abi.decode(data, (address[]));
        return data;
    }

    /**
     * @dev Processes a follow by:
     *  1. Validating that the follower has been approved for that profile by the profile owner
     */
    function processFollow(
        address follower,
        uint256 profileId,
        bytes calldata data
    ) external override onlyHub {
        address owner = IERC721(HUB).ownerOf(profileId);
        if (msg.sender != owner) revert Errors.NotProfileOwner();
    }

    /**
     * @dev We don't need to execute any additional logic on transfers in this follow module.
     */
    function followModuleTransferHook(
        uint256 profileId,
        address from,
        address to,
        uint256 followNFTTokenId
    ) external override {}
}
