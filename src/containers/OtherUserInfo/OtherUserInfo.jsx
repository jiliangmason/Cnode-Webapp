import React from 'react';
import {connect} from 'react-redux';
import {NavBar, Toast} from 'antd-mobile';
import UserInfo from '../../components/Login/Log/user_info';
import * as ActionList from '../../actions/actions';

class OtherUserInfo extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        const {dispatch, params} = this.props;
        let username = params.loginname;
        if (!username) return;

        dispatch(ActionList.fetchOtherUserInfo(username));
        dispatch(ActionList.fetchOtherUserCollection(username));
    }

    leftClickHandler() {
        window.history.back();
    }

    render() {
        const {OtherInfo} = this.props;
        return (
            <div>
                <div style={{position: 'fixed', top: 0, width: '100%', zIndex: '999'}}>
                    <NavBar onLeftClick={this.leftClickHandler.bind(this)}>详情</NavBar>
                </div>
                {(OtherInfo.hasOwnProperty('info') && OtherInfo.hasOwnProperty('collect')) ? <UserInfo userinfo={OtherInfo.info} collect={OtherInfo.collect}/> : ''}
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        OtherInfo: state.OtherInfo
    }
}

export default connect(mapStateToProps)(OtherUserInfo)