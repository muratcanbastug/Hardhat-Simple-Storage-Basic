const { task } = require('hardhat/config');

task('block-number', 'Prints the current block numbers').setAction(
  async (taskArgs, hre) => {
    const blockNumber = await ethers.provider.getBlockNumber();
    console.log(`Current Block Number: ${blockNumber}`);
  }
);

module.exports = {};
