import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import WrappedNormalLoginForm from './login'
import WrappedNormalRegisterForm from './register'

ReactDOM.render(<WrappedNormalRegisterForm />, document.getElementById('registerBox'));
//ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById('loginBox'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
