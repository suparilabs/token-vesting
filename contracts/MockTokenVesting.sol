// contracts/PrivateSaleContract.sol
// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.4;

import "./Vesting.sol";

/**
 * @title MockTokenVesting
 * WARNING: use only for testing and debugging purpose
 */
contract MockTokenVesting is Vesting {
    uint256 mockTime = 0;

    constructor(address token_) Vesting(token_) {}

    function setCurrentTime(uint256 _time) external {
        mockTime = _time;
    }

    function getCurrentTime() internal view virtual override returns (uint256) {
        return mockTime;
    }
}
