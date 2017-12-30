import React from 'react';
import './Blogs.css';
import { connect } from 'react-redux';
import Blog from '../Blog/Blog';
import Loading from '../Loading/Loading';

class Blogs extends React.Component {
    render(){
        return <div className="Blogs">
            <div className="Blogs-label">{this.props.currentLabel}</div>
            { this.props.blogs.length === 0 ? <Loading/> : null }
            {
                this.props.blogs.map(blog => {
                    return <Blog
                        blogId={blog.id}
                        blogTime={(new Date(blog.created_at)).toLocaleDateString()}
                        blogComments={blog.comments}
                        key={blog.number}
                        blogTitle={blog.title}
                        blogBody={blog.body} />
                })
            }
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        blogs:state.showBlogs,
        currentLabel:state.currentLabel
    };
};

const mapDispatchToProps = null;

const BlogsContainer = connect(mapStateToProps,mapDispatchToProps)(Blogs);

export default BlogsContainer;