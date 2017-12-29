import React from 'react';
import './Blogs.css';
import { connect } from 'react-redux';
import Blog from '../Blog/Blog';

class Blogs extends React.Component {
    render(){
        return <div className="Blogs">
            <div className="Blogs-label">全部</div>
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
        blogs:state.blogs
    };
};

const mapDispatchToProps = null;

const BlogsContainer = connect(mapStateToProps,mapDispatchToProps)(Blogs);

export default BlogsContainer;