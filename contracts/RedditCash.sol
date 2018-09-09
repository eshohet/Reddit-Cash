pragma solidity^0.4.24;

import "./CuratedBondedCurve.sol";

contract RedditCash {

    uint256 public postCount = 0;

    event Publish(string ipfsHash, uint256 postNumber, address token);

    function publish(string ipfsHash) payable public {
        CuratedBondedCurve token = new CuratedBondedCurve();
        emit Publish(ipfsHash, postCount++, address(token));
    }
}
