pragma solidity^0.4.24;

import "bancor-contracts/solidity/contracts/converter/BancorFormula.sol";

contract RedditCash is BancorFormula {

    event Publish(string ipfsHash);

    function publish(string ipfsHash) public {
        emit Publish(ipfsHash);
    }
}
