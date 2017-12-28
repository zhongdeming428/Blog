import React from 'react';
import './Blogs.css';
import { connect } from 'react-redux';


class Blogs extends React.Component {
    render(){
        return <div className="Blogs">
            {
                this.props.blogs.map(blog => {
                    return <div>{blog.title}</div>
                })
            }
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        blogs:state.blogs
    };
};

const mapDispatchToProps = null;

const BlogsContainer = connect(mapStateToProps,mapDispatchToProps)(Blogs);

export default BlogsContainer;