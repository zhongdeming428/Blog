import React from 'react';
import './DisplayComments.css';
import Comment from './Comment/Comment';
import LC from 'leancloud-storage';

class DisplayComments extends React.Component {
    constructor(){
        super();
        this.state = {
            comments:[]
        };
    }
    componentDidMount(){
        let Blog = LC.Object.extend('blogID'+this.props.blogID);
        let blog = new Blog();
        let queryStr = 'select *  from blogID' + this.props.blogID + ' where blogID = "' + this.props.blogID + '" order by time desc';
        LC.Query.doCloudQuery(queryStr).then(
            data=>{
                this.setState({comments: data.results});
            },
            e=>{
                console.log(e);
            }
        );
    }
    render(){
        return <div className="DisplayComments">
            {
                this.state.comments.map((comment, index) => {
                    return <Comment comment={comment.attributes} number={index+1} key={index}/>
                })
            }
        </div>
    }
}

export default DisplayComments;