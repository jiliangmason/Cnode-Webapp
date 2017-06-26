import React from 'react';
import {connect} from 'react-redux';
import {TabBar, Icon} from 'antd-mobile';
import Topic from '../Topic/Topic';
import PublishTopic from '../PublishTopic/PublishTopic';
import Message from '../Message/Message';
import Login from '../Login/Login';

class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            //selectedTab: HashMap.containsKey('selectedTab')?HashMap.get('selectedTab'):'index',
            selectedTab: 'index',
            hidden: false
        }
    }

    /*
    * 每一个tab显示的组件
    * */
    fillContent(text) {

        switch (text) {
            case '首页':
                return <Topic />;
            case '发布':
                return <PublishTopic loginFn={this.selectHandler.bind(this)}/>;
            case '消息':
                return <Message />;
            case '我的':
                return <Login />;
            default:
                return '';
        }
    }

    /*
    * 修改tab值
    * */
    selectHandler(tab) {
        this.setState({
            selectedTab: tab
        });
    }

    render() {
        const {state} = this.props;
        return (
            <TabBar unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}>
                <TabBar.Item title="首页" key="首页" icon={<Icon type={require('../../images/index.svg')} />} selectedIcon={<Icon type={require('../../images/index-fill.svg')} />}
                    selected={this.state.selectedTab == 'index'}
                    onPress={this.selectHandler.bind(this, 'index')} data-seed="logId">
                    {this.fillContent('首页')}
                </TabBar.Item>

                <TabBar.Item title="发布" key="发布" icon={<Icon type={require('../../images/write.svg')} />} selectedIcon={<Icon type={require('../../images/write-fill.svg')} />}
                             selected={this.state.selectedTab == 'publish'}
                             onPress={this.selectHandler.bind(this, 'publish')} data-seed="logId1">
                    {this.fillContent('发布')}
                </TabBar.Item>

                <TabBar.Item title="消息" key="消息" icon={<Icon type={require('../../images/message.svg')} />} selectedIcon={<Icon type={require('../../images/message-fill.svg')} />}
                             selected={this.state.selectedTab == 'message'}
                             onPress={this.selectHandler.bind(this, 'message')}>
                    {this.fillContent('消息')}
                </TabBar.Item>

                <TabBar.Item title="我的" key="我的" icon={<Icon type={require('../../images/user.svg')} />} selectedIcon={<Icon type={require('../../images/user-fill.svg')} />}
                             selected={this.state.selectedTab == 'myinfo'}
                             onPress={this.selectHandler.bind(this, 'myinfo')}>
                    {this.fillContent('我的')}
                </TabBar.Item>
            </TabBar>
        )
    }

}

function mapStateToProps(state) {
    return {
        state
    }
}

export default connect(mapStateToProps)(Home)