import React, {Component} from 'react'
import {RedditNavBar} from "../components/Navbar";
import {Post} from "../components/Post";
import {Container} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


class Home extends Component {

    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <Container>
                <RedditNavBar/>
                <Post/>
            </Container>
        )
    }
}

export default Home
