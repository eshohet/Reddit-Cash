import React, {Component} from 'react'
import PropTypes from "proptypes/src";
import {drizzleConnect} from "drizzle-react";
import Post from "./Post";

const IPFS = require('ipfs');


class Posts extends Component {

    constructor(props, context) {
        super(props);

        this.contracts = context.drizzle.contracts;
        this.drizzle = context.drizzle;
        this.sort = this.sort.bind(this);

        this.state = {
            posts: [],
            sortMode: this.props.sortMode
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
                    const tokenAddress = log.returnValues.token;
                    const timestamp = parseInt(log.returnValues.timestamp, 10);

                    console.log(`fetching post ${ipfsHash}`);

                    node.files.cat(ipfsHash, async (error, data) => {
                        if (!error) {
                            const raw = JSON.parse(data.toString());
                            const {title, contents} = raw;

                            //grab post popularity
                            const curatedBondedCurveInstance = new this.drizzle.web3.eth.Contract(
                                this.contracts.CuratedBondedCurve.abi, tokenAddress
                            );

                            const totalSupply = await curatedBondedCurveInstance.methods.totalSupply().call();

                            this.setState({
                                posts: [...this.state.posts, {
                                    title,
                                    contents,
                                    ipfsHash,
                                    tokenAddress,
                                    totalSupply,
                                    timestamp
                                }]
                            });
                        }
                    });
                    return log;
                })
            }));
        });

        node.on('error', ((error) => {
            console.log(error);
        }))


        //setup listener for any events coming in
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            sortMode: nextProps.sortMode
        });

        console.log(this.state.posts.sort(this.sort));
    }

    sort = (a, b) => {
        let returnValue = 1;
        switch (this.state.sortMode) {
            case 'new':
                if (a.timestamp < b.timestamp)
                    returnValue = -1;
                if (a.timestamp === b.timestamp)
                    returnValue = 0;
                break;
            case 'top':
                if (a.totalSupply > b.totalSupply)
                    returnValue = -1;
                if(a.totalSupply === b.totalSupply)
                    returnValue = 0;
                break;
            default: //hot
                if (a.totalSupply > b.totalSupply)
                    returnValue = -1;
                if(a.totalSupply === b.totalSupply)
                    returnValue = 0;
                break;
        }
        return returnValue;
    };

    render() {
        return (
            <div>
                {this.state.posts.sort(this.sort).map((post, index) => {
                    return <Post
                        totalSupply={post.totalSupply}
                        tokenAddress={post.tokenAddress}
                        title={post.title}
                        contents={post.contents}
                        ipfsHash={post.ipfsHash}
                        timestamp={post.timestamp}
                        key={index}
                    />
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
