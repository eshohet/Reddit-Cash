import React, {Component} from 'react'
import {Alert} from "reactstrap";

class Announcements extends Component {
    render() {
        return (
            <div>
                <Alert color="info" style={{marginBottom: "-2.5px", marginTop: '10px'}}>
                    Welcome to Reddit Cash - each post represents a liquid token that corresponds to its popularity.
                </Alert>
            </div>
        )
    }
}

export {Announcements};
