import React, {Component} from 'react'
import PropTypes from "proptypes/src";
import {drizzleConnect} from "drizzle-react";
import {Post} from "./Post";
const IPFS = require('ipfs');


class Posts extends Component {

    constructor(props, context) {
        super(props);

        this.contracts = context.drizzle.contracts;

        this.state = {
            posts: []
        };
        const node = new IPFS();

        node.on('ready', () => {
            //get past events
            const redditCashInstance = new context.drizzle.web3.eth.Contract(this.contracts.RedditCash.abi, this.contracts.RedditCash.address);
            redditCashInstance.getPastEvents('Publish', {
                fromBlock: 0,
                toBlock: 'latest'
            }, ((error, logs) => {
                logs.map((log) => {
                    const ipfsHash = log.returnValues.ipfsHash;
                    node.files.cat(ipfsHash, (error, data) => {
                        if(!error) {
                            const raw = JSON.parse(data.toString());
                            const {title, contents} = raw;
                            this.setState({
                                posts: [...this.state.posts, {title, contents}]
                            });
                        }
                    });
                    return log;
                })
            }));
        });



        //setup listener for any events coming in
    }

    render() {
        return (
           <div>
               {this.state.posts.map((post, index) => {
                   return <Post title={post.title} contents={post.contents} key={index} />
               })}
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
