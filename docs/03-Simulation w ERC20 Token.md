# Blockchain Simulation with ERC20 Token

This page will walk through the process of deploying an ERC20 token and simulating transactions between a number of on-chain accounts.


## Prerequisites:

1. [Core Software Installed (e.g. Hardhat)](./01-Base%20Software%20Install.md)
2. [A new Hardhat environment set up.](./02-Setup.md)
3. [BIP44 wallet integration to provide the first 10 accounts in Hardhat.](./02-Setup.md)

## Step-by-step Guide:

### 1. Install the Required OpenZeppelin Packages:

```bash
yarn add @openzeppelin/contracts
```

### 2. Create the ERC20 Token Contract:

Using OpenZeppelin's ERC20 contract, create a new contract in `contracts/ERC20/CreditsToken.sol`:

```Java
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CreditsToken is ERC20 {
    constructor() ERC20("Credits", "CREDIT") {
        _mint(msg.sender, 10000000 * (10 ** uint256(decimals()))); // Minting 10 million tokens
    }
}
```

#### 4. Create the Deployment Script:

In `scripts/ERC20/CreditsToken/deploy.js`:

```javascript
const hre = require("hardhat");

async function main() {
    const [deployer, account1, account2, account3, ...rest] = await hre.ethers.getSigners();
    
    // Deploy the Credits token, searches ./contracts/
    const CreditsToken = await hre.ethers.getContractFactory("CreditsToken");

    // Deploy the contract to the chain
    const credits = await CreditsToken.deploy();
    await credits.deployed(); // wait until action complete

    console.log("Credits Token deployed to:", credits.address);

    // Distribute the initial 100 tokens to the first 3 accounts
    // Assuming 18 decimals in the token
    const initialAmount = hre.ethers.utils.parseUnits('100', 18); 
    
    // Distribute funds between the first 3 accounts
    await credits.transfer(account1.address, initialAmount);
    await credits.transfer(account2.address, initialAmount);
    await credits.transfer(account3.address, initialAmount);

    console.log("Initial tokens distributed to 3 accounts.");
}

main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});

```

#### 5. Execute Transactions:

In `scripts/ERC20/CreditsToken/executeTransactions.js`:

```javascript
const hre = require("hardhat");

async function main() {
    const accounts = await hre.ethers.getSigners();
    const pounds = await hre.ethers.getContractAt("PoundsToken", "<DEPLOYED_CONTRACT_ADDRESS>");

    for(let i = 1; i <= 3; i++) {
        for(let j = 1; j <= 3; j++) {
            let recipientIndex = Math.floor(Math.random() * 10);
            while (recipientIndex == i) {
                recipientIndex = Math.floor(Math.random() * 10);  // Ensure sender is not recipient
            }
            
            const amount = Math.floor(Math.random() * 33) + 1; // Random amount between 1 and 33
            await pounds.connect(accounts[i]).transfer(accounts[recipientIndex].address, amount * (10 ** 18));

            console.log(`Account ${i} transferred ${amount} Pounds to Account ${recipientIndex}`);
        }
    }
}

main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});
```

Replace `<DEPLOYED_CONTRACT_ADDRESS>` with the address of the deployed `PoundsToken`.

#### 6. Run the Scripts:

1. Deploy the contracts and distribute initial tokens:

   ```bash
   npx hardhat run scripts/ERC20/CreditsToken/deploy.js --network hardhat
   ```

2. Execute random transactions:

   ```bash
   npx hardhat run scripts/ERC20/CreditsToken/executeTransactions.js --network hardhat
   ```

### Expected Result:

After following the steps above, you'll have a Hardhat environment where an ERC20 token `pounds` has been deployed. Three accounts would have 100 tokens each and would have made random transactions to other accounts.

Always remember to keep your BIP44 mnemonic secure and do not expose it in a public repository.