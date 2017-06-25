/**
 * Created by Administrator on 2017/6/23 0023.
 */
import * as ActionType from '../contants/action_contants';
const initialState = {
    isFetching: false,
    collect: []
};

export function UserInfo(state = initialState, action) {
    switch (action.type) {
        case ActionType.REQUEST_USERINFO:
            return {
                ...state,
                isFetching: true,
                collect: []
            };

        case ActionType.RECEIVE_USERINFO:
            return {
                ...state,
                isFetching: false,
                collect: action.data
            };

        default:
            return state;
    }
}