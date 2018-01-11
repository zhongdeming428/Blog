import React from 'react';
import './EntireBlog.css';
import { connect } from 'react-redux';
import Loading from '../Loading/Loading';
import showdown from 'showdown';
import WriteComment from '../WriteComment/WriteComment';
import DisplayComments from '../DisplayComments/DisplayComments';
import LC from "leancloud-storage";

class EntireBlog extends React.Component {
    constructor({match}){
        super();
        this.state = {
            display:<Loading/>,
            id:match.params.id,
            blogInfo:{
                like:0,
                visited:1,
                blogID:match.params.id
            },
            storedID:''
        };
        this.Converter = new showdown.Converter();
        this.processData = this.processData.bind(this);
        this.like = this.like.bind(this);
        this.getLCData = this.getLCData.bind(this);
    }
    componentDidMount(){
        if(this.props.blogs.length !== 0){
            this.processData();
            this.getLCData();
        }
        //在展示整个完整的博客时，让博客归类信息栏宽度变为0
        //这个处理放在componentDidMount钩子函数中，以便在刷新展示页面时
        //博客归类信息栏会隐藏
        let a = document.getElementsByClassName('Home-detail')[0];
        a.style.width = '0';
        
    }
    //点赞处理函数
    like(e){
        if (e.target.classList.value === 'far fa-heart') {
            e.target.className = "fas fa-heart";
            let like = this.state.blogInfo.like + 1;
            let blogInfo = {
                like,
                visited: this.state.blogInfo.visited,
                blogID: this.state.blogInfo.blogID
            };
            this.setState({
                blogInfo
            },()=>{
                let todo = LC.Object.createWithoutData('BlogInfo', this.state.storedID);
                todo.save({
                    like: this.state.blogInfo.like
                });
            });
            
        }
    }
    //构造组件的函数
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
            <p className="Blog-time">
                <span>{
                    this.state.blogInfo.like
                }</span>
                <i className="far fa-heart" onClick={this.like}></i>
            </p>
            <p className="Blog-time">
                <span>
                    {
                        this.state.blogInfo.visited
                    }
                </span>
                <i className="fas fa-eye"></i>
            </p>
        </div>;
        this.setState({display});
        document.getElementsByClassName('EntireBlog-body')[0].innerHTML = this.Converter.makeHtml(this.blog.body);
    }
    //从服务器获取数据的函数
    getLCData() {
        let BlogInfo = LC.Object.extend('BlogInfo');
        let blogInfo = new BlogInfo();
        let queryStr = 'select COUNT(*) from BlogInfo where blogID = "' + this.state.id + '"';
        LC.Query.doCloudQuery(queryStr).then(
            data => {
                if (data.count === 0) {
                    let obj = {
                        blogID: this.state.id,
                        visited: 1,
                        like: 0
                    };
                    blogInfo.save(obj).then(
                        data => {
                            this.setState({
                                storedID: data.id
                            });
                        },
                        e => {
                            console.log(e)
                        }
                    );

                }
                else {
                    let queryStr = 'select * from BlogInfo where blogID = "' + this.state.id + '"';
                    LC.Query.doCloudQuery(queryStr).then(
                        data => {
                            this.setState({ storedID: data.results[0].id });
                            this.setState({ blogInfo: data.results[0].attributes });
                            let todo = LC.Object.createWithoutData('BlogInfo', data.results[0].id);
                            // 保存到云端
                            todo.save({
                                visited: this.state.blogInfo.visited + 1
                            });
                        },
                        e => {
                            console.log(e);
                        }
                    );
                }
            },
            e => {
                console.log(e);
            }
        );
    }
    componentDidUpdate(prevProps, prevState){
        //在props获取到state之后再获取点赞数以及浏览数
        if(prevProps !== this.props){
            this.getLCData();
            this.processData();
        }
        //防止发生无限循环调用导致call stack溢出
        if (prevState.blogInfo !== this.state.blogInfo) {
            this.processData();
        }
    }
    render() {
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