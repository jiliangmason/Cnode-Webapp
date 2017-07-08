import React from 'react';
import App from '../containers/App';
import Home from '../containers/Home/Home';
import Details from '../containers/Details/Details';
import OtherUserInfo from '../containers/OtherUserInfo/OtherUserInfo';
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
                    <Route path="/details/:id" component={Details}/>
                    <Route path="/otherinfo/:loginname" component={OtherUserInfo}/>
                </Route>
            </Router>
        )
    }

}