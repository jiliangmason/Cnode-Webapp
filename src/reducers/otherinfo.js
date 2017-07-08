/**
 * Created by Administrator on 2017/7/8 0008.
 */
/**
 * Created by Administrator on 2017/7/7 0007.
 */
import * as ActionType from '../contants/action_contants';
const initialState = {
    loginname: ''
};

export function OtherInfo(state=initialState, action) {
    switch (action.type) {
        case ActionType.RECEIVE_OTHER_INFO:
            return {
                ...state,
                loginname: action.loginname,
                info: action.info
            };

        case ActionType.RECEIVE_OTHER_COLLECT:
            return {
                ...state,
                loginname: action.loginname,
                collect: action.collect
            };

        case ActionType.ERROR_UPCOMMENTS:
            return {
                ...state,
                failmessage: action.error_msg
            };

        default:
            return state;
    }

}