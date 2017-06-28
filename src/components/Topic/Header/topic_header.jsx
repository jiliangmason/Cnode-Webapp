import React from 'react';
import ReactDOM from 'react-dom';
import {Drawer, NavBar, List, Button, WingBlank, Flex} from 'antd-mobile';
import './style.less';
const Item = List.Item;

export default class TopicHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false,
            position: 'left',
            publish: false,
            reply: false,
            collect: false
        }
    }

    onOpenChange() {
        /* NavBar的高度 let navH = ReactDOM.findDOMNode(this.refs.nav).offsetHeight;
         console.log(navH=90);*/
        this.setState({
            open: !this.state.open
        });
    }

    loginHandler() {
        this.props.loginFn('myinfo');
    }

    showSelectItem(key) {
        this.setState({
            [key]: !this.state[key]
        })
    }

    render() {
        const drawerProps = {
            open: this.state.open,
            position: this.state.position,
            onOpenChange: this.onOpenChange,
        };

        const sidebar = this.props.Login.success
            ? (<div className="nav-bar-user-info">
            <div className="nav-bar-user-avatar">
                <img src={this.props.UserInfo.userinfo.avatar_url} style={{width: '2.15rem', height: '2.15rem'}}/>
            </div>
            <Flex justify="center">
                <Button type="primary" onClick={this.loginHandler.bind(this)}>个人详情</Button>
            </Flex>
            <List key="1">
                <Item arrow={this.state.publish ? "up" : "down"} multipleLine
                      onClick={this.showSelectItem.bind(this, 'publish')}>发布的话题</Item>
                {this.state.publish ? this.props.UserInfo.userinfo.recent_topics.map((item, index)=>{
                    return (<Item key={index} className="user-publish-title">{item.title}</Item>)
                }) : ''}
            </List>
            <List key="2">
                <Item arrow={this.state.reply ? "up" : "down"} multipleLine
                      onClick={this.showSelectItem.bind(this, 'reply')}>参与的话题</Item>
                {this.state.reply ? this.props.UserInfo.userinfo.recent_replies.map((item, index)=>{
                    return (<Item key={index} className="user-publish-title">{item.title}</Item>)
                }) : ''}
            </List>
            <List key="3">
                <Item arrow={this.state.collect ? "up" : "down"} multipleLine
                      onClick={this.showSelectItem.bind(this, 'collect')}>收藏的话题</Item>
                {this.state.collect ? this.props.Collect.collect.map((item, index)=>{
                    return (<Item key={index} className="user-publish-title">{item.title}</Item>)
                }) : ''}
            </List>
        </div>)
            : (<div className="nav-bar-login-btn">
            <WingBlank size="lg">
                <Button type="primary" onClick={this.loginHandler.bind(this)}>请先登陆</Button>
            </WingBlank>
        </div>);
        return (
            <div>
                <NavBar className="test-nav-bar" ref="nav" iconName="ellipsis"
                        onLeftClick={this.onOpenChange.bind(this)}>首页</NavBar>
                <Drawer
                    className="my-drawer"
                    style={{height: document.documentElement.clientHeight - 189}}
                    dragHandleStyle={{display: 'none'}}
                    contentStyle={{color: '#A6A6A6', textAlign: 'center', paddingTop: 42}}
                    sidebar={sidebar}
                    {...drawerProps} >
                    首页
                </Drawer>
            </div>
        )
    }

}