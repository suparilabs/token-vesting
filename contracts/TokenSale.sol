// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import { SafeMath } from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Token.sol";
import "./Vesting.sol";

/**
 * @title TokenSale Contract
 */

contract TokenSale is Ownable {
    using SafeMath for uint256;
    IERC20 public token; // the token being sold

    uint256 public coinsSold;

    address public immutable USDT;
    address public immutable BUSD;

    event Sold(address buyer, uint256 amount);

    uint256 public exchangePriceUSDT = 120000000000000000;
    uint256 public exchangePriceBUSD = 120000000000000000;
    uint256 public cliff = 3 * 30 days;
    uint256 public duration = 18 * 30 days;

    Vesting public vesting;

    uint256 public availableAtTGE = 200; // percentage basis points

    enum SaleStatus {
        Pause,
        Start
    }

    SaleStatus public saleStatus;

    constructor(
        IERC20 _token,
        address _usdt,
        address _busd
    ) {
        token = _token;
        USDT = _usdt;
        BUSD = _busd;
        vesting = new Vesting(address(token));
    }

    modifier onSale() {
        require(saleStatus == SaleStatus.Start);
        _;
    }

    function setExchangePriceUSDT(uint256 _usdtPrice) external onlyOwner {
        exchangePriceUSDT = _usdtPrice;
    }

    function setExchangePriceBUSD(uint256 _busdPrice) external onlyOwner {
        exchangePriceBUSD = _busdPrice;
    }

    function setCliff(uint256 _cliff) external onlyOwner {
        cliff = _cliff;
    }

    function setDuration(uint256 _duration) external onlyOwner {
        duration = _duration;
    }

    function setSaleStatus(SaleStatus _saleStatus) external onlyOwner {
        saleStatus = _saleStatus;
    }

    function setAvailableAtTGE(uint256 _availableAtTGE) external onlyOwner {
        availableAtTGE = _availableAtTGE;
    }

    function buyTokensUsingBUSD(uint256 _busdAmount, uint256 numberOfTokens) external payable onSale {
        require(_busdAmount >= 1000 ether); // BUSD has 18 ethers
        require(_busdAmount == numberOfTokens * exchangePriceBUSD);
        require(IERC20(BUSD).transferFrom(msg.sender, address(this), _busdAmount));

        uint256 scaledAmount = numberOfTokens * (uint256(10)**ERC20(address(token)).decimals());

        require(token.allowance(owner(), address(this)) >= scaledAmount);

        emit Sold(msg.sender, numberOfTokens);
        coinsSold += numberOfTokens;
        uint256 _nonVestedTokenAmount = scaledAmount.mul(availableAtTGE).div(10000);
        uint256 _vestedTokenAmount = scaledAmount.sub(_nonVestedTokenAmount);
        // send some pct of tokens to buyer right away
        if (_nonVestedTokenAmount > 0) {
            require(token.transferFrom(owner(), msg.sender, _nonVestedTokenAmount));
        } // vest rest of the tokens
        require(token.transferFrom(owner(), address(vesting), _vestedTokenAmount));

        vesting.createVestingSchedule(owner(), block.timestamp, cliff, duration, 1, false, _vestedTokenAmount);
    }

    function buyTokensUsingUSDT(uint256 _usdtAmount, uint256 numberOfTokens) external payable onSale {
        require(_usdtAmount >= 1000 ether); // USDT has 18 decimals
        require(_usdtAmount == numberOfTokens * exchangePriceBUSD);
        require(IERC20(USDT).transferFrom(msg.sender, address(this), _usdtAmount));

        uint256 scaledAmount = numberOfTokens * (uint256(10)**ERC20(address(token)).decimals());

        require(token.allowance(owner(), address(this)) >= scaledAmount);

        emit Sold(msg.sender, numberOfTokens);
        coinsSold += numberOfTokens;
        uint256 _nonVestedTokenAmount = scaledAmount.mul(availableAtTGE).div(10000);
        uint256 _vestedTokenAmount = scaledAmount.sub(_nonVestedTokenAmount);
        // send some pct of tokens to buyer right away
        if (_nonVestedTokenAmount > 0) {
            require(token.transferFrom(owner(), msg.sender, _nonVestedTokenAmount));
        } // vest rest of the tokens
        require(token.transferFrom(owner(), address(vesting), _vestedTokenAmount));
        vesting.createVestingSchedule(owner(), block.timestamp, cliff, duration, 1, false, _vestedTokenAmount);
    }

    function createVestingSchedule(
        address _beneficiary,
        uint256 _start,
        uint256 _cliff,
        uint256 _duration,
        uint256 _slicePeriodSeconds,
        bool _revocable,
        uint256 _amount,
        uint256 _availableAtTGE
    ) external onlyOwner {
        require(token.allowance(owner(), address(this)) >= _amount);
        emit Sold(msg.sender, _amount);
        coinsSold += _amount;
        uint256 _nonVestedTokenAmount = _amount.mul(_availableAtTGE).div(10000);
        uint256 _vestedTokenAmount = _amount.sub(_nonVestedTokenAmount);
        // send some pct of tokens to buyer right away
        if (_nonVestedTokenAmount > 0) {
            require(token.transferFrom(owner(), msg.sender, _nonVestedTokenAmount));
        } // vest rest of the tokens
        require(token.transferFrom(owner(), address(vesting), _vestedTokenAmount));
        vesting.createVestingSchedule(
            _beneficiary,
            _start,
            _cliff,
            _duration,
            _slicePeriodSeconds,
            _revocable,
            _vestedTokenAmount
        );
    }

    function withdrawBUSD() external onlyOwner {
        IERC20(BUSD).transfer(owner(), IERC20(BUSD).balanceOf(address(this)));
    }

    function withdrawUSDT() external onlyOwner {
        IERC20(USDT).transfer(owner(), IERC20(USDT).balanceOf(address(this)));
    }

    function withdraw(uint256 _amount) public onlyOwner {
        vesting.withdraw(_amount);
        token.transfer(owner(), _amount);
    }

    function endSale() external onlyOwner {
        // Send unsold tokens to owner.
        // require(tokenContract.transfer(ow, tokenContract.balanceOf(address(this))));
        // payable(address(vesting)).transfer(address(this).balance);
        withdraw(vesting.getWithdrawableAmount());
        saleStatus = SaleStatus.Pause;
    }
}
