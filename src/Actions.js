const addBlogsAction = (blogs) => {
    return {
        type:'addBlogs',
        blogs
    };
};

const addShowBlogsAction = (blogs) => {
    return {
        type:'addShowBlogs',
        blogs
    };
};

const modifyCurrentLabelAction = (label) => {
    return {
        type:'modifyCurrentLabel',
        label
    };
};

export { addBlogsAction, addShowBlogsAction, modifyCurrentLabelAction }