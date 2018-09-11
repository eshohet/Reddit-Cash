pragma solidity^0.4.24;

import "relevant-contracts/contracts/BondingCurve.sol";

contract CuratedBondedCurve is BondingCurve {

    uint32 public reserveRatio = 900000;

    constructor() public {
        poolBalance = poolBalance.add(1);
        totalSupply_ = totalSupply_.add(1);
        balances[msg.sender] = balances[msg.sender].add(1);
    }

    function buy() public payable returns(bool) {
        require(msg.value > 0);
        uint256 tokensToMint = calculatePurchaseReturn(totalSupply_, poolBalance, reserveRatio, msg.value);
        totalSupply_ = totalSupply_.add(tokensToMint);
        balances[msg.sender] = balances[msg.sender].add(tokensToMint);
        poolBalance = poolBalance.add(msg.value);
        LogMint(tokensToMint, msg.value);
        return true;
    }

    function sell(uint256 sellAmount) public returns(bool) {
        require(sellAmount > 0 && balances[msg.sender] >= sellAmount);
        uint256 ethAmount = calculateSaleReturn(totalSupply_, poolBalance, reserveRatio, sellAmount);
        msg.sender.transfer(ethAmount);
        poolBalance = poolBalance.sub(ethAmount);
        balances[msg.sender] = balances[msg.sender].sub(sellAmount);
        totalSupply_ = totalSupply_.sub(sellAmount);
        LogWithdraw(sellAmount, ethAmount);
        return true;
    }
}
