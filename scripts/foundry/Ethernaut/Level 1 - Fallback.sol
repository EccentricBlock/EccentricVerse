pragma solidity ^0.8;

import "forge-std/Test.sol";
import {Fallback} from "contracts/Ethernaut/contracts/levels/Level 1 - Fallback/Fallback.sol";
import {FallbackFactory} from "contracts/Ethernaut/contracts/levels/Level 1 - Fallback/FallbackFactory.sol";

contract EthNautL1FallbackSolution is Test {
    
    address private player1;
    address private player2;

    Fallback private activeLevel;
    FallbackFactory private activeFactory;


    function setUp() public {
        player1 = makeAddr("player1");
        player2 = makeAddr("player2");

        activeFactory = new FallbackFactory();
        activeLevel = Fallback(payable(activeFactory.createInstance(player1)));
        
        vm.deal(player1, 1 ether);
        vm.deal(player2, 1 ether);
    }//function setUp() public {

    function test_IsWorking() public {
        vm.startPrank(player1);

        activeLevel.contribute{value: 5 wei}();

        assertEq(activeLevel.getContribution(), 5 wei);
    }

}
