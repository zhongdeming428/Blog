import { combineReducers } from 'redux';

//state structure
const state = {
    currentLabel:'All',
    shouldFetchMore:false,
    blogs:[],
    showBlogs:[]
};


const showBlogs = (showBlogs=[], action) => {
    switch(action.type){
        case 'addShowBlogs':return addShowBlogs(showBlogs, action);break;
        default : return showBlogs;
    }
};

const blogs = (blogs=[], action) => {
    switch(action.type){
        case 'addBlogs':return addBlogs(blogs, action);break;
        default :return blogs;
    }
};

const currentLabel = (currentLabel='All', action) => {
    switch(action.type){
        case 'modifyCurrentLabel': return modifyCurrentLabel(currentLabel, action);break;
        default : return currentLabel;
    }
};

const shouldFetchMore = (shouldFetchMore=false, action) => {
    switch(action.type){
        case 'toggleShouldFetchMore':return action.shouldFetchMore;break;
        default : return shouldFetchMore;
    }
};

const Reducer = combineReducers({
    blogs,
    showBlogs,
    currentLabel,
    shouldFetchMore
});

function modifyCurrentLabel(currentLabel, action){
    return action.label;
}

function addBlogs(blogs, action){
    return [...blogs, ...action.blogs];
}

function addShowBlogs(showBlogs, action){
    return action.blogs;
}

export default Reducer;