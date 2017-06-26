/**
 * Created by Administrator on 2017/6/25 0025.
 */
import * as ActionType from '../contants/action_contants';

const initialState = {
    isFetching: false,
    collect: []
};

export function Collect(state = initialState, action) {
    switch (action.type) {
        case ActionType.REQUEST_COLLECTION:
            return {
                ...state,
                isFetching: true
            };

        case ActionType.RECEIVE_COLLECTION:
            return {
                ...state,
                isFetching: false,
                collect: action.collect
            };

        default:
            return state;
    }
}