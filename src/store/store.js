/**
 * Created by Administrator on 2017/6/19 0019.
 */
import {rootReducer} from '../reducers/index';
import {compose, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

export default function storeCreate() {
    const store = compose(applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : undefined
    )(createStore)(rootReducer);

    return store;
}
