pragma solidity^0.4.24;

import "./CuratedBondedCurve.sol";

contract RedditCash {

    event Publish(string ipfsHash, address token);

    function publish(string ipfsHash) payable public {
        CuratedBondedCurve token = new CuratedBondedCurve();
        emit Publish(ipfsHash, address(token));
    }
}
