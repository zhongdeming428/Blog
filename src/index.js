import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './Store';

ReactDOM.render(<Provider store={store}>
    <App/>    
</Provider>, document.getElementById('root'));
registerServiceWorker();

let header = document.getElementsByClassName('Header')[0];
let logo = document.getElementsByClassName('Header-title')[0];

window.addEventListener('wheel',(wheel) => {
    if(wheel.deltaY > 0 && window.scrollY < 200){
        header.className = 'Header Header-collapse';
        logo.className = 'Header-title Title-collapse'
    }
    if (wheel.deltaY < 0 && window.scrollY < 300){
        header.className = 'Header Header-display';
        logo.className = 'Header-title Title-display'
    }
});

