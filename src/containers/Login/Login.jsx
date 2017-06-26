import React from 'react';
import UserLogin from '../../components/Login/UnLog/user_login';
import UserInfo from '../../components/Login/Log/user_info';
import {NavBar, Icon} from 'antd-mobile';
import {connect} from 'react-redux';
import * as ActionList from '../../actions/actions';
import './style.less';

class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            login: false,
            userinfo: {},
            collect: []
        }
    }

    componentWillMount() {
        if (localStorage.getItem('USER_INFO')) {
            let loginInfo = localStorage.getItem('USER_INFO');
            console.log('login', loginInfo);
        } //cache中存了info信息
    }

    logout() {
        const {dispatch} = this.props;
        localStorage.removeItem('USER_INFO');
        this.setState({
            login: false
        });
        dispatch(ActionList.logout());
    }

    login(accesstoken) {
        const {dispatch} = this.props;
        //测试token：'525383f1-0945-4584-a2cb-941209de44d9'
        dispatch(ActionList.requestAccessToken(accesstoken));
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch} = this.props;
        if (this.props.Login != nextProps.Login) {
            this.setState({
                login: nextProps.Login.success
            });

            //如果loginname，id有值就request_userinfo
            let loginname = nextProps.Login.loginname;
            if (loginname) {
                dispatch(ActionList.fetchUserInfo(loginname));
                dispatch(ActionList.fetchUserCollection(loginname));
            }
        }

        if (this.props.UserInfo != nextProps.UserInfo) {
            this.setState({
                userinfo: nextProps.UserInfo.userinfo
            })
        }

        if (this.props.Collect != nextProps.Collect) {
            this.setState({
                collect: nextProps.Collect.collect
            })
        }

    }


    render() {
        return (
            <div className="user-login-form-rc">
                <NavBar rightContent={this.state.login?[<Icon key={0} onClick={this.logout.bind(this)} type={require('../../images/logout.svg')}/>]:''}>个人中心</NavBar>
                {this.state.login?<UserInfo userinfo={this.state.userinfo} collect={this.state.collect}/>:<UserLogin login={this.login.bind(this)}/>}
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        Login: state.Login,
        UserInfo: state.UserInfo,
        Collect: state.Collect
    }
}

export default connect(mapStateToProps)(Login)

