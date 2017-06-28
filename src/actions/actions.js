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

