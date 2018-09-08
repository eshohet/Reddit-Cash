import React, {Component} from 'react'
import {RedditNavBar} from "../../components/Navbar";
import {Container} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from "proptypes/src";
import {drizzleConnect} from "drizzle-react";
import Posts from "../../components/Posts";
const IPFS = require('ipfs');

class Home extends Component {

    constructor(props, context) {
        super(props);

        this.contracts = context.drizzle.contracts;
        this.state = {
            node: new IPFS(),
            ipfsReady: false
        };

        this.state.node.on('ready', () => {
            this.setState({
                ipfsReady: true
            });
        });
    }

    submitPost = async () => {
        console.log(`submitting post`);
        if (this.state.ipfsReady) {
            console.log(`ipfs has warmed up`);
            const filesAdded = await this.state.node.files.add({
                path: 'hello.txt',
                content: Buffer.from(JSON.stringify({
                    title: 'Hello world',
                    contents: 'Hi there'
                }))
            });

            console.log('Added file:', filesAdded[0].path, filesAdded[0].hash);
            this.contracts.RedditCash.methods.publish.cacheSend(filesAdded[0].hash);

            //
            // const fileBuffer = await this.state.node.files.cat(filesAdded[0].hash);
            //
            // console.log(fileBuffer.toString());

        }
        else {
            console.log(`ipfs is not ready yet`);
        }
    };

    render() {
        return (
            <Container>
                <RedditNavBar submitPost={this.submitPost}/>
                <Posts/>
            </Container>
        )
    }
}
Home.contextTypes = {
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

export default drizzleConnect(Home, mapStateToProps);
