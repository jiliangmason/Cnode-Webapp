/**
 * Created by Administrator on 2017/7/5 0005.
 */
import * as ActionType from '../contants/action_contants';
const initialState = {
    todo: '',
    success: false
};

export function UpComments(state=initialState, action) {
    switch (action.type) {
        case ActionType.SUCCESS_UPCOMMENTS:
            return {
                ...state,
                success: action.success,
                todo: action.todo
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