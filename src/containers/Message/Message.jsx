import React from 'react';
import {connect} from 'react-redux';
import {Flex, NavBar} from 'antd-mobile';
import {bindActionCreators} from 'redux';
import * as ActionList from '../../actions/actions';
import MessageList from '../../components/Message/message';
import './style.less';

class Message extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    loginHandler() {
        const {loginFn} = this.props;
        loginFn("myinfo");
    }

    markMessage(accesstoken, msgId) {
        const {dispatch} = this.props;
        dispatch(ActionList.postMarkMessage(accesstoken, msgId));
    }


    render() {
        const {Login} = this.props;
        return (
            <div className="user-message-navbar">
                <NavBar>消息</NavBar>
                {Login.success ? <MessageList message={this.props.Message} Login={Login} markMessageFn={this.markMessage.bind(this)}/>
                    :(<Flex justify="center">
                    <div style={{marginTop: '1rem'}}>
                        <p style={{color: '#000', fontSize: '0.35rem'}}>请先<span onClick={this.loginHandler.bind(this)} style={{color: '#108ee9'}}>登陆</span>之后再进行操作</p>
                    </div>
                </Flex>)}
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        Login: state.Login,
        Message: state.Message,
        Mark: state.Mark
    }
}

export default connect(mapStateToProps)(Message)