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

        if (state.UserInfo.isFetching) {
            return;
        }

        fetch(`https://cnodejs.org/api/v1/user/${loginname}`, fetchOptions)
            .then(res=>res.json())
            .then(json=>{
                console.log('user-info:', json);
                dispatch(receiveUserInfo(loginname, json.data))
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

/********************************collection***********************************/

export function fetchUserCollection(loginname) {
    return (dispatch, getState)=>{
        let state = getState();
        const fetchOptions = {
            method: 'GET'
        };

        dispatch(requestUserCollection(loginname));
        if (state.Collect.isFetching) return;
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

