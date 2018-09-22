import React from 'react'
import PropTypes from 'prop-types'
import { Button, Card, CardBody, CardFooter, Col, Form, FormGroup, Input, Label } from 'reactstrap'

const SubmitPost = ({ handleSubmitPost, loading }) => {
    return (
        <Card>
            <CardBody>
                <Form>
                    <FormGroup row>
                        <Label for="title" sm={2}>
                            Title
                        </Label>
                        <Col sm={10}>
                            <Input type="text" name="title" id="title" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="postContents" sm={2}>
                            Post Contents
                        </Label>
                        <Col sm={10}>
                            <textarea rows={10} cols={110} style={{ width: '100%' }} id="postContents" />
                        </Col>
                    </FormGroup>
                </Form>
            </CardBody>
            <CardFooter>
                <Button onClick={handleSubmitPost} color="success" className="float-right">
                    Submit
                </Button>
            </CardFooter>
        </Card>
    )
}

SubmitPost.propTypes = {
    handleSubmitPost: PropTypes.func.isRequired
}

export default SubmitPost
