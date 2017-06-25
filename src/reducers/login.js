/**
 * Created by Administrator on 2017/6/19 0019.
 */
import * as ActionType from '../contants/action_contants';
const initialState = {};

export function Login(state=initialState, action) {
    switch (action.type) {
        case ActionType.SUCCESS_LOGIN:
            return {
                ...state,
                success: true,
                accesstoken: action.accesstoken,
                loginname: action.loginname,
                id: action.id
            };

        case ActionType.FAIL_LOGIN:
            return {
                ...state,
                success: false,
                failmessage: action.error_msg
            };

        case ActionType.LOG_OUT:
            return {
                ...state,
                success: false
            };

        default:
            return state;
    }
}