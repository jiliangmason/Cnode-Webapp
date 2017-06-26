import React from 'react';
import TopicHeader from '../../components/Topic/Header/topic_header';
import TopicList from '../../components/Topic/List/topic_list';
import {connect} from 'react-redux';
import * as ActionList from '../../actions/actions';
import {Tabs, WhiteSpace, ActivityIndicator} from 'antd-mobile';
import './style.less'

const TabPane = Tabs.TabPane;

const tab = [{
    name: '全部',
    tab: 'good',
    key: 1
}, {
    name: '发帖',
    tab: 'dev',
    key: 2
}, {
    name: '分享',
    tab: 'share',
    key: 3
}, {
    name: '问答',
    tab: 'ask',
    key: 4
}, {
    name: '招聘',
    tab: 'job',
    key: 5
}];

class Topic extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
            isFetching: false
        }
    }

    componentDidMount() {
        const {dispatch, Topic} = this.props;
        dispatch(ActionList.topicSelect(Topic.selectedTab)); //加载完组件就发出一个selecttab='good'
    }

    componentWillReceiveProps(nextProps) {
        //console.log('send topic');  //topicSelect发出后，state.Topic发生改变了
        const {dispatch} = nextProps;
        const {isFetching, topics} = nextProps.Topic.tabData;
        if (!isFetching && topics.length == 0) {
            dispatch(ActionList.fetchTopic(nextProps.Topic.selectedTab)); //刚开始selectedTab=good
        }

        if (topics && topics.length > 0) {
            this.setState({
                data: topics,
                isFetching: isFetching
            })
        }  //重新装载数据
    }

    callback(key) {
        //console.log(tab[key].tab);
        const {dispatch} = this.props;
        dispatch(ActionList.topicSelect(tab[key-1].tab))
    }

    tabClickHandler(key) {

    }

    loadingMore() {
        const {dispatch, Topic} = this.props;
        let num = Topic.tabData.limit;
        num = num + 10;
        if (!Topic.tabData.isFetching)
        dispatch(ActionList.fetchTopic(Topic.selectedTab, 1, num))
    }

    render() {
        const outerHeight = {
            height: document.documentElement.clientHeight - 99
        };

        return (
            <div style={outerHeight}>
                <TopicHeader />
                <div>
                    <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)} onTabClick={this.tabClickHandler.bind(this)}>
                        {tab.map(item=> {
                            return (
                                <TabPane key={item.key} tab={item.name}>
                                    {(item.tab === this.props.Topic.selectedTab && this.state.data.length != 0)
                                        ? <TopicList data={this.state.data} isFetching={this.state.isFetching} loadingMore={this.loadingMore.bind(this)}/>
                                        : <div className="topic-page-activity-indicator"><ActivityIndicator size="large" text="正在加载中"/></div>}
                                </TabPane>
                            )
                        })}
                    </Tabs>
                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        Topic: state.Topic
    }
}

export default connect(mapStateToProps)(Topic)