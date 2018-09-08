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
                            <CardTitle>Special Title Treatment</CardTitle>
                            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
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
