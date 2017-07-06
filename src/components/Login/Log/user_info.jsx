import React from 'react';
import {Card, WhiteSpace, Tabs, List, Flex, ActivityIndicator} from 'antd-mobile';
import GetTime from '../../../utils/GetTime';
import './style.less';

const TabPane = Tabs.TabPane;
const Item = List.Item;

export default class UserInfo extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            topics: []
        }
    }

    callback() {

    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps.userinfo.recent_topics);
    }

    render() {
        let {userinfo, collect} = this.props; //userinfo可能为空对象, collect可能为空数组

        return (JSON.stringify(userinfo) != '{}' && collect.length > 0) ? (
            <div>
                <Card>
                    <Card.Header title={userinfo.githubUsername} thumb={userinfo.avatar_url}
                                 extra={<span>积分&nbsp;{userinfo.score}</span>}/>
                    <Card.Body>
                        <div>
                            <a href={`https://github.com/${userinfo.githubUsername}`}
                               className="user-info-github-link">{`https://github.com/${userinfo.githubUsername}`}</a>
                        </div>
                    </Card.Body>
                    <WhiteSpace size="xs"/>
                    <Card.Footer content={`创建于${GetTime.calculateTime(new Date(), userinfo.create_at)}`}/>
                </Card>
                <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                    <TabPane key="1" tab="发布的话题">
                        <div style={{display: 'flex', height: '7.4rem', backgroundColor: '#fff'}}>
                            <List className="topic-list">
                                {(userinfo.recent_topics.length > 0) ? userinfo.recent_topics.map((item, index)=> {
                                    return (
                                        <Item key={index} extra={GetTime.calculateTime(new Date(), item.last_reply_at)}
                                              multipleLine>{item.title}</Item>
                                    )
                                }) : <div></div>}
                            </List>
                        </div>
                    </TabPane>
                    <TabPane key="2" tab="回复的话题">
                        <div style={{display: 'flex', height: '7.4rem', backgroundColor: '#fff'}}>
                            <List key={index} className="topic-list">
                                {(userinfo.recent_replies.length > 0) ? userinfo.recent_replies.map((item, index)=> {
                                    return (
                                        <Item key={index} extra={GetTime.calculateTime(new Date(), item.last_reply_at)}
                                              multipleLine>{item.title}</Item>
                                    )
                                }) : <div></div>}
                            </List>

                        </div>
                    </TabPane>
                    <TabPane key="3" tab="收藏的话题">
                        <div style={{display: 'flex', height: '7.4rem', backgroundColor: '#fff'}}>
                            <List key={index}>
                                {collect.map((item, index)=>{
                                    return (
                                        <Item key={index} extra={GetTime.calculateTime(new Date(), item.last_reply_at)}
                                              multipleLine>{item.title}</Item>
                                   )
                                })}
                            </List>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        ) : (<Flex justify="center" style={{marginTop: '0.3rem'}}>
            <ActivityIndicator size="large"/>
        </Flex>)

    }
}