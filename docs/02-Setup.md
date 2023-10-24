# Setup.md

## Objective
Once the core software is installed, the following actions will setup a new environment ready for building simulations/use.

This environment leverages a BIP44 wallet and ensures the first ten accounts are fully functional within the Hardhat instance. (This site can help: https://iancoleman.io/bip39/ )

### Prerequisites
- A basic understanding of Hardhat.
- Hardhat installed on your system.

### Step-by-step Instructions

1. **Initialise a New Hardhat Project**:
    ```bash
    npx hardhat init
    ```

2. **Install Necessary Dependencies**:
   Ensure you have the necessary plugins and dependencies installed.
    ```bash
    yarn install
    yarn add @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers  
    ```

3. **Configuration**:
    - Edit the `hardhat.config.js` file in the root directory.
    - Ensure you set the mnemonic for your BIP44 wallet, and the path should be aligned to BIP44's specification.

    ```javascript
    const { mnemonic } = require('./secrets.json');  // This will import your mnemonic. Make sure to keep your secrets.json file secure and never commit it.

    module.exports = {
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
      // ... rest of the configuration
    };
    ```

    > **Note**: It's vital for security reasons not to commit the `secrets.json` file. Always add it to `.gitignore`. (already done in this repo)

