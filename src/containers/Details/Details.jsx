import React from 'react';
import * as ActionList from '../../actions/actions';
import {connect} from 'react-redux';
import {NavBar, ActivityIndicator} from 'antd-mobile';
import {hashHistory} from 'react-router';
import ArticleDetails from '../../components/Details/details';
import Comments from '../../components/Comments/comments';
import './style.less';

class Details extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.upComments = [];
        this.state = {
            initCollect: false,
        }
    }

    componentDidMount() {
        const {dispatch, params, Collect} = this.props;
        const articleId = params.id;
        //获取当前的收藏信息，根据id判断该主题是否已经被收藏
        if (Collect.collect && Collect.collect.length > 0) {
            Collect.collect.forEach(item=> {
                if (item.id == articleId) {
                    this.setState({
                        initCollect: true
                    });
                    // updateDetailsFn(); //更新redux中Details的is_collect
                }
            })
        }
        dispatch(ActionList.fetchArticleDetails(articleId));
    }

    componentWillReceiveProps(nextProps) {
        const {params, Collect, Details, Login, UpComments, dispatch} = nextProps;
        const id = params.id;
        let exist = false;

        //收藏主题的数量发生了改变
        if (this.props.Collect.collect.length != Collect.collect.length) {
            Collect.collect.forEach(item=> {
                if (item.id == id) {
                    exist = true;
                }
            });

            this.setState({
                initCollect: exist
            })
        }

        //点赞动作
        if ((this.props.UpComments.todo != UpComments.todo) && UpComments.todo) {
            dispatch(ActionList.fetchArticleDetails(id));
        }
    }

    leftClickHandler() {
        const {dispatch} = this.props;
        dispatch(ActionList.topicSelect('good')); //解决返回首页无数据加载的bug
        hashHistory.replace("/");
    }

    collectTopic(accesstoken, loginname, topicId, isCollect) {
        const {dispatch} = this.props;
        //收藏/取消收藏某主题
        dispatch(ActionList.postCollectTopic(accesstoken, topicId, isCollect));
        //更新一下用户收藏
        dispatch(ActionList.fetchUserCollection(loginname));
        //更新一下用户信息
        dispatch(ActionList.fetchUserInfo(loginname))
    }

    /*
     * 更新redux的details中is_collect的值
     * */
    updateDetails() {
        const {dispatch, Details} = this.props;
        dispatch(ActionList.updateCollectStatus(Details));
    }

    /*
     * 点赞
     * */
    upCommentsFn(accesstoken, replyId) {
        const {dispatch, params} = this.props;
        //取消或点赞
        dispatch(ActionList.upComments(accesstoken, replyId));
    }

    render() {
        const {Details, Login, Collect} = this.props;
        return (
            <div>
                <div style={{position: 'fixed', top: 0, width: '100%', zIndex: '999'}}>
                    <NavBar onLeftClick={this.leftClickHandler.bind(this)}>详情</NavBar>
                </div>
                {(Details.details && Details.details.id)
                    ? (<div><ArticleDetails details={Details.details} Login={Login} Collect={Collect}
                                            initCollect={this.state.initCollect}
                                            collectTopicFn={this.collectTopic.bind(this)}
                                            updateDetailsFn={this.updateDetails.bind(this)}/>
                    <Comments details={Details.details} Login={Login} upCommentsFn={this.upCommentsFn.bind(this)}/></div>)
                    :
                    <div className="details-loading-indicator"><ActivityIndicator size="large" text="正在加载中..."/></div>}
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        Details: state.Details,
        Collect: state.Collect,
        Login: state.Login,
        UpComments: state.UpComments
    }
}

export default connect(mapStateToProps)(Details)