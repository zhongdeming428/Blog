import React from 'react';
import './EntireBlog.css';
import { connect } from 'react-redux';
import Loading from '../Loading/Loading';
import showdown from 'showdown';
import WriteComment from '../WriteComment/WriteComment';
import DisplayComments from '../DisplayComments/DisplayComments';

class EntireBlog extends React.Component {
    constructor({match}){
        super();
        this.state = {
            display:<Loading/>,
            id:match.params.id
        };
        this.Converter = new showdown.Converter();
        this.processData = this.processData.bind(this);
    }
    componentDidMount(){
        if(this.props.blogs.length !== 0){
            this.processData();
        }
        //在展示整个完整的博客时，让博客归类信息栏宽度变为0
        //这个处理放在componentDidMount钩子函数中，以便在刷新展示页面时
        //博客归类信息栏会隐藏
        let a = document.getElementsByClassName('Home-detail')[0];
        a.style.width = '0';
    }
    processData(){
        this.props.blogs.forEach(blog => {
            if(blog.id == this.state.id){
                this.blog = blog;
            }
        });
        let display = <div className="Blog-head">
            <h1 className="EntireBlog-title">{this.blog.title}</h1>
            {
                this.blog.labels.map(label => {
                    return <span className="Blog-label" key={label.name}>{label.name}</span>
                })
            }
            <p className='Blog-time'>
                <span className="Blog-label">
                    {
                        (new Date(this.blog.created_at)).toLocaleDateString()
                    }
                </span>
            </p>
        </div>;
        this.setState({display});
        document.getElementsByClassName('EntireBlog-body')[0].innerHTML = this.Converter.makeHtml(this.blog.body);
    }
    componentDidUpdate(prevProps){
        if(prevProps !== this.props){
            this.processData();
        }
    }
    render(){
        return <div className="EntireBlog">
            {this.state.display}
            <div className="EntireBlog-body"></div>
            <WriteComment blogID={this.state.id}/>
            <DisplayComments blogID={this.state.id}/>
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