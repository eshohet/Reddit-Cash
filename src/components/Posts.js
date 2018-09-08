import React, {Component} from 'react'
import PropTypes from "proptypes/src";
import {drizzleConnect} from "drizzle-react";

class Posts extends Component {

    constructor(props, context) {
        super(props);

        this.contracts = context.drizzle.contracts;

        this.state = {
            posts: []
        };

        //get past events
        const redditCashInstance = new context.drizzle.web3.eth.Contract(this.contracts.RedditCash.abi, this.contracts.RedditCash.address);
        redditCashInstance.getPastEvents('Publish', {
            fromBlock: 0,
            toBlock: 'latest'
        }, ((error, logs) => {
            logs.map((log) => {
                const ipfsHash = log.returnValues.ipfsHash;
                console.log(`ipfsHash: ${ipfsHash}`);
                return log;
            })
        }));

        //setup listener for any events coming in
    }

    render() {
        return (
           <div>

           </div>
        )
    }
}

Posts.contextTypes = {
    drizzle: PropTypes.object
};

/*
 * Export connected component.
 */

const mapStateToProps = state => {
    return {
        contracts: state.contracts
    }
};

export default drizzleConnect(Posts, mapStateToProps);
