import React, {Component} from 'react'
import {RedditNavBar} from "../../components/Navbar";
import {Container} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from "proptypes/src";
import {drizzleConnect} from "drizzle-react";
import Posts from "../../components/Posts";


class Home extends Component {

    constructor(props, context) {
        super(props);

        this.contracts = context.drizzle.contracts;
    }

    submitPost = () => {
        console.log(`submitting post`);
        this.contracts.RedditCash.methods.publish.cacheSend('QmThNeMfqCtQD22HYaHSqcVjPoLM7woNQMXqNy7XHaZjJv');
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
