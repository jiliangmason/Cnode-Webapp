import React from 'react';
import UserLogin from '../../components/Login/UnLog/user_login';
import UserInfo from '../../components/Login/Log/user_info';
import {NavBar, Icon, Modal} from 'antd-mobile';
import {connect} from 'react-redux';
import * as ActionList from '../../actions/actions';
import './style.less';

class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            login: false,
            modal: false,
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
        const accesstoken_test = '525383f1-0945-4584-a2cb-941209de44d9';
        dispatch(ActionList.requestAccessToken(accesstoken_test));
    }

    onClose(key) {
        this.setState({
            [key]: false
        })
    }

    showModal(key) {
        this.setState({
            [key]: true
        })
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch} = this.props;
        if (this.props.Login != nextProps.Login) {
            this.setState({
                login: nextProps.Login.success
            });

            //如果loginname，id有值就request_userinfo
            let loginname = nextProps.Login.loginname;
            let accesstoken = nextProps.Login.accesstoken;
            let loginUserInfo = {};
            Object.assign(loginUserInfo, {loginname, accesstoken});

            if (JSON.stringify(loginUserInfo) != '{}') {
                console.log('loginuserinfo:', loginUserInfo);
                //这里存到localStorage里面
            }

            if (loginname) {
                dispatch(ActionList.fetchUserInfo(loginname));
                dispatch(ActionList.fetchUserCollection(loginname));

            }
            if (accesstoken) {
                dispatch(ActionList.fetchUserMessage(accesstoken));
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
                <NavBar rightContent={this.state.login?[<Icon key={0} onClick={this.showModal.bind(this, 'modal')} type={require('../../images/logout.svg')}/>]:''}>个人中心</NavBar>
                {this.state.login ? <UserInfo userinfo={this.state.userinfo} collect={this.state.collect}/> : <UserLogin login={this.login.bind(this)}/>}
                <Modal
                    title="退出登陆"
                    transparent
                    maskClosable={false}
                    visible={this.state.modal}
                    onClose={this.onClose.bind(this, 'modal')}
                    footer={[{text: '确定', onPress: () => {
                            this.logout();
                            this.onClose.call(this, 'modal')
                        }
                    }, {text: '取消', onPress: () => {
                        this.onClose.call(this, 'modal')
                    }}]}
                >确定退出登陆?</Modal>
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

