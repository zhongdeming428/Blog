import React from 'react';
import './Blog.css';
import { NavLink } from 'react-router-dom';

class Blog extends React.Component {
    render(){
        return <div className="Blog">
            <NavLink className="Blog-title" activeClassName="active-Link" to={'/Blog/'+this.props.blogId}>
                {this.props.blogTitle}
            </NavLink>
            <p className="Blog-body">
                {this.props.blogBody.length>1?this.props.blogBody.substring(0,200)+'....':this.props.blogBody}
            </p>
            <p className="Blog-info">
                <span>{'日期：'+this.props.blogTime}</span>
                <span>{'评论：('+this.props.blogComments+')'}</span>
            </p>
        </div>
    }
}

export default Blog;