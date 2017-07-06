/**
 * Created by Administrator on 2017/7/6 0006.
 */
/**
 * Created by Administrator on 2017/7/5 0005.
 */
import * as ActionType from '../contants/action_contants';
const initialState = {
    success: false,
    replyid: ''
};

export function Replies(state=initialState, action) {
    switch (action.type) {
        case ActionType.SUCCESS_REPLIES:
            return {
                ...state,
                success: action.success,
                replyid: action.replyid
            };

        case ActionType.ERROR_REPLIES:
            return {
                ...state,
                success: action.success,
                failmessage: action.error_msg
            };

        default:
            return state;
    }

}