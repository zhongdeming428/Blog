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
//显示的博客数量
let showBlogsCount = 10;

window.addEventListener('scroll',()=>{
    if(window.scrollY < 100){
        header.className = 'Header Header-display';
        logo.className = 'Header-title Title-display';
    }
    if(window.scrollY > 100){
        header.className = 'Header Header-collapse';
        logo.className = 'Header-title Title-collapse';
    }
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;         
    let clientHeight = document.documentElement.clientHeight;
    let scrollHeight = document.body.scrollHeight;
    if(scrollTop >= scrollHeight - clientHeight){
        //此时网页到达最底部，开始自动加载更多数据
        //将state中的标志位置位，显示FetchMore组件
        store.dispatch({
            type:'toggleShouldFetchMore',
            shouldFetchMore:true
        });
        //给state的showBlogs数组添加新数据
        let blogs = store.getState().blogs;
        store.dispatch({
            type:'addShowBlogs',
            blogs:blogs.slice(0,++showBlogsCount)
        });
        store.dispatch({
            type:'toggleShouldFetchMore',
            shouldFetchMore:false
        });
    }
});
