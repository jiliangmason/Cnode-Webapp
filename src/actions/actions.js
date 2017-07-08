import * as ActionType from '../contants/action_contants';

/******************************access_token**********************************************/

export function requestAccessToken(accessToken) {
    return (dispatch) => {
        const url = 'https://cnodejs.org/api/v1/accesstoken';  //授权地址
        let myOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `accesstoken=${accessToken}`
        };
        fetch(url, myOptions)
            .then(res=>res.json())
            .then(json=> {
                console.log('req-access:', json);
                if (json.success) {
                    dispatch(successLogin(accessToken, json.loginname, json.id)); //auth授权成功
                }
                else {
                    dispatch(failLogin(json.error_msg)); //auth授权失败
                }
            })
    }
}

export function successLogin(accesstoken, loginname, id) {
    return {
        type: ActionType.SUCCESS_LOGIN,
        accesstoken,  //acess token
        loginname,  //登陆名
        id  //登陆id
    }
}

export function failLogin(error_msg) {
    return {
        type: ActionType.FAIL_LOGIN,
        error_msg
    }
}

export function logout() {
    return {
        type: ActionType.LOG_OUT
    }
}

/********************************topic***********************************/

export function topicSelect(tab) {
    return {
        type: ActionType.SELECT_TAB,
        tab
    }
}

export function fetchTopic(tab, page = 1, limit = 10) {
    return (dispatch, getState) => {
        let url = `https://cnodejs.org/api/v1/topics?tab=${tab}&page=${page}&limit=${limit}`;
        const myFetchOption = {
            method: 'GET'
        };
        dispatch(requestTopic(tab));
        fetch(url, myFetchOption)
            .then(res=>res.json())
            .then(json=>{
                console.log("topic-data:", json);
                dispatch(receiveTopic(tab, json.data, page, limit));
            })
    }
}

function requestTopic(tab) {
    return {
        type: ActionType.REQUEST_TOPICS,
        tab
    }
}

function receiveTopic(tab, data, page, limit) {
    return {
        type: ActionType.RECEIVE_TOPICS,
        tab,
        data,
        page,
        limit
    }
}

/********************************userinfo***********************************/

export function fetchUserInfo(loginname) {
    return (dispatch, getState)=>{
        let state = getState();  //state是全局的状态树
        const fetchOptions = {
            method: 'GET'
        };

        dispatch(requestUserInfo(loginname));
        //console.log('userinfo的state', state);

        fetch(`https://cnodejs.org/api/v1/user/${loginname}`, fetchOptions)
            .then(res=>res.json())
            .then(json=>{
                console.log('user-info:', json);
                if (json.success) {
                    dispatch(receiveUserInfo(loginname, json.data))
                }
                else {
                    dispatch(failUserInfo(json.error_msg))
                }
            })
    }
}

export function requestUserInfo(loginname) {
    return {
        type: ActionType.REQUEST_USERINFO,
        loginname
    }
}

export function receiveUserInfo(loginname, data) {
    return {
        type: ActionType.RECEIVE_USERINFO,
        loginname,
        data
    }
}

export function failUserInfo(error_msg) {
    return {
        type: ActionType.FAIL_USERINFO,
        error_msg
    }
}

/********************************collection***********************************/

export function fetchUserCollection(loginname) {
    return (dispatch, getState)=>{
        let state = getState();
        const fetchOptions = {
            method: 'GET'
        };

        dispatch(requestUserCollection(loginname));
        fetch(`https://cnodejs.org/api/v1/topic_collect/${loginname}`, fetchOptions)
             .then(res=>res.json())
             .then(json=>{
                 console.log('collect-data', json);
                 dispatch(receiveUserCollection(loginname, json.data));
             })
    }
}

export function requestUserCollection(loginname) {
    return {
        type: ActionType.REQUEST_COLLECTION,
        loginname
    }
}

export function receiveUserCollection(loginname, collect) {
    return {
        type: ActionType.RECEIVE_COLLECTION,
        loginname,
        collect
    }
}

/*
* 发起请求收藏topic
* */
export function postCollectTopic(accesstoken, topicId, isCollect) {
    return (dispatch)=>{
        let url = `https://cnodejs.org/api/v1/topic_collect/${isCollect?'de_collect':'collect'}`;
        let postCollectOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `accesstoken=${accesstoken}&topic_id=${topicId}`
        };
        fetch(url, postCollectOptions)
            .then(res=>res.json())
            .then(json=>{
                if (json.success) {
                    dispatch(successPostCollection(json.success, topicId))
                }
                else {
                    dispatch(failPostCollection(json.error_msg))
                }
            })
    }
}

export function successPostCollection(success, id) {
    return {
        type: ActionType.COLLECT_TOPIC_SUCCESS,
        success,
        id
    }
}

export function failPostCollection(error_msg) {
    return {
        type: ActionType.COLLECT_TOPIC_FAILED,
        error_msg
    }
}

/********************************publish***********************************/

export function postUserPublish(accesstoken, title, tab, content) {
    return (dispatch)=>{
        let url = 'https://cnodejs.org/api/v1/topics';
        let postPublishOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `accesstoken=${accesstoken}&title=${title}&tab=${tab}&content=${content}`
        };
        fetch(url, postPublishOptions)
            .then(res=>res.json())
            .then(json=>{
                console.log('publish-data:', json);
                if (json.success) {
                    dispatch(successPublish(json.success, json.topic_id));
                }
                else {
                    dispatch(failPublish(json.error_msg));
                }
            })
        
    }
}

export function successPublish(success, topicId) {
    return {
        type: ActionType.SUCCESS_PUBLISH,
        success,
        topicId
    }
}

export function failPublish(error_msg) {
    return {
        type: ActionType.FAIL_PUBLISH,
        error_msg
    }
}

/********************************message***********************************/

export function fetchUserMessage(accesstoken) {
    return (dispatch) => {
        const fetchOptions = {
            method: 'GET'
        };
        dispatch(requestUserMessage());
        fetch(`https://cnodejs.org/api/v1/messages?accesstoken=${accesstoken}`, fetchOptions)
            .then(res=>res.json())
            .then(json=>{
                console.log('user-message:', json);
                if (json.success) {
                    dispatch(receiveUserMessage(json.data.has_read_messages, json.data.hasnot_read_messages))
                }
                else {
                    dispatch(failUserMessage(json.error_msg))
                }
            })
    }
}

export function requestUserMessage() {
    return {
        type: ActionType.REQUEST_MESSAGE
    }
}

export function receiveUserMessage(has_read_messages, hasnot_read_messages) {
    return {
        type: ActionType.RECEIVE_MESSAGE,
        has_read_messages,
        hasnot_read_messages
    }
}

export function failUserMessage(error_msg) {
    return {
        type: ActionType.ERROR_MESSAGE,
        error_msg
    }
}

export function postMarkMessage(accesstoken, msgId) {
    return (dispatch) => {
        let url = `https://cnodejs.org/api/v1/message/mark_one/${msgId}`;
        let postPublishOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `accesstoken=${accesstoken}`
        };
        fetch(url, postPublishOptions)
            .then(res=>res.json())
            .then(json=>{
                console.log('markmessage-data:', json);
                if (json.success) {
                    dispatch(successMarkMessage(json.marked_msg_id, json.success));
                }
                else {
                    dispatch(failMarkMessage(json.error_msg, json.success));
                }
            })
    }
}

export function successMarkMessage(msgId, success) {
    return {
        type: ActionType.SUCCESS_MARK_MESSAGE,
        msgId,
        success
    }
}

export function failMarkMessage(error_msg, success) {
    return {
        type: ActionType.ERROR_MARK_MESSAGE,
        error_msg,
        success
    }
}

/********************************details***********************************/

export function fetchArticleDetails(id) {
    return (dispatch, getState)=>{
        const fetchOptions = {
            method: 'GET'
        };
        dispatch(requestArticleDetails(id));
        fetch(`https://cnodejs.org/api/v1/topic/${id}`, fetchOptions)
            .then(res=>res.json())
            .then(json=>{
                if (json.success) {
                    console.log('article-details:', json);
                    dispatch(receiveArticleDetails(json.data))
                }
                else {
                    dispatch(failArticleDetails(json.error_msg))
                }
            })
    }
}

export function requestArticleDetails(id) {
    return {
        type: ActionType.REQUEST_DETAILS,
        id
    }
}

export function receiveArticleDetails(data) {
    return {
        type: ActionType.RECEIVE_DETAILS,
        data
    }
}

export function failArticleDetails(error_msg) {
    return {
        type: ActionType.ERROR_DETAILS,
        error_msg
    }
}

/*
 * 改变某一个主题的收藏状态is_collect
 * */
export function updateCollectStatus(details) {
    return {
        type: ActionType.UPDATE_DETAILS,
        details
    }
}

/********************************comments***********************************/

export function upComments(accesstoken, replyId) {
    return (dispatch)=>{
        let url = `https://cnodejs.org/api/v1/reply/${replyId}/ups`;
        let postPublishOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `accesstoken=${accesstoken}`
        };
        fetch(url, postPublishOptions)
            .then(res=>res.json())
            .then(json=>{
                console.log('upcomments-data:', json);
                if (json.success) {
                    dispatch(successUpComments(json.action, json.success));
                }
                else {
                    dispatch(failUpComments(json.error_msg, json.success));
                }
            })
    }
}

export function successUpComments(action_type, success) {
    return {
        type: ActionType.SUCCESS_UPCOMMENTS,
        success,
        todo: action_type
    }
}

export function failUpComments(error_msg, success) {
    return {
        type: ActionType.ERROR_UPCOMMENTS,
        success,
        error_msg
    }
}


/********************************replies***********************************/

export function postUserReplies(accesstoken, content, topicId, replyId) {
    return (dispatch)=>{
        let url = `https://cnodejs.org/api/v1/topic/${topicId}/replies`;
        let paramsBody = replyId ? `accesstoken=${accesstoken}&content=${content}&reply_id=${replyId}`
            : `accesstoken=${accesstoken}&content=${content}`;
        let postPublishOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: paramsBody
        };
        fetch(url, postPublishOptions)
            .then(res=>res.json())
            .then(json=>{
                console.log('replies-data:', json);
                if (json.success) {
                    dispatch(successReplies(json.reply_id, json.success));
                }
                else {
                    dispatch(failReplies(json.error_msg, json.success));
                }
            })
    }
}

export function successReplies(replyid, success) {
    return {
        type: ActionType.SUCCESS_REPLIES,
        replyid,
        success
    }
}

export function failReplies(error_msg, success) {
    return {
        type: ActionType.ERROR_REPLIES,
        error_msg,
        success
    }
}

/********************************otherUserInfo***********************************/
export function fetchOtherUserInfo(loginname) {
    return (dispatch, getState)=>{
        let state = getState();  //state是全局的状态树
        const fetchOptions = {
            method: 'GET'
        };

        fetch(`https://cnodejs.org/api/v1/user/${loginname}`, fetchOptions)
            .then(res=>res.json())
            .then(json=>{
                console.log('other-user-info:', json);
                if (json.success) {
                    dispatch(receiveOtherUserInfo(loginname, json.data))
                }
                else {
                    dispatch(failOtherUserInfo(json.error_msg))
                }
            })
    }
}

export function fetchOtherUserCollection(loginname) {
    return (dispatch, getState)=>{
        let state = getState();
        const fetchOptions = {
            method: 'GET'
        };

        fetch(`https://cnodejs.org/api/v1/topic_collect/${loginname}`, fetchOptions)
            .then(res=>res.json())
            .then(json=>{
                console.log('other-collect-data', json);
                if (json.success) {
                    dispatch(receiveOtherUserCollection(loginname, json.data));
                }
                else {
                    dispatch(failOtherUserInfo(json.error_msg));
                }

            })
    }
}

export function receiveOtherUserInfo(loginname, info) {
    return {
        type: ActionType.RECEIVE_OTHER_INFO,
        loginname,
        info
    }
}

export function receiveOtherUserCollection(loginname, collect) {
    return {
        type: ActionType.RECEIVE_OTHER_COLLECT,
        loginname,
        collect
    }
}

export function failOtherUserInfo(error_msg) {
    return {
        type: ActionType.ERROR_OTHER_INFO,
        error_msg
    }
}


