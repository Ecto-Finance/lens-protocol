/*// Deploy script 
import '@nomiclabs/hardhat-ethers';
import { hexlify, keccak256, RLP } from 'ethers/lib/utils';
import fs from 'fs';
import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {
  LensHub__factory,
  ApprovalFollowModule__factory,
  CollectNFT__factory,
  Currency__factory,
  EmptyCollectModule__factory,
  FeeCollectModule__factory,
  FeeFollowModule__factory,
  FollowerOnlyReferenceModule__factory,
  FollowNFT__factory,
  InteractionLogic__factory,
  LimitedFeeCollectModule__factory,
  LimitedTimedFeeCollectModule__factory,
  ModuleGlobals__factory,
  PublishingLogic__factory,
  RevertCollectModule__factory,
  TimedFeeCollectModule__factory,
  TransparentUpgradeableProxy__factory,
  ProfileTokenURILogic__factory,
  LensPeripheryDataProvider__factory,
} from '../../typechain-types';
import { deployWithVerify, waitForTx } from '../helpers/utils';


const TREASURY_FEE_BPS = 50;
const LENS_HUB_NFT_NAME = 'Various Vegetables';
const LENS_HUB_NFT_SYMBOL = 'VVGT';

task('specto-swap-deploy', 'deploys specto-swap').setAction(async ({}, hre: HardhatRuntimeEnvironment) => {
    // Note that the use of these signers is a placeholder and is not meant to be used in
    // production.
	 const {deployer} = await hre.getNamedAccounts();
	 const {deploy} = hre.deployments;

    const ethers = hre.ethers;
    const accounts = await ethers.getSigners();
  
	console.log('\n\t -- Deploying CollectionNFT --');


	console.log('\n\t -- Deploying FollowerNFT --');


    console.log('\n\t -- Deploying Specto --');

    let args = [accounts[1].address,accounts[2].address];

	await deploy("SpectoSwap", {
		from: accounts[0].address,
		args:args,
		log: true,
		deterministicDeployment: false
	})
    /*const moduleGlobals = await deployWithVerify(
      new ModuleGlobals__factory(deployer).deploy(
        governance.address,
        treasuryAddress,
        TREASURY_FEE_BPS,
        { nonce: deployerNonce++ }
      ),
      [governance.address, treasuryAddress, TREASURY_FEE_BPS],
      'contracts/swaps/spectoSwap'
    );
  
    console.log('\n\t-- Deploying Specto Swap --');  
});*/