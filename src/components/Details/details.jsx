import React from 'react';
import {Card, Button, Modal} from 'antd-mobile';
import {Link} from 'react-router';
import GetTime from '../../utils/GetTime';
import './style.less'

export default class ArticleDetails extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isCollect: false,
            isLogin: false
        }
    }

    componentWillUpdate(nextProps, nextState) {
        const {collectTopicFn, details, Login, initCollect} = nextProps;
        if (this.state.isCollect != nextState.isCollect) {
            let accesstoken = Login.accesstoken;
            let loginname = Login.loginname;

            if (accesstoken && loginname) {
                //收藏或取消收藏
                collectTopicFn(accesstoken, loginname, details.id, initCollect);
            }
        }
    }

    detailsClickHandler() {
        const {Login} = this.props;
        let accesstoken = Login.accesstoken;
        if (!accesstoken) {
            this.showModal('isLogin');
            return;
        }

        this.setState({
            isCollect: !this.state.isCollect
        });
        //取消关注/关注主题
        //collectTopicFn(accesstoken, topicId, details.is_collect);
    }

    onClose(key) {
        this.setState({
            [key]: false,
        });
    };

    showModal(key) {
        this.setState({
            [key]: true,
        });
    };

    render() {
        const {details, initCollect} = this.props;
        return (
            <div className="details-article-item">
                <Card>
                    <Card.Header title={<span>作者: <Link to={`otherinfo/${details.author.loginname}`}>{details.author.loginname}</Link></span>}
                                 extra={<span>发布于{GetTime.calculateTime(new Date(), details.create_at)}</span>}/>
                    <Card.Body>
                        <div className="details-title">{details.title}</div>
                    </Card.Body>
                    <Card.Footer content={`${details.visit_count}次浏览 共${details.reply_count}条评论`}
                                 extra={<Button type="primary" className="details-user-collect-button"
                                                onClick={this.detailsClickHandler.bind(this)}>{initCollect ? '取消收藏' : '收藏'}</Button>}/>
                </Card>
                <div dangerouslySetInnerHTML={{__html: details.content}} className="details-article-body"></div>
                <Modal
                    title="用户登陆"
                    transparent
                    maskClosable={false}
                    visible={this.state.isLogin}
                    onClose={this.onClose.bind(this, 'isLogin')}
                    footer={[{
                        text: '确定', onPress: () => {
                            this.onClose.call(this, 'isLogin');
                        }
                    }]}>
                    请返回首页登陆后再进行操作~
                </Modal>
            </div>
        )
    }

}