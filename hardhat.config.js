/** @type import('hardhat/config').HardhatUserConfig */
require('@nomicfoundation/hardhat-toolbox');
require('@nomiclabs/hardhat-etherscan');
require('dotenv').config();
require('./tasks/block-number');
require('hardhat-gas-reporter');
require('solidity-coverage');

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || 'https://eth-rinkeby';
const PRIVATE_KEY = process.env.PRIVATE_KEY || '0xkey';
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || 'key';
const LOCALHOST_RPC_URL = process.env.LOCALHOST_RPC_URL;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || 'key';

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 4,
    },
    localhost: {
      url: LOCALHOST_RPC_URL,
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    outputFile: 'gas-report.txt',
    noColors: true,
    currency: 'USD',
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: 'MATIC',
  },
  plugins: ['solidity-coverage'],
  solidity: '0.8.9',
};
