import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './app.less';
import configureStore from './store/configureStore';
import * as Routers from './Router';
import connectComponent from './utils/connectComponent.js';

const Router = connectComponent(Routers);
const store = configureStore();

function App() {
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    );
}

ReactDOM.render(<App />, document.getElementById('main'));
