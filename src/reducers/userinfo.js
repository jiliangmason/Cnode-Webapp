/**
 * Created by Administrator on 2017/6/23 0023.
 */
import * as ActionType from '../contants/action_contants';
const initialState = {
    isFetching: false,
    userinfo: {}
};

export function UserInfo(state = initialState, action) {
    switch (action.type) {
        case ActionType.REQUEST_USERINFO:
            return {
                ...state,
                isFetching: true,
                userinfo: {}
            };

        case ActionType.RECEIVE_USERINFO:
            return {
                ...state,
                isFetching: false,
                userinfo: action.data
            };

        case ActionType.FAIL_USERINFO:
            return {
                ...state,
                failmessage: action.error_msg
            };

        default:
            return state;
    }
}