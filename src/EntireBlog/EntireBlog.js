import React from 'react';
import './EntireBlog.css';
import { connect } from 'react-redux';
import Loading from '../Loading/Loading';
import showdown from 'showdown';

class EntireBlog extends React.Component {
    constructor({match}){
        super();
        this.state = {
            display:<Loading/>,
            id:match.params.id
        };
        this.Converter = new showdown.Converter();
    }
    componentDidMount(){
        if(this.props.blogs.length !== 0){
            this.props.blogs.forEach(blog => {
                if(blog.id == this.state.id){
                    this.blog = blog;
                }
            });
            let display = <h1 className="EntireBlog-title">{this.blog.title}</h1>;
            this.setState({display});
            document.getElementsByClassName('EntireBlog-body')[0].innerHTML = this.Converter.makeHtml(this.blog.body);
        }
        //在展示整个完整的博客时，让博客归类信息栏宽度变为0
        //这个处理放在componentDidMount钩子函数中，以便在刷新展示页面时
        //博客归类信息栏会隐藏
        let a = document.getElementsByClassName('Home-detail')[0];
        a.style.width = '0';
    }
    componentDidUpdate(prevProps){
        if(prevProps !== this.props){
            this.props.blogs.forEach(blog => {
                if(blog.id == this.state.id){
                    this.blog = blog;
                }
            });
            let display = <h1 className="EntireBlog-title">{this.blog.title}</h1>;
            this.setState({display});
            document.getElementsByClassName('EntireBlog-body')[0].innerHTML = this.Converter.makeHtml(this.blog.body);
        }
    }
    render(){
        return <div className="EntireBlog">
            {this.state.display}
            <div className="EntireBlog-body"></div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        blogs:state.blogs
    };
};

const EntireBlogContainer = connect(mapStateToProps,null)(EntireBlog);

export default EntireBlogContainer;