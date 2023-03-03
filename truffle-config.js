const HDWalletProvider = require('@truffle/hdwallet-provider');

const dotenv = require('dotenv');
dotenv.config();

const privateKey = process.env.DEPLOYER_WALLET_PRIVATEKEY;
const INFURA_API_KEY = process.env.INFURA_API_KEY;

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "5777"
    },
    goerli: {
      provider: () => new HDWalletProvider(privateKey, `https://goerli.infura.io/v3/${INFURA_API_KEY}`),
      network_id: '5',
      gas: '800000',
      gasPrice: null,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    mumbai: {
      provider: () => new HDWalletProvider(privateKey, `https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}`),
      network_id: 80001,
      gas: '800000',
      gasPrice: null,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    aurora: {
      provider: () => new HDWalletProvider(privateKey, `https://aurora-testnet.infura.io/v3/${INFURA_API_KEY}`),
      network_id: 1313161555,
      gas: '800000',
      gasPrice: null,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    base: {
      provider: () => new HDWalletProvider(privateKey, `https://goerli.base.org/`),
      network_id: 84531,
      gas: '800000',
      gasPrice: null,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    scroll: {
      provider: () => new HDWalletProvider(privateKey, `https://alpha-rpc.scroll.io/l2`),
      network_id: 534353,
      gas: '800000',
      gasPrice: null,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
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
