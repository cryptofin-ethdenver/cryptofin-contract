const HDWalletProvider = require('@truffle/hdwallet-provider');

const dotenv = require('dotenv');
dotenv.config();

const privateKey = process.env.DEPLOYER_WALLET_PRIVATEKEY;
const goerliNode = process.env.GOERLI_TESTNET_NODE_URI;

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "5777"
    },
    goerli: {
      provider: () => new HDWalletProvider(privateKey, goerliNode),
      network_id: '5',
      gas: '800000',
      gasPrice: null
    },
  },

  mocha: {
    // timeout: 100000
  },

  compilers: {
    solc: {
      version: "0.8.9",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
      }
    }
  }
};
