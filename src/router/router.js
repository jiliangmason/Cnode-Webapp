import React from 'react';
import App from '../containers/App';
import Home from '../containers/Home/Home';
import {hashHistory, Router, Route, IndexRoute} from 'react-router';

export default class RouterMap extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Home}/>
                </Route>
            </Router>
        )
    }

}