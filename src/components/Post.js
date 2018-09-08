import React, {Component} from 'react'
import {Card, CardBody, CardFooter, CardText, CardTitle, Col, Row} from "reactstrap"
import "../css/Post.css"

class Post extends Component {

    constructor(props) {
        super(props);
    }

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
                            <a href='#' className="float-right">Buy</a>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export {Post};
