import React from 'react';
import ReactDOM from 'react-dom';
import {List, ActivityIndicator} from 'antd-mobile';
import {Link} from 'react-router';
import './style.less';
const Item = List.Item;
const Brief = Item.Brief;

export default class TopicList extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    componentWillMount() {
        const data = this.props.data;
        console.log('topic-list:', data);
    }

    scrollHandler() {
        const {loadingMore, isFetching} = this.props;
        let menuHeader = ReactDOM.findDOMNode(this.refs.menuHeader);
        let menu = ReactDOM.findDOMNode(this.refs.menu);
        //let menuHeight = menuHeader.scrollTop; //这个属性可以真实反映滚动条的距离

        if (menuHeader.scrollTop + menuHeader.offsetHeight > menu.offsetHeight) {
            //上拉加载数据
            loadingMore();
        }

    }

    render() {
        let {data} = this.props;
        const menuListItem = {
            height: document.documentElement.clientHeight - 276,  //可视区的高度
            overflow: 'auto'
        };

        return (
            <div style={menuListItem} onScroll={this.scrollHandler.bind(this)} ref="menuHeader">
                <List className="my-list" ref="menu">
                    {data.map((item, index)=>(
                        <Link to={`details/${item.id}`} key={index}>
                            <Item thumb={item.author.avatar_url} multipleLine align="top" key={item.id}>
                                {item.top ? <span className="ding-text">顶</span> : ''}
                                {item.good ? <span className="jing-text">精</span> : ''}
                                {item.title}
                                <Brief>
                                    <span>{item.reply_count}/{item.visit_count}&nbsp;分享</span>
                                    <span style={{float: 'right'}}>{item.create_at.substring(0, 10)}</span>
                                </Brief>
                            </Item>
                        </Link>
                    ))}
                    <div className="loading-more-data">
                        <ActivityIndicator text="正在加载..."/>
                    </div>
                </List>
            </div>
        )
    }

}