import React from 'react';
import {connect} from 'react-redux';
import {NavBar, Flex} from 'antd-mobile';
import Publish from '../../components/Publish/publish';
import * as ActionList from '../../actions/actions';
import './style.less';

class PublishTopic extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    loginHandler() {
        const {loginFn} = this.props;
        loginFn('myinfo'); //跳转到我的登陆页面
    }

    publishTopic(acesstoken, title, tab, content) {
        const {dispatch} = this.props;
        dispatch(ActionList.postUserPublish(acesstoken, title, tab, content));
    }

    reFetchUserInfo(loginname) {
        const {dispatch} = this.props;
        dispatch(ActionList.fetchUserInfo(loginname))
    }

    render() {
        let {Login, PublishTopic} = this.props;
        return (
            <div className="user-publish-topic">
                <NavBar>发布</NavBar>
                {
                    Login.success ? <Publish publishFn={this.publishTopic.bind(this)} userinfoFn={this.reFetchUserInfo.bind(this)} login={Login} PublishTopic={PublishTopic} successPublish={this.loginHandler.bind(this)}/>
                        :(<Flex justify="center">
                            <div style={{marginTop: '1rem'}}>
                                <p style={{color: '#000', fontSize: '0.35rem'}}>请先<span onClick={this.loginHandler.bind(this)} style={{color: '#108ee9'}}>登陆</span>之后再进行操作</p>
                            </div>
                        </Flex>)
                }
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        Login: state.Login,
        UserInfo: state.UserInfo,
        PublishTopic: state.Publish
    }
}

export default connect(mapStateToProps)(PublishTopic)