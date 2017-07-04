/**
 * Created by Administrator on 2017/6/19 0019.
 */
export const SUCCESS_LOGIN = 'SUCCESS_LOGIN'; //成功登陆
export const FAIL_LOGIN = 'FAIL_LOGIN'; //登陆失败
export const LOG_OUT = 'LOG_OUT'; //退出登陆

export const SELECT_TAB = 'SELECT_TAB'; //选项卡切换
export const REQUEST_TOPICS = 'REQUEST_TOPICS'; //依据选项请求成功
export const RECEIVE_TOPICS = 'RECEIVE_TOPICS'; //依据选项请求失败

export const REQUEST_USERINFO = 'REQUEST_USERINFO'; //请求用户信息
export const RECEIVE_USERINFO = 'RECEIVE_USERINFO'; //接收用户信息
export const FAIL_USERINFO = 'FAIL_USERINFO'; //接收用户信息失败

export const REQUEST_COLLECTION = 'REQUEST_COLLECTION'; //请求用户收藏的话题
export const RECEIVE_COLLECTION = 'RECEIVE_COLLECTION'; //接收用户收藏的话题

export const SUCCESS_PUBLISH = 'REQUEST_PUBLISH'; //成功发布主题
export const FAIL_PUBLISH = 'RECEIVE_PUBLISH'; //失败发布主题

export const REQUEST_MESSAGE = 'REQUEST_MESSAGE'; //请求已读和未读消息
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE'; //获取请求信息
export const ERROR_MESSAGE = 'ERROR_MESSAGE';  //请求出错

export const REQUEST_DETAILS = 'REQUEST_DETAILS'; //请求详情页面
export const RECEIVE_DETAILS = 'RECEIVE_DETAILS'; //获取详情页面数据
export const ERROR_DETAILS = 'ERROR_DETAILS'; //获取文章详情页出错