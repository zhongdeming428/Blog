import React from 'react';
import './Comment.css';
import { connect } from 'react-redux';

class Comment extends React.Component {
    constructor(){
        super();
        this.state = {
            comment:{
                name:'',
                comment:'',
                at:''
            }
        };
        this.reply = this.reply.bind(this);
    }
    componentDidMount(){
        this.setState({comment: this.props.comment});
        this.setState({number: this.props.number});
    }
    reply(){
        let action = {
            type:'modifyReplyAt',
            replyAt:{
                name:this.state.comment.name,
                order:String(this.state.number)
            }
        };
        this.props.updateReplyAt(action);
    }
    render(){
        return <div className='Comment'>
            <h2>
                {'#' + this.state.number + ' '}
                {this.state.comment ? this.state.comment.name : null}
                {this.state.comment.at ? ' 回复：' + this.state.comment.at : null}
            </h2>
            <p id="comment">{this.state.comment ? this.state.comment.comment : null}</p>
            <p id="comment_info">
                {this.state.comment ? (new Date(this.state.comment.time)).toLocaleString() : null}
                <br/>
                <a href="#WriteComment" onClick={this.reply}>回复</a>
            </p>
        </div>
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateReplyAt(action){
            dispatch(action);
        }
    }
};

const CommentContainer = connect(null, mapDispatchToProps)(Comment);

export default CommentContainer;