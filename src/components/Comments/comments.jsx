import React from 'react';
import {Card, WhiteSpace, Icon, Toast, List, Button, Flex, TextareaItem} from 'antd-mobile';
import GetTime from '../../utils/GetTime';
import { createForm } from 'rc-form';
import './style.less';

class Comments extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.upComments = [];
    }

    upComment(index, replyId, loginname) {
        const {upCommentsFn, Login} = this.props;
        if (!Login.accesstoken) {
            Toast.fail('请先登录后再进行操作!', 1);
            return
        }
        if (Login.loginname == loginname) {
            Toast.fail('不能给自己点赞!', 1);
            return
        }
        upCommentsFn(Login.accesstoken, replyId)
    }

    findUpComments(details, Login) {
        this.upComments = [];    //清理以免序号出现问题
        if (details.replies.length > 0 && Login.id) {
            this.hasOwnUpComment.call(this, details.replies, Login.id)
        }
    }

    /*
     * details改变时查看点赞有没有自己
     * 该功能暂不添加
     * */
    hasOwnUpComment(replies, id) {
        replies.forEach((item, index)=>{
            if (this.containsId(item, id)) {
                this.upComments.push(true)
            }
            else {
                this.upComments.push(false)
            }
        })
    }

    containsId(reply, id) {
        let has = false;
        if (reply.ups.includes(id))
            has = true;

        return has;
    }

    selfReplyHandler() {
        const {Login, details, replyCommentsFn} = this.props;
        const Form = this.props.form;
        let content = Form.getFieldValue('user_reply');
        //console.log('content-pro', content, Login.accesstoken, details.id)
        replyCommentsFn(Login.accesstoken, content, details.id);
        Form.setFieldsValue({
            user_reply: ''
        });
    }

    loginHandler() {

    }

    render() {
        const {details, Login} = this.props;
        const {getFieldDecorator} = this.props.form;
        this.findUpComments(details, Login);
        return (
            <div className="details-article-comments">
                <h3>共{details.reply_count}条评论</h3>
                {
                    details.replies.map((item, index)=> {
                        return (
                            <div key={index}>
                                <Card>
                                    <Card.Header title={item.author.loginname} thumb={item.author.avatar_url}
                                                 extra={<span style={{float: 'right'}}>{index + 1}楼</span>}/>
                                    <Card.Body>
                                        <div dangerouslySetInnerHTML={{__html: item.content}}></div>
                                    </Card.Body>
                                    <Card.Footer content={GetTime.calculateTime(new Date(), item.create_at)}
                                                 extra={<div>
                                                     <Icon onClick={this.upComment.bind(this, index, item.id, item.author.loginname)} type={this.upComments[index]?require('../../images/agree-fill.svg'):require('../../images/agree.svg')}/>
                                                     <span style={{padding: '0 20px 10px 10px', fontSize: '0.32rem'}}>{item.ups.length}</span>
                                                     <Icon type={require('../../images/forward.svg')}/>
                                                 </div>}/>
                                </Card>
                            </div>
                        )
                    })
                }
                {
                    Login.success ? <List renderHeader={() => '添加回复'}>
                        {(getFieldDecorator('user_reply'))(<TextareaItem
                            rows={5}
                            count={200}
                            clear
                        />)}
                        <Button type="primary" className="reply-btn" onClick={this.selfReplyHandler.bind(this)}>回复</Button>
                    </List>
                        :<List>
                            <Flex justify="center">
                            <div style={{margin: '0.5rem 0'}}>
                                <p style={{color: '#000', fontSize: '0.35rem'}}>请先<span onClick={this.loginHandler.bind(this)} style={{color: '#108ee9'}}>登陆</span>之后再进行操作</p>
                            </div>
                            </Flex>
                        </List>
                }
            </div>
        )
    }

}

export default Comments = createForm({})(Comments)