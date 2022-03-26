module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy } = deployments

  let accounts = await ethers.getSigners();
  let args = [accounts[1].address,accounts[2].address];
  await deploy("SpectoSwap", {
    from: accounts[0].address,
    args:args,
    log: true,
    deterministicDeployment: false
  })
}

module.exports.tags = ["SpectoSwap"]


