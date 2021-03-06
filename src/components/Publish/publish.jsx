import React from 'react';
import {createForm} from 'rc-form';
import {Picker, List, TextareaItem, Button, Modal, WingBlank, WhiteSpace, Toast} from 'antd-mobile';
import './style.less';

const source = [
    {
        label: '测试发帖',
        value: 'dev'
    },
    {
        label: '分享',
        value: 'share'
    },
    {
        label: '问答',
        value: 'ask'
    },
    {
        label: '招聘',
        value: 'job'
    }
];
const alert = Modal.alert;

class Publish extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            modalTitle: false,
            modalContent: false,
            modalSelect: false
        }
    }

    /*
     * 发布按钮点击
     * */
    pubHandler(e) {
        let ev = e || window.event;
        ev.preventDefault();

        const {getFieldProps} = this.props.form;
        const {publishFn, login, userinfoFn, PublishTopic, successPublish} = this.props;

        let title = getFieldProps('title').value;
        let content = getFieldProps('content').value;
        let select = getFieldProps('select').value;
        console.log(title, content, select);

        if (!select) {
            this.setState({
                modalSelect: true
            });

            return;
        }

        if (!title || title.length < 5) {
            this.setState({
                modalTitle: true
            });

            return;
        }

        if (!content || content.length < 10) {
            this.setState({
                modalContent: true
            });

            return;
        }

        this.resetForm();

        //1.请求发帖子
        //2.重新获取userinfo的信息, 保证切入到'我的'页面可以看到新的发帖信息
        if (login.accesstoken) {
            publishFn(login.accesstoken, title, select[0], content);
        }

        if (login.loginname) {
            userinfoFn(login.loginname);
        }

        this.showAlert(PublishTopic, successPublish);

    }

    showAlert(PublishTopic, successPublish) {
        let alertInstance = alert('发布主题', '正在发布中...', []);
        setTimeout(() => {
            alertInstance.close();
            if (PublishTopic.hasOwnProperty('failmessage')) {
                Toast.info('发布失败,请重试!', 1);
            }
            else {
                Toast.info('发布成功~', 1);
                successPublish(); //跳转到'我的'页面
            }

        }, 2000);
    }

    resetForm() {
        const Form = this.props.form;
        Form.setFieldsValue({
            select: '',
            title: '',
            content: ''
        })
    }

    onClose(key) {
        if (!key) return;
        this.setState({
            [key]: false   //ES6计算属性['modalTitle']
        })
    }

    render() {
        let {getFieldProps} = this.props.form;
        let {err} = this.props;
        return (
            <div>
                <Picker data={source} cols={1} className="forss" {...getFieldProps('select')}>
                    <List.Item arrow="horizontal">请选择发表类型</List.Item>
                </Picker>
                <List>
                    <TextareaItem {...getFieldProps('title')} placeholder="输入标题" title="标题" data-seed="logId" autoHeight/>
                    <TextareaItem {...getFieldProps('content')} title="内容" placeholder="内容字数10字以上" autoHeight/>
                    <WhiteSpace size="lg"/>
                    <WingBlank>
                        <Button onClick={this.pubHandler.bind(this)} className="user-publish-button">发布</Button>
                    </WingBlank>
                </List>
                <Modal
                    title="还不可以发布~"
                    transparent
                    maskClosable={false}
                    visible={this.state.modalSelect || this.state.modalTitle || this.state.modalContent}
                    onClose={this.onClose.bind(this, this.state.modalSelect
                        ? 'modalSelect' : this.state.modalTitle
                        ? 'modalTitle' : this.state.modalContent ? 'modalContent' : '')}
                    footer={[{
                        text: '确定', onPress: () => {
                            this.onClose.call(this, this.state.modalSelect
                                ? 'modalSelect' : this.state.modalTitle
                                ? 'modalTitle' : this.state.modalContent ? 'modalContent' : '');
                        }
                    }]}>
                    {this.state.modalSelect ? '请选择类型, 若是测试贴必须选择测试发帖'
                        : this.state.modalTitle ? '标题不能为空且长度不少于5字'
                        : this.state.modalContent ? '内容不能为空且长度不少于10字':''}
                </Modal>
            </div>
        )
    }

}

export default Publish = createForm({})(Publish)