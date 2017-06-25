import React from 'react';
import {LocalStore} from '../utils/localStorage';
import * as Config from '../config/local_config';
import * as ActionList from  '../actions/actions';
import {connect} from 'react-redux';

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        let {dispatch} = this.props;
        let userinfo = LocalStore.getItem(Config.USER_INFO);
        if (userinfo) {
            const userinfoPro = JSON.parse(userinfo);
            console.log('handled userinfo:', userinfoPro);
            dispatch(ActionList.requestAccessToken(userinfoPro.accesstoken));
            //用户名也需要注册一下
        }
    }

    render() {
        return (
            <div style={{width: "100%"}}>
                {this.props.children}
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        state  //全局state
    }
}

export default connect(mapStateToProps)(App)