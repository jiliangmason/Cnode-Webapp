/**
 * Created by Administrator on 2017/6/19 0019.
 */
import {Login} from './login';
import Topic from './topic';
import {UserInfo} from './userinfo';
import {combineReducers} from 'redux';

export const rootReducer = combineReducers({
    Login,
    Topic,
    UserInfo,
});