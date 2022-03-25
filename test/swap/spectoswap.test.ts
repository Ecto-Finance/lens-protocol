import { ethers } from "hardhat";
import chai from 'chai';
import { solidity } from "ethereum-waffle";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { BigNumber,Contract,ContractFactory } from "ethers";
chai.use(solidity);
const { expect } = chai;

describe("SpectoSwap", function () {
	let deployer: SignerWithAddress;

	let collectionNFT: ContractFactory;
	let cNFT: Contract;

	let spectoFollowNFT:ContractFactory;
	let sfNFT: Contract;

	let spectoSwap: ContractFactory;
	let ss: Contract;

	before(async function () {
		[deployer] = await ethers.getSigners();
		collectionNFT = await ethers.getContractFactory("CollectionNFT");
		spectoFollowNFT = await ethers.getContractFactory("SpectoFollowNFT");

		spectoSwap = await ethers.getContractFactory("SpectoSwap");
	});

	beforeEach(async function () {
		// Deploy Collection NFT
		cNFT = await collectionNFT.deploy();
		await cNFT.deployed();

		// Deploy Follow NFT
		sfNFT = await collectionNFT.deploy();
		await sfNFT.deployed();

		// Deploy spectoswap with above two addresses
		let args = [cNFT.address,sfNFT.address];
		ss = await spectoSwap.deploy(...args);
		await ss.deployed();

		// mint 10 sfNFT to ss contract
		
	});

	it("should receive sent NFTs", async function() {

	});
	it("should allow swap from Collection NFT to SpectoFollowNFT", async function() {

	});

	it("should allow swap from SpectoFollowNFT to CollectionNFT", async function() {

	});

});

describe("Scenario 1: Create Profile w/ SpectoFollowNFT and swap NFT", function () {
	let deployer: SignerWithAddress;

	let collectionNFT: ContractFactory;
	let cNFT: Contract;

	let spectoFollowNFT:ContractFactory;
	let sfNFT: Contract;

	let spectoSwap: ContractFactory;
	let ss: Contract;

	before(async function () {
		[deployer] = await ethers.getSigners();
		collectionNFT = await ethers.getContractFactory("CollectionNFT");
		spectoFollowNFT = await ethers.getContractFactory("SpectoFollowNFT");

		spectoSwap = await ethers.getContractFactory("SpectoSwap");
	});

	beforeEach(async function () {
		// Deploy Collection NFT
		cNFT = await collectionNFT.deploy();
		await cNFT.deployed();

		// Deploy Follow NFT
		sfNFT = await collectionNFT.deploy();
		await sfNFT.deployed();

		// Deploy spectoswap with above two addresses
		let args = [cNFT.address,sfNFT.address];
		ss = await spectoSwap.deploy(...args);
		await ss.deployed();

		// mint 10 sfNFT to ss contract

	});

	// Create Profile with SpectoFollowerNFT

	// Swap one CollectionNFT for one SpectoFollowNFT and check tokenId for accuarcy

	it("should show all minted and owned by deployer", async function() {

	});

	it("should allow swap from CollectionNFT to SpectoFollowNFT", async function() {

	});

});