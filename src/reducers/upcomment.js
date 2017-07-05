/**
 * Created by Administrator on 2017/7/5 0005.
 */
import * as ActionType from '../contants/action_contants';
const initialState = {
    todo: ''
};

export function UpComments(state=initialState, action) {
    switch (action.type) {
        case ActionType.SUCCESS_UPCOMMENTS:
            return {
                ...state,
                todo: action.todo
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