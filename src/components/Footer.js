import React, {Component} from 'react'
import {Card, CardFooter} from "reactstrap";

class Footer extends Component {
    render() {
        return (
            <div>
                <Card style={{marginBottom: '10px'}}>
                    <CardFooter>&copy; 2018 Blockchain Forums Incorporated. All Rights Reserved.</CardFooter>
                </Card>
            </div>
        )
    }
}

export {Footer};
