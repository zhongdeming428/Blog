import React from 'react';
import './Home.css';
import Ajax from '@fdaciuk/ajax';
import Blogs from '../Blogs/Blogs';
import { addBlogsAction } from '../Actions';
import { connect } from 'react-redux';

class Home extends React.Component {
    constructor(){
        super();
    }
    componentDidMount(){
        // let res = Ajax({
        //     method:'get',
        //     url:'https://api.github.com/repos/zhongdeming428/Blog/issues'
        // });
        // res.then(response => {
        //     console.log(JSON.stringify(response));
        // });
        const { addBlogs } = this.props;
        //伪造请求
        let res = Ajax({
            method:'get',
            url:'../json.js',
            headers:{
                'content-type':'application/json'
            }
        }); 
        res.then(response => {
            addBlogs(response);
        });
    }
    render(){
        return <div className="Home">
            <div className="Home-panel">
                <Blogs/>
            </div>
        </div>
    }
}

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => {
    return {
        addBlogs(blogs){
            dispatch(addBlogsAction(blogs));;
        }
    };
};

const HomeContainer = connect(mapStateToProps,mapDispatchToProps)(Home);

export default HomeContainer;