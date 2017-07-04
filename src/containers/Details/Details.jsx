import React from 'react';
import * as ActionList from '../../actions/actions';
import {connect} from 'react-redux';
import {NavBar, ActivityIndicator} from 'antd-mobile';
import ArticleDetails from '../../components/Details/details';

class Details extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        const {dispatch, params} = this.props;
        const articleId = params.id;
        dispatch(ActionList.fetchArticleDetails(articleId));
    }

    leftClickHandler() {
        window.history.back();
    }

    render() {
        const {Details} = this.props;
        return (
            <div>
                <NavBar onLeftClick={this.leftClickHandler.bind(this)}>详情</NavBar>
                {(Details.details && Details.details.id) ? <ArticleDetails details={Details.details}/>:<ActivityIndicator size="lg"/>}
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        Details: state.Details
    }
}

export default connect(mapStateToProps)(Details)