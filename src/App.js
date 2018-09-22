import React, { Component } from 'react'
import { Route } from 'react-router'
import Home from './layouts/home/Home'
import routes from './routes'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Route path={routes.home} component={Home} />
            </div>
        )
    }
}

export default App
