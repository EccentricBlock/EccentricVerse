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