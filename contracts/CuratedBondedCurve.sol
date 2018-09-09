pragma solidity^0.4.24;

import "relevant-contracts/contracts/BondingCurve.sol";

contract CuratedBondedCurve is BondingCurve {

    uint32 public reserveRatio = 333333;

    constructor() public {
        poolBalance = poolBalance.add(100);
        totalSupply_ = totalSupply_.add(100);
        balances[msg.sender] = balances[msg.sender].add(100);
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
}
