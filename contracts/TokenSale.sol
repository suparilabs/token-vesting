// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import { SafeMath } from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Token.sol";
import "./PrivateSaleContract.sol";

/**
 * @title TokenSale Contract
 */

contract TokenSale is Ownable {
    IERC20 public tokenContract; // the token being sold
    uint256 public usdtPrice; // the price, in wei, per token
    uint256 public busdPrice;
    uint256 public tokenPrice;
    uint256 public tokensSold;

    uint256 public coinsSold;

    address public constant USDT = address(0);
    address public constant BUSD = address(0);

    event Sold(address buyer, uint256 amount);

    uint256 public exchangePriceUSDT;
    uint256 public exchangePriceBUSD;
    //uint256 public _exchangePriceBNB;
    uint256 public cliff;
    uint256 public duration;

    PrivateSaleContract public _PrivateTokenSaleContract;

    constructor(
        IERC20 _tokenContract,
        uint256 _exchangePriceUSDT,
        uint256 _exchangePriceBUSD,
        uint256 _tokenPrice
    ) {
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
        exchangePriceUSDT = _exchangePriceUSDT;
        exchangePriceBUSD = _exchangePriceBUSD;
        // initialization
        _PrivateTokenSaleContract = new PrivateSaleContract(address(_tokenContract));
    }

    function setExchangePriceUSDT(uint256 _usdtPrice) external onlyOwner {
        //1 usdt = 0.00024 eth
        exchangePriceUSDT = _usdtPrice;
    }

    function setExchangePriceBUSD(uint256 _busdPrice) external onlyOwner {
        exchangePriceBUSD = _busdPrice;
    }

    function setCliff(uint256 _cliff) external onlyOwner {
        require(_cliff > 0);
        cliff = _cliff;
    }

    function setDuration(uint256 _duration) external onlyOwner {
        require(_duration > 0);
        duration = _duration;
    }

    function buyTokens(uint256 numberOfTokens, bool _revocable) external payable {
        require(msg.value == numberOfTokens * tokenPrice);

        uint256 scaledAmount = numberOfTokens * uint256(10)**ERC20(address(tokenContract)).decimals();

        require(tokenContract.balanceOf(address(this)) >= scaledAmount);

        emit Sold(msg.sender, numberOfTokens);
        tokensSold += numberOfTokens;

        require(tokenContract.transfer(msg.sender, scaledAmount));
        _PrivateTokenSaleContract.createVestingSchedule(
            owner(),
            block.timestamp,
            cliff,
            duration,
            1,
            _revocable,
            scaledAmount
        );
    }

    function buyTokensUsingBUSD(
        uint256 _busdAmount,
        uint256 numberOfTokens,
        bool _revocable
    ) external payable {
        require(_busdAmount >= 1000);
        require(_busdAmount == numberOfTokens * exchangePriceBUSD);
        require(IERC20(BUSD).transferFrom(msg.sender, address(this), _busdAmount));

        uint256 scaledAmount = numberOfTokens * (uint256(10)**ERC20(address(tokenContract)).decimals());

        require(tokenContract.allowance(owner(), address(this)) >= scaledAmount);

        emit Sold(msg.sender, numberOfTokens);
        coinsSold += numberOfTokens;

        require(tokenContract.transferFrom(owner(), address(_PrivateTokenSaleContract), scaledAmount));

        _PrivateTokenSaleContract.createVestingSchedule(
            owner(),
            block.timestamp,
            cliff,
            duration,
            1,
            _revocable,
            scaledAmount
        );
    }

    function buyTokensUsingUSDT(
        uint256 _usdtAmount,
        uint256 numberOfTokens,
        bool _revocable
    ) external payable {
        require(_usdtAmount >= 1000);
        require(_usdtAmount == numberOfTokens * exchangePriceBUSD);
        require(IERC20(USDT).transferFrom(msg.sender, address(this), _usdtAmount));

        uint256 scaledAmount = numberOfTokens * (uint256(10)**ERC20(address(tokenContract)).decimals());

        require(tokenContract.allowance(owner(), address(this)) >= scaledAmount);

        emit Sold(msg.sender, numberOfTokens);
        coinsSold += numberOfTokens;

        require(tokenContract.transferFrom(owner(), address(_PrivateTokenSaleContract), scaledAmount));

        _PrivateTokenSaleContract.createVestingSchedule(
            owner(),
            block.timestamp,
            cliff,
            duration,
            1,
            _revocable,
            scaledAmount
        );
    }

    function withdrawBUSD() external onlyOwner {
        IERC20(BUSD).transfer(owner(), IERC20(BUSD).balanceOf(address(this)));
    }

    function withdrawUSDT() external onlyOwner {
        IERC20(USDT).transfer(owner(), IERC20(USDT).balanceOf(address(this)));
    }

    function withdraw(uint256 _amount) public onlyOwner {
        _PrivateTokenSaleContract.withdraw(_amount);
        tokenContract.transfer(owner(), _amount);
    }

    function endSale() external onlyOwner {
        // Send unsold tokens to owner.
        // require(tokenContract.transfer(ow, tokenContract.balanceOf(address(this))));
        // payable(address(_PrivateTokenSaleContract)).transfer(address(this).balance);
        withdraw(_PrivateTokenSaleContract.getWithdrawableAmount());
    }
}
