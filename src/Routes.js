import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import App from './App'
import ReverseText from './ReverseText'
import Slider from './Slider'

export default function routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/slider" component={Slider} />
                <Route exact path="/reversetext" component={ReverseText} />
            </Switch>
        </Router>
    )
}
