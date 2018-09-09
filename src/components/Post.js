import React, {Component} from 'react'
import {Card, CardBody, CardFooter, CardText, CardTitle, Col, Row} from "reactstrap"
import "../css/Post.css"
import PropTypes from "proptypes/src";
import {drizzleConnect} from "drizzle-react";

class Post extends Component {

    constructor(props, context) {
        super(props);
        this.contracts = context.drizzle.contracts;
        this.context = context.drizzle;
        const curatedBondedCurveInstance =
            new context.drizzle.web3.eth.Contract(this.contracts.CuratedBondedCurve.abi, this.props.tokenAddress);
        curatedBondedCurveInstance.methods.balanceOf(context.drizzle.store.getState().accounts[0]).call((e, tokenBalance) => {
            this.setState({
                tokenBalance: parseInt(tokenBalance, 10)
            })
        });

        this.state = {
            curatedBondedCurveInstance
        };
        //seek the current token balance
    }

    buy = () => {
        const ipfsHash = this.props.ipfsHash;
        console.log(`user wants to buy ${ipfsHash} @ ${this.props.tokenAddress}`);
        this.state.curatedBondedCurveInstance.methods.buy().send({
            value: 100000,
            gasPrice: 0,
            from: this.context.drizzle.store.getState().accounts[0]
        });
    };

    render() {
        return (
            <Row>
                <Col sm="12">
                    <Card>
                        <CardBody>
                            <CardTitle>{this.props.title}</CardTitle>
                            <CardText>{this.props.contents}</CardText>
                        </CardBody>
                        <CardFooter>
                            <a onClick={this.buy} className="float-right">Buy</a>
                            {this.state.tokenBalance}
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        )
    }
}

Post.contextTypes = {
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

export default drizzleConnect(Post, mapStateToProps);
