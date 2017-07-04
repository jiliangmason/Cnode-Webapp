import React from 'react';
import {Card, Button} from 'antd-mobile';
import GetTime from '../../utils/GetTime';

export default class ArticleDetails extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {details} = this.props;
        return (
            <div>
                <Card>
                    <Card.Header title={`作者: ${details.author.loginname}`}  extra={<span>发布于{GetTime.calculateTime(new Date(), details.create_at)}</span>}/>
                    <Card.Body>
                        <div>{details.title}</div>
                    </Card.Body>
                    <Card.Footer content={`${details.visit_count}次浏览 共${details.reply_count}条评论`} extra={<Button type="primary">关注</Button>}/>
                </Card>
            </div>
        )
    }

}