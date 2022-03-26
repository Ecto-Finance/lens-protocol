import { ethers } from "hardhat";
import chai from 'chai';
import { solidity } from "ethereum-waffle";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { BigNumber,Contract,ContractFactory } from "ethers";
chai.use(solidity);
const { expect } = chai;

describe("SpectoSwap", function () {
	let deployer: SignerWithAddress;
	let address1: SignerWithAddress;

	let collectionNFT: ContractFactory;
	let cNFT: Contract;

	let spectoFollowNFT:ContractFactory;
	let sfNFT: Contract;

	let spectoSwap: ContractFactory;
	let ss: Contract;
	let tokenAmt:number;

	before(async function () {
		[deployer,address1] = await ethers.getSigners();
		collectionNFT = await ethers.getContractFactory("CollectionNFT");
		spectoFollowNFT = await ethers.getContractFactory("SpectoFollowNFT");

		spectoSwap = await ethers.getContractFactory("SpectoSwap");
	});

	beforeEach(async function () {
		// Deploy Collection NFT
		cNFT = await collectionNFT.deploy();
		await cNFT.deployed();

		// Deploy Specto Follow NFT
		sfNFT = await spectoFollowNFT.deploy();
		await sfNFT.deployed();

		// Deploy spectoswap with above two addresses
		let args = [cNFT.address,sfNFT.address];
		ss = await spectoSwap.deploy(...args);
		await ss.deployed();

		tokenAmt = 1;
		// mint cNFT to deployer
		await cNFT.mint(tokenAmt);
		// Approve ss to spend cNFT
		cNFT.setApprovalForAll(ss.address,true);
		sfNFT.setApprovalForAll(ss.address,true);
		
		// mint sfNFT to address1
		await sfNFT.connect(address1).mint(tokenAmt);
		// Transfer NFTs to SpectoSwap Address
		for(let i=0;i<tokenAmt;i++){
			await sfNFT.connect(address1)['safeTransferFrom(address,address,uint256)'](address1.address,ss.address,i);
		}
	});

	it("should set approve all for SpectoSwap for cNFT", async function() {
		// check if approved for all
		let approveC = await cNFT.isApprovedForAll(deployer.address,ss.address)
		expect(true).to.be.equal(approveC);
		//let approveSF = await sfNFT.isApprovedForAll(address1.address,ss.address)
		//expect(true).to.be.equal(approveSF);
	});

	it("check wallet of deployer and spectoswap", async function() {
		/*for(let i=0;i<tokenAmt;i++){
			await cNFT['safeTransferFrom(address,address,uint256)'](deployer.address,ss.address,i);
		}*/

		let tokenIds = await cNFT.walletOfOwner(deployer.address);
		expect(tokenIds.toString()).to.be.equal('0');

		let tokenIds1 = await sfNFT.walletOfOwner(ss.address);
		expect(tokenIds1.toString()).to.be.equal('0');
	});

	it("should allow swap from Collection NFT to SpectoFollowNFT", async function() {
		let tokenId = 0;
		let res = await ss.connect(deployer).swapToLens(tokenId);
		// SpectoSwap should have cNFT
		let tokenIdOut = await cNFT.walletOfOwner(ss.address);
		expect(tokenIdOut.toString()).to.be.equal('0');

		// Deployer should have sfNFT
		let tokenIdOut1 = await sfNFT.walletOfOwner(deployer.address);
		expect(tokenIdOut1.toString()).to.be.equal('0');

		// Check emitted event
		expect(res).to.emit(ss,'SwapToLens');

	});

	it("should allow swap from SpectoFollowNFT to CollectionNFT", async function() {

		// Need to swap TO Specto First ///////////////////////////////
		let tokenId = 0;
		let resTo = await ss.connect(deployer).swapToLens(tokenId);
		// SpectoSwap should have cNFT
		let tokenIdOut = await cNFT.walletOfOwner(ss.address);
		expect(tokenIdOut.toString()).to.be.equal('0');

		// Deployer should have sfNFT
		let tokenIdOut1 = await sfNFT.walletOfOwner(deployer.address);
		expect(tokenIdOut1.toString()).to.be.equal('0');

		// Check emitted event
		expect(resTo).to.emit(ss,'SwapToLens');
		///////////////////////////////////////////////////////////////

		let resFrom = await ss.connect(deployer).swapFromLens(tokenId);
		// SpectoSwap should have cNFT
		let tokenIdOut2 = await cNFT.walletOfOwner(deployer.address);
		expect(tokenIdOut2.toString()).to.be.equal('0');

		// Deployer should have sfNFT
		let tokenIdOut3 = await sfNFT.walletOfOwner(ss.address);
		expect(tokenIdOut3.toString()).to.be.equal('0');

		// Check emitted event
		expect(resFrom).to.emit(ss,'SwapFromLens');

	});

});

