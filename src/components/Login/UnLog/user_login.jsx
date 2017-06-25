import React from 'react';
import {List, WhiteSpace, InputItem, Button, Card, Flex} from 'antd-mobile';
import {createForm} from 'rc-form';

class UserLogin extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: '',
            focus: false
        }
    }

    changeHandler(ev) {

    }

    loginHandler() {
        let {login} = this.props;
        let accesstoken = this.props.form.getFieldsValue().accesstoken;
        login(accesstoken);
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <Flex justify="center">
                <div className="user-login-form">
                    <Card className="user-login-input-area">
                        <Card.Body>
                            {getFieldDecorator('accesstoken')(<InputItem placeholder='cnode社区设置下面查看Token'
                                                                         onChange={this.changeHandler.bind(this)}/>)}
                            <Button className="user-login-btn" type="primary"
                                    onClick={this.loginHandler.bind(this)}>登陆</Button>
                        </Card.Body>
                    </Card>
                </div>
            </Flex>
        )
    }

}

export default UserLogin = createForm({})(UserLogin)