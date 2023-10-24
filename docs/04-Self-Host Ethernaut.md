# Build.md

## Integrating Ethernaut Smart Contracts into an Existing Hardhat Project

### Prerequisites:

blah..

### Procedure:

#### Step 1: Clone the Ethernaut Repository

To begin with, you'll want to have the Ethernaut smart contracts available locally:

```bash
cd /tmp
git clone https://github.com/OpenZeppelin/ethernaut.git
```

#### Step 2: Navigate to Your Hardhat Project Directory

Change your directory to where your existing Hardhat project resides:

```bash
cd path_to_your_project/
```

#### Step 3: Integrate Ethernaut Contracts

Copy the Ethernaut smart contracts from the cloned repository to your project's `contracts` directory:

```bash
mkdir -p contracts/Ethernaut
cp -R /tmp/ethernaut/contracts/* contracts/Ethernaut
```

#### Step 4: Install Necessary Dependencies

Ethernaut contracts might have dependencies on specific versions of openzeppelin contracts or other libraries. Ensure these are installed:

```bash
yarn add @openzeppelin/contracts@3.4.2 @openzeppelin/contracts@4.7.3

yarn add @nomicfoundation/hardhat-chai-matchers @nomicfoundation/hardhat-network-helpers @nomicfoundation/hardhat-ethers @nomicfoundation/hardhat-verify @types/chai @types/mocha @typechain/ethers-v6 @typechain/hardhat hardhat-gas-reporter solidity-coverage ts-node typescript @openzeppelin/contracts-upgradeable@4.7.3
```

You also need to manually add 2 mappings for packages within the `package.json` file (root of this repository).

```javascript
  "dependencies": {
    "@nomicfoundation/hardhat-chai-matchers": "^2.0.2",

    //long list, insert these anywhere
    "openzeppelin-contracts-06": "npm:@openzeppelin/contracts@3.4.2",
    "openzeppelin-contracts-08": "npm:@openzeppelin/contracts@4.7.3", 
    
```

#### Step 5: Update Hardhat Configuration

In your `hardhat.config.js`:

1. Ensure the compiler version in your configuration matches the ones required by the Ethernaut contracts.


```javascript
module.exports = {
    //Compilers taken from ethernauts config
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
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: '0.8.19',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
    }
    // ... other networks
  },
  // ... rest of the configuration
};
```

#### Step 6: Compile the Contracts

Ensure that all contracts, including the newly integrated Ethernaut ones, are compiling without issues:

```bash
yarn clean
yarn install
npx hardhat compile
```
