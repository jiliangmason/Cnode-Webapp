import React from 'react';
import ReactDOM from 'react-dom';
import storeCreate from './store/store';
import {Provider} from 'react-redux';
import RouterMap from './router/router';
import './common/common.less';

const store = storeCreate();

export default class Index extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Provider store={store}>
                <RouterMap />
            </Provider>
        )
    }

}

ReactDOM.render(<Index />, document.getElementById('container'));