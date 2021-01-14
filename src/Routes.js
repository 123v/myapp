import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import App from './containers/App'
import MovieDetail from './containers/MovieDetail'

export default function routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/moviedetail" component={MovieDetail} />
            </Switch>
        </Router>
    )
}
