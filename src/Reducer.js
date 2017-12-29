import { combineReducers } from 'redux';

//state structure
const state = {
    blogs:[],
};

const blogs = (blogs=[], action) => {
    switch(action.type){
        case 'addBlogs':return addBlogs(blogs, action);break;
        default :return blogs;
    }
};

const Reducer = combineReducers({
    blogs
});

function addBlogs(blogs, action){
    // let blogsArr = [];
    // action.blogs.forEach(blog => {
    //     blogsArr.push(blog);
    // });
    // return [...blogsArr]
    return action.blogs
}

export default Reducer;