const { hre, utils } = require("hardhat");

async function main() {
    const [deployer, account1, account2, account3, ...rest] = await hre.ethers.getSigners();
    
    // Compile contracts if not already compiled, needed to generate the ABI for the uni pairs
    await hre.run('compile');
    const uniV2PairArtifact = await hre.artifacts.readArtifact("UniswapV2Pair");

    //SETUP TOKENS 
    const wethContract = await ethers.getContractFactory("WETH9");
    const wethToken = await wethContract.deploy();
    await wethToken.deployed();

    const creditsContract = await ethers.getContractFactory("CreditsToken");
    const creditsToken = await creditsContract.deploy();
    await creditsToken.deployed();

    const usdcContract = await ethers.getContractFactory("USDCToken");
    const usdcToken = await usdcContract.deploy();
    await usdcToken.deployed();

    //MINT USER TOKENS
    const mintAmount = utils.parseEther('100000');

    await wethToken.connect(owner).mint(owner.address, mintAmount);
    await creditsToken.connect(owner).mint(owner.address, mintAmount);
    await usdcToken.connect(owner).mint(owner.address, mintAmount);

    await wethToken.connect(account1).mint(account1.address, mintAmount);
    await creditsToken.connect(account1).mint(account1.address, mintAmount);
    await usdcToken.connect(account1).mint(account1.address, mintAmount);

    await wethToken.connect(account2).mint(account1.address, mintAmount);
    await creditsToken.connect(account2).mint(account1.address, mintAmount);
    await usdcToken.connect(account2).mint(account1.address, mintAmount);


    //SETUP UNI V2 CONTRACTS AND PAIRS

    const univ2FactoryContract = await ethers.getContractFactory("UniswapV2Factory");
    const univ2Factory = await univ2FactoryContract.deploy();
    await univ2Factory.deployed();

    const univ2RouterContact = await ethers.getContractFactory("UniswapV2Router02");
    const univ2Router = await univ2RouterContact.deploy();
    await univ2Router.deployed();

    const createWethUSDCPair = await factory.createPair(wethToken.address, usdcToken.address);
    await createWethUSDCPair.wait();
    const wethUsdcPairAddress = await factory.getPair(wethToken.address, usdcToken.address);

    const createWethCreditsPair = await factory.createPair(wethToken.address, creditsToken.address);
    await createWethCreditsPair.wait();
    const createWethCreditsAddress = await factory.getPair(wethToken.address, creditsToken.address);

    const createCreditsUSDCPair = await factory.createPair(creditsToken.address, usdcToken.address);
    await createCreditsUSDCPair.wait();
    const createCreditsUSDCAddress = await factory.getPair(creditsToken.address, usdcToken.address);

    //INIT PAIR OBJECTS
    const wethUsdcPair = new ethers.Contract(wethUsdcPairAddress, uniV2PairArtifact.abi, deployer);
    const wethCreditsPair = new ethers.Contract(createWethCreditsAddress, uniV2PairArtifact.abi, deployer);
    const creditsUSDCPair = new ethers.Contract(createCreditsUSDCAddress, uniV2PairArtifact.abi, deployer);

    //SET USER APPROVALS
    await usdt.connect(owner).approve(univ2Router.address, constants.MaxUint256).wait();
    await creditsToken.connect(owner).approve(univ2Router.address, constants.MaxUint256).wait();
    await usdcToken.connect(owner).approve(univ2Router.address, constants.MaxUint256).wait();
    await usdt.connect(account1).approve(univ2Router.address, constants.MaxUint256).wait();
    await creditsToken.connect(account1).approve(univ2Router.address, constants.MaxUint256).wait();
    await usdcToken.connect(account1).approve(univ2Router.address, constants.MaxUint256).wait();
    await usdt.connect(account2).approve(univ2Router.address, constants.MaxUint256).wait();
    await creditsToken.connect(account2).approve(univ2Router.address, constants.MaxUint256).wait();
    await usdcToken.connect(account2).approve(univ2Router.address, constants.MaxUint256).wait();    

    //ADD LIQUIDITY WETH/USDC
    //https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02#addliquidity
    await univ2Router.connect(owner).addLiquidity(
                wethToken.address,  //Token A
                usdcToken.address,  //Token B
                utils.parseEther('1000'), //Token A - Amount Desired
                utils.parseEther('1000'), //Token B - Amount Desired
                0, //Token A - Amount Min
                0, //Token B - Amount Min
                owner.address, 
                Math.floor(Date.now() / 1000 + (10 * 60)),
                { gasLimit: utils.hexlify(1_000_000)}
        ).wait();

    await univ2Router.connect(account1).addLiquidity(
            wethToken.address,  //Token A
            usdcToken.address,  //Token B
            utils.parseEther('1000'), //Token A - Amount Desired
            utils.parseEther('1000'), //Token B - Amount Desired
            0, //Token A - Amount Min
            0, //Token B - Amount Min
            account1.address, 
            Math.floor(Date.now() / 1000 + (10 * 60)),
            { gasLimit: utils.hexlify(1_000_000)}
        ).wait();

    //ADD LIQUIDITY WETH/CREDITS
    await univ2Router.connect(account1).addLiquidity(
            wethToken.address,  //Token A
            creditsToken.address,  //Token B
            utils.parseEther('500'), //Token A - Amount Desired
            utils.parseEther('500'), //Token B - Amount Desired
            0, //Token A - Amount Min
            0, //Token B - Amount Min
            account1.address, 
            Math.floor(Date.now() / 1000 + (10 * 60)),
            { gasLimit: utils.hexlify(1_000_000)}
        ).wait();

    await univ2Router.connect(account2).addLiquidity(
            wethToken.address,  //Token A
            creditsToken.address,  //Token B
            utils.parseEther('2000'), //Token A - Amount Desired
            utils.parseEther('2000'), //Token B - Amount Desired
            0, //Token A - Amount Min
            0, //Token B - Amount Min
            account2.address, 
            Math.floor(Date.now() / 1000 + (10 * 60)),
            { gasLimit: utils.hexlify(1_000_000)}
        ).wait();

    //ADD LIQUIDITY CREDITS/USDC
    await univ2Router.connect(account1).addLiquidity(
            creditsToken.address,  //Token A
            usdcToken.address,  //Token B
            utils.parseEther('50'), //Token A - Amount Desired
            utils.parseEther('1500'), //Token B - Amount Desired
            0, //Token A - Amount Min
            0, //Token B - Amount Min
            account1.address, 
            Math.floor(Date.now() / 1000 + (10 * 60)),
            { gasLimit: utils.hexlify(1_000_000)}
        ).wait();

    await univ2Router.connect(account2).addLiquidity(
                creditsToken.address,  //Token A
                usdcToken.address,  //Token B
                utils.parseEther('80'), //Token A - Amount Desired
                utils.parseEther('2400'), //Token B - Amount Desired
                0, //Token A - Amount Min
                0, //Token B - Amount Min
                account2.address, 
                Math.floor(Date.now() / 1000 + (10 * 60)),
                { gasLimit: utils.hexlify(1_000_000)}
            ).wait();

}//async function main() {

main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});