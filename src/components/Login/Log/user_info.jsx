import React from 'react';
import {Card, WhiteSpace, Tabs, List, Flex} from 'antd-mobile';
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
        let {userinfo} = this.props;
        return (
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
                            {
                                (userinfo.recent_topics && userinfo.recent_topics.length > 0) ? userinfo.recent_topics.map((item, index)=> {
                                    return (<List key={index} className="topic-list">
                                                <Item extra={GetTime.calculateTime(new Date(), item.last_reply_at)} multipleLine>{item.title}</Item>
                                            </List>)
                                }) : <div></div>
                            }
                        </div>
                    </TabPane>
                    <TabPane key="2" tab="参与的话题">
                        <div style={{display: 'flex', height: '7.4rem', backgroundColor: '#fff'}}></div>
                    </TabPane>
                    <TabPane key="3" tab="收藏的话题">
                        <div style={{display: 'flex', height: '7.4rem', backgroundColor: '#fff'}}></div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }

}