// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./utils/ERC20.sol";

contract Token is ERC20 {
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 totalSupply_
    ) ERC20(name_, symbol_) {
        _mint(msg.sender, totalSupply_);
    }
}
