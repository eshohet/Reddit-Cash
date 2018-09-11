import React, {Component} from 'react'
import {Button, Card, CardBody, CardFooter, CardText, CardTitle, Col, Row} from "reactstrap"
import "../css/Post.css"
import PropTypes from "proptypes";
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

        this.state = {
            curatedBondedCurveInstance,
        };

        //setup listening for incoming events
        //not yet supported by metamask
        // curatedBondedCurveInstance.events.allEvents({fromBlock: 0, toBlock: 'pending'}, ((error, logs) => {
        //     console.log(error, logs);
        // }));
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
            }, ((error, data) => {

                const toast = swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });

                if(error) {
                    toast({
                        type: 'error',
                        title: 'User denied transaction'
                    });
                }
                else {
                    toast({
                        type: 'success',
                        title: 'This post has just been purchased!'
                    });
                }
            }));
        }
    };

    sell = () => {
        const ipfsHash = this.props.ipfsHash;
        console.log(`user wants to sell ${ipfsHash} @ ${this.props.tokenAddress}`);
        this.state.curatedBondedCurveInstance.methods.sell(this.props.tokenBalance).send({
            from: this.context.drizzle.store.getState().accounts[0]
        }, ((error, data) => {

            const toast = swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });

            if(error) {
                toast({
                    type: 'error',
                    title: 'User denied transaction'
                });
            }
            else {
                toast({
                    type: 'success',
                    title: 'This post has just been sold!'
                });
            }
        }));
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
                            <Button color="success" onClick={this.buy} style={{marginRight: 10}}
                                    className="float-right">Buy</Button>
                            {this.props.tokenBalance} ({this.drizzle.web3.utils.fromWei(this.props.sellValue, "ether")} ETH)
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
