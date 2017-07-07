/**
 * Created by Administrator on 2017/7/7 0007.
 */
import * as ActionType from '../contants/action_contants';
const initialState = {
    msgId: '',
    success: false
};

export function Mark(state=initialState, action) {
    switch (action.type) {
        case ActionType.SUCCESS_MARK_MESSAGE:
            return {
                ...state,
                success: action.success,
                msgId: action.msgId
            };

        case ActionType.ERROR_UPCOMMENTS:
            return {
                ...state,
                success: action.success,
                failmessage: action.error_msg
            };

        default:
            return state;
    }

}