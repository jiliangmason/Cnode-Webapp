/**
 * Created by Administrator on 2017/6/27 0027.
 */
import * as ActionType from '../contants/action_contants';

const initialState = {};

export function Publish(state = initialState, action) {
    switch (action.type) {
        case ActionType.SUCCESS_PUBLISH:
            return {
                ...state,
                success: action.success,
                topicId: action.topicId
            };

        case ActionType.FAIL_PUBLISH:
            return {
                ...state,
                success: action.success,
                failmessage: action.error_msg
            };

        default:
            return state;
    }
}