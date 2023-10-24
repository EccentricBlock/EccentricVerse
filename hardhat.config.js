require("@nomicfoundation/hardhat-toolbox");


const { mnemonic } = require('./secrets.json');


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.5.3',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: '0.6.12',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: '0.8.12',
        settings: [{
          optimizer: {
            enabled: true,
            runs: 1000,
          },
          remappings: [
            "@openzeppelin/contracts/proxy/transparent/=node_modules/@openzeppelin/contracts/proxy/"
          ],          
        }],
      },
      {
        version: '0.8.20',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },
  paths: {
    artifacts: './build',
  },  
  networks: {
    hardhat: {
      accounts: {
        mnemonic: mnemonic,
        path: "m/44'/60'/0'/0", // BIP44 derivation path
        initialIndex: 0,
        count: 10, // First 10 accounts
      }
    }
  },
};
