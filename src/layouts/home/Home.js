import React, { Component } from 'react'
import { RedditNavBar } from '../../components/Navbar'
import { Container } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import PropTypes from 'proptypes'
import { drizzleConnect } from 'drizzle-react'
import Posts from '../../components/Posts'
import { Footer } from '../../components/Footer'
import SubmitPost from '../SubmitPost'
import { Announcements } from '../../components/Announcements'
import { Route } from 'react-router'
import routes from '../../routes'

const IPFS = window.IPFS

class Home extends Component {
    constructor(props, context) {
        super(props)

        this.contracts = context.drizzle.contracts
        this.state = {
            node: new IPFS(),
            ipfsReady: false,
            sortMode: 'hot'
        }

        this.state.node.on('ready', () => {
            this.setState({
                ipfsReady: true
            })
        })
    }

    submitPost = async () => {
        const { history } = this.props

        const title = document.getElementById('title').value
        const contents = document.getElementById('postContents').value

        const filesAdded = await this.state.node.files.add({
            path: 'post.txt',
            content: Buffer.from(
                JSON.stringify({
                    title,
                    contents
                })
            )
        })

        this.contracts.RedditCash.methods.publish.cacheSend(filesAdded[0].hash)
        history.push(routes.home)
    }

    selectMode = e => {
        const mode = e.target.innerText.toLowerCase()
        this.setState({
            sortMode: mode
        })
    }

    navigateToSubmitPost = () => this.props.history.push(routes.submitPost)

    render() {
        const { ipfsReady } = this.state
        return (
            <Container>
                <RedditNavBar submitPost={this.navigateToSubmitPost} selectMode={this.selectMode} />
                <Announcements />
                <Route path={routes.posts} render={props => <Posts {...props} sortMode={this.state.sortMode} />} />
                <Route
                    path={routes.submitPost}
                    render={props => <SubmitPost {...props} handleSubmitPost={this.submitPost} loading={ipfsReady} />}
                />
                <Footer />
            </Container>
        )
    }
}

Home.contextTypes = {
    drizzle: PropTypes.object
}

/*
 * Export connected component.
 */

const mapStateToProps = state => {
    return {
        contracts: state.contracts
    }
}

export default drizzleConnect(Home, mapStateToProps)
