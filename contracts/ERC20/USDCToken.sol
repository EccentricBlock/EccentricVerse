// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CreditsToken is ERC20, Ownable {
    constructor() ERC20("Credits", "CREDIT") {
        _mint(msg.sender, 10000000 * (10 ** uint256(decimals()))); // Minting 10 million tokens
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}