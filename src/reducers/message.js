/**
 * Created by Administrator on 2017/6/30 0030.
 */
import * as ActionType from '../contants/action_contants';

const initialState = {
    isFetching: false
};
export default function Message(state=initialState, action) {
    switch (action.type) {
        case ActionType.REQUEST_MESSAGE:
            return {
                ...state,
                isFetching: true
            };

        case ActionType.RECEIVE_MESSAGE:
            return {
                ...state,
                isFetching: false,
                has_read_messages: action.has_read_messages,
                hasnot_read_messages: action.hasnot_read_messages
            };

        case ActionType.ERROR_MESSAGE:
            return {
                ...state,
                failmessage: action.error_msg
            };

        default:
            return state;
    }
}