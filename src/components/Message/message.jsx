import React from 'react';
import {NavBar, Tabs, List, ActivityIndicator, Badge} from 'antd-mobile';
import GetTime from '../../utils/GetTime';
import './style.less';
const TabPane = Tabs.TabPane;
const Item = List.Item;
const Brief = Item.Brief;

export default class MessageList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            message: []
        }
    }


    callback() {

    }

    /*componentWillReceiveProps(nextProps) {
        this.setState({
            message: nextProps.Message
        }, console.log('ch', this.state.message))
    }*/

    render() {
        let {message} = this.props;
        return (
            <div>
                <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                    <TabPane tab="已读消息" key="1">
                        <div style={{display: 'flex', height: '10.6rem', backgroundColor: '#fff'}}>
                            <List className="my-has-read-message-list" style={{width: '100%'}}>
                                {message.hasOwnProperty('has_read_messages') ? message.has_read_messages.length > 0
                                    ? message.has_read_messages.map((item, index)=> {
                                    return (
                                        <Item extra={GetTime.calculateTime(new Date(), item.reply.create_at)} align="middle" thumb={item.author.avatar_url} wrap multipleLine key={index}>
                                            <div dangerouslySetInnerHTML={{__html: item.reply.content}}></div>
                                            <Brief>来自:{item.author.loginname}</Brief>
                                        </Item>
                                    )
                                }) : <div></div>
                                    :<ActivityIndicator size="lg" text="正在加载中..."/>}
                            </List>
                        </div>
                    </TabPane>
                    <TabPane tab={<div>未读消息&nbsp;<Badge text={message.hasnot_read_messages?message.hasnot_read_messages.length:''}/></div>} key="2">
                        <div style={{display: 'flex', backgroundColor: '#fff',height:'10.6rem'}}>
                            <List className="my-has-no-read-message-list" style={{width: '100%'}}>
                            {message.hasOwnProperty('hasnot_read_messages') ? message.hasnot_read_messages.length > 0
                             ? message.hasnot_read_messages.map((item, index)=> {
                             return (
                             <Item extra={GetTime.calculateTime(new Date(), item.reply.create_at)} align="middle" thumb={item.author.avatar_url} wrap multipleLine key={index}>
                                <div dangerouslySetInnerHTML={{__html: item.reply.content}}></div>
                                <Brief>来自:{item.author.loginname}</Brief>
                             </Item>
                             )
                             }) : <div className="has-no-message-info" style={{textAlign:'center',padding:'0.36rem 0'}}>暂无未读消息</div>
                             :<ActivityIndicator size="lg" text="正在加载中..."/>}
                             </List>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }

}