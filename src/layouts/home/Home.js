import React, {Component} from 'react'
import {RedditNavBar} from "../../components/Navbar";
import {Button, Card, CardBody, CardFooter, Col, Container, Form, FormGroup, Input, Label} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from "proptypes/src";
import {drizzleConnect} from "drizzle-react";
import Posts from "../../components/Posts";
import {Footer} from "../../components/Footer";
import {Announcements} from "../../components/Announcements";

const IPFS = require('ipfs');

class Home extends Component {

    constructor(props, context) {
        super(props);

        this.contracts = context.drizzle.contracts;
        this.state = {
            node: new IPFS(),
            ipfsReady: false,
            sortMode: 'hot'
        };

        this.state.node.on('ready', () => {
            this.setState({
                ipfsReady: true,
                submittingPost: false
            });
        });
    }

    prepareSubmitPost = async () => {
        console.log(`submitting post`);
        if (this.state.ipfsReady) {
            console.log(`ipfs has warmed up`);

            this.setState({
                submittingPost: true
            });
        }
        else {
            console.log(`ipfs is not ready yet`);
        }
    };

    submitPost = async () => {
        const title = document.getElementById('title').value;
        const contents = document.getElementById('postContents').value;

        const filesAdded = await this.state.node.files.add({
            path: 'post.txt',
            content: Buffer.from(JSON.stringify({
                title,
                contents
            }))
        });

        this.contracts.RedditCash.methods.publish.cacheSend(filesAdded[0].hash);
    };

    renderSubmitPost = () => {
        return (
            <Card>
                <CardBody>
                    <Form>
                        <FormGroup row>
                            <Label for="title" sm={2}>Title</Label>
                            <Col sm={10}>
                                <Input type="text" name="title" id="title"/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="postContents" sm={2}>Post Contents</Label>
                            <Col sm={10}>
                                <textarea rows={10} cols={110} style={{width: '100%'}} id="postContents"/>
                            </Col>
                        </FormGroup>
                    </Form>
                </CardBody>
                <CardFooter><Button onClick={this.submitPost} color="success" className="float-right">Submit</Button></CardFooter>
            </Card>
        );
    };

    selectMode = (e) => {
        const mode = (e.target.innerText.toLowerCase());
        console.log(`${mode} sortMode selected`);
        this.setState({
            sortMode: mode,
            submittingPost: false
        });
    };

    render() {
        return (
            <Container>
                <RedditNavBar submitPost={this.prepareSubmitPost} selectMode={this.selectMode}/>
                <Announcements/>
                {!this.state.submittingPost && <Posts sortMode={this.state.sortMode}/>}
                {this.state.submittingPost && this.renderSubmitPost()}
                <Footer />
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
