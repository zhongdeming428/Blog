import React from 'react';
import './WriteComment.css';
import LC from 'leancloud-storage';
import { connect } from 'react-redux';

class WriteComment extends React.Component {
    constructor(){
        super();
        this.state = {
            name: '',
            comment: '',
            userInfo:'',
            isInDB:false,
            at:'',
            blogID:''
        };
        this.nameChange = this.nameChange.bind(this);
        this.submit = this.submit.bind(this);
        this.commentChange = this.commentChange.bind(this);
    }
    componentDidMount(){
        //这里打算通过设置用户cookie来标记用户身份
        //标记用户身份后才可评论
        // console.log(window.returnCitySN);
        this.setState({userInfo:window.userIP});
        let queryStr = 'select * from Users where ip = "' + window.userIP.cip + '"';
        LC.Query.doCloudQuery(queryStr).then(   //查询数据库中是否有用户信息
            data => {
                if (data.results.length > 0) {
                    this.setState({ name: data.results[0].attributes.name });
                    document.getElementById('nameInput').disabled = true;
                    this.setState({isInDB:true});
                }
            },
            e=>{
                console.log(e);
            }
        );
        this.setState({blogID:this.props.blogID});
    }
    nameChange(e){
        let name = e.target.value;
        if(name.length <= 10){
            this.setState({name:e.target.value});
        }
        else {
            alert('名字太长，请勿超过10个字符！');
        }
    }
    submit(e){
        let name = this.state.name;
        let comment = this.state.comment;
        if(name === ''){
            alert('名称必须填写！');
            return false;
        }
        if(comment === ''){
            alert('无法提交空的评论！');
            return false;
        }
        this.setState({name:'', comment:''})
        let BlogComments = LC.Object.extend("blogID"+this.props.blogID);
        let blogComment = new BlogComments();
        blogComment.save({
            IP:this.state.userInfo.cip,
            name:this.state.name,
            comment:this.state.comment,
            at: this.props.replyAt.name,
            blogID:this.state.blogID,
            time:new Date()
        }).then(
            ()=>{
                alert('发表成功！');
                window.location.reload();
            },
            e => {
                alert('发表失败，请稍后尝试！');
                console.log(e);
            }
        );
        //如果数据库中没有用户的信，那么存储到数据库
        if (!this.state.isInDB) {
            let Users = LC.Object.extend('Users');
            let user = new Users();
            user.save({
                ip: this.state.userInfo.cip,
                name: this.state.name
            }).then(() => {
                console.log('ip stored');
            }, e => {
                console.log(e);
            });
        }
    }
    commentChange(e){
        let comment = e.target.value;
        if(comment.length <= 200){
            this.setState({comment:comment});
        }
        else {
            alert('回复评论请勿超过200个字符！');
        }
    }
    render(){
        //这里还有一些问题，主要是获取state中的数据的问题。
        return <div className="WriteComment">
            <a name='WriteComment'></a>
            <h1>写评论<small>(不超过200字)</small></h1><br/>
            <label>*你的名字：</label><input id="nameInput" className="input" type="text" onChange={this.nameChange} value={this.state.name}/><br/>
            <div>
                <label>@{this.props.replyAt ? this.props.replyAt.name : null}</label>
            </div>
            <textarea className="textarea" value={this.state.comment} onChange={this.commentChange}/>
            <button className="button" onClick={this.submit}>提交</button>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        replyAt:state.replyAt
    };
};

const WriteCommentContainer = connect(mapStateToProps, null)(WriteComment);

export default WriteCommentContainer;