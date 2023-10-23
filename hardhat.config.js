require("@nomicfoundation/hardhat-toolbox");


const { mnemonic } = require('./secrets.json');


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
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
