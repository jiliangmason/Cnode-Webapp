/**
 * Created by Administrator on 2017/7/3 0003.
 */
import * as ActionType from '../contants/action_contants';
const initialState = {
    isFetching: false
};
export function Details(state = initialState, action) {
    switch (action.type) {
        case ActionType.REQUEST_DETAILS:
            return {
                ...state,
                isFetching: true
            };

        case ActionType.RECEIVE_DETAILS:
            return {
                ...state,
                details: action.data,
                isFetching: false
            };

        case ActionType.UPDATE_DETAILS:
            return action.details;

        case ActionType.ERROR_DETAILS:
            return {
                ...state,
                failmessage: action.error_msg
            };

        default:
            return state
    }
}