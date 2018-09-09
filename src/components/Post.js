import React, {Component} from 'react'
import {Button, Card, CardBody, CardFooter, CardText, CardTitle, Col, Row} from "reactstrap"
import "../css/Post.css"
import PropTypes from "proptypes/src";
import {drizzleConnect} from "drizzle-react";
import swal from 'sweetalert2';

class Post extends Component {

    constructor(props, context) {
        super(props);
        this.contracts = context.drizzle.contracts;
        this.drizzle = context.drizzle;

        const curatedBondedCurveInstance = new context.drizzle.web3.eth.Contract(
            this.contracts.CuratedBondedCurve.abi, this.props.tokenAddress
        );

        //get the current token balance for this post
        curatedBondedCurveInstance.methods.balanceOf(context.drizzle.store.getState().accounts[0]).call(async (e, tokenBalance) => {
            this.setState({
                tokenBalance: parseInt(tokenBalance, 10)
            });

            //grab value of tokens depending on what you'd get if you sold them
            const totalSupply = await curatedBondedCurveInstance.methods.totalSupply().call();
            const poolBalance = await curatedBondedCurveInstance.methods.poolBalance().call();
            const reserveRatio = await curatedBondedCurveInstance.methods.reserveRatio().call();
            const sellValue = await curatedBondedCurveInstance.methods.calculateSaleReturn(
                totalSupply, poolBalance, reserveRatio, parseInt(tokenBalance, 10)
            ).call();
            this.setState({
                sellValue
            });
        });

        this.state = {
            curatedBondedCurveInstance,
            sellValue: "0"
        };
    }

    buy = async () => {
        const ipfsHash = this.props.ipfsHash;
        console.log(`user wants to buy ${ipfsHash} @ ${this.props.tokenAddress}`);
        const {value: price} = await swal({
            title: 'How much ETH would you like to spend?',
            input: 'text',
            inputValue: 1,
            showCancelButton: true,
            inputValidator: (value) => {
                return !value && 'You need to write something!'
            }
        });

        if (price) {
            this.state.curatedBondedCurveInstance.methods.buy().send({
                value: this.drizzle.web3.utils.toWei(price, 'ether'),
                from: this.context.drizzle.store.getState().accounts[0]
            });
        }
    };

    sell = () => {
        const ipfsHash = this.props.ipfsHash;
        console.log(`user wants to sell ${ipfsHash} @ ${this.props.tokenAddress}`);
        this.state.curatedBondedCurveInstance.methods.sell(this.state.tokenBalance).send({
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
                            <Button color="danger" onClick={this.sell} className="float-right">Sell</Button>
                            <Button color="success" onClick={this.buy} style={{marginRight: 10}} className="float-right">Buy</Button>
                            {this.state.tokenBalance} ({this.drizzle.web3.utils.fromWei(this.state.sellValue, "ether")} ETH)
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
