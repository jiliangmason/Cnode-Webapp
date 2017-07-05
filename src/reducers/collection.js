/**
 * Created by Administrator on 2017/6/25 0025.
 */
import * as ActionType from '../contants/action_contants';

const initialState = {
    isFetching: false,
    collect: [],
    id: '',
    collectSuccess: false
};

export function Collect(state = initialState, action) {
    switch (action.type) {
        case ActionType.REQUEST_COLLECTION:
            return {
                ...state,
                isFetching: true,
                collectSuccess: false
            };

        case ActionType.RECEIVE_COLLECTION:
            return {
                ...state,
                isFetching: false,
                collectSuccess: false,
                collect: action.collect
            };

        case ActionType.COLLECT_TOPIC_SUCCESS:
            return {
                ...state,
                collectSuccess: action.success,
                id: action.id
            };

        case ActionType.COLLECT_TOPIC_FAILED:
            return {
                ...state,
                failmessage: action.error_msg
            };

        default:
            return state;
    }
}