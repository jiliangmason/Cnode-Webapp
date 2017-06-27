/**
 * Created by Administrator on 2017/6/19 0019.
 */
import * as ActionType from '../contants/action_contants';

const initialState = {
    selectedTab: 'good',
    tabData: {
        isFetching: false,  //准备开始获取
        page: 0,
        topics: []
    }
};
export default function Topic(state=initialState, action) {
    switch (action.type) {
        case ActionType.SELECT_TAB:
            return {
                ...state,
                selectedTab: action.tab,
                tabData: {
                    isFetching: false,
                    topics: []    //保证每次切tab的时候，topics为空数组，可以发起fetch_topic
                }
            };

        case ActionType.REQUEST_TOPICS:  //开始请求
            return {
                ...state,
                tabData: {
                    isFetching: true
                }
            };

        case ActionType.RECEIVE_TOPICS: //接受响应
            return {
                ...state,
                tabData: {
                    isFetching: false,
                    topics: action.data,
                    page: action.page,
                    limit: action.limit
                }
            };

        default:
            return state;
    }
}