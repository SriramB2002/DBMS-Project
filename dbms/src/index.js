import React from "react";
import ReactDOM from "react-dom";
import "bulma/css/bulma.css";
import "./styles.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import userReducer from './Reducers/UserReducer';
import loginReducer from './Reducers/LoginReducer';

const store = configureStore({
    reducer: {
        userReducer,
        loginReducer
    }
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById("root"));
serviceWorker.unregister();
