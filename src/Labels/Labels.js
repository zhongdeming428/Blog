import React from 'react';
import './Labels.css';
import { connect } from 'react-redux';
import { addShowBlogsAction, modifyCurrentLabelAction } from '../Actions';


class Labels extends React.Component {
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
        this.processLabels = this.processLabels.bind(this);
        this.state = {labels:[]};
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){
            this.processLabels();
            //在数据更新之后开始对数据进行处理，最后把数据归类，提交到state.showBlogs
        }
    }
    processLabels(){
        let blogs = this.props.blogs;
        let labels = [];
        labels.push("All");
        blogs.forEach(blog => {
            blog.labels.forEach(label => {
                if (labels.indexOf(label.name) < 0) {
                    labels.push(label.name);
                }
            });
        });
        this.setState({ labels });
    }
    handleClick(e){
        if(e.target.innerText === 'All'){
            let blogs = this.props.blogs;
            this.props.addShowBlogs(blogs);
            this.props.modifyCurrentLabel('All');
            return;
        } 
        let blogs = [];
        this.props.blogs.forEach(blog => {
            blog.labels.forEach(label => {
                if(label.name === e.target.innerText){
                    blogs.push(blog);
                }
            });
        });
        this.props.addShowBlogs(blogs);
        this.props.modifyCurrentLabel(e.target.innerText);
    }
    render(){
        return <div className="Labels">
            <div className="Blogs-label">综合</div>
            <div className="Labels-panel">
                <ul type="none">
                    {
                        this.state.labels.map(label => {
                            return <li key={label}>
                                <a href="javascript:void(0)" onClick={this.handleClick}>{label}</a>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        blogs:state.blogs
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addShowBlogs(blogs){
            dispatch(addShowBlogsAction(blogs));
        },
        modifyCurrentLabel(label){
            dispatch(modifyCurrentLabelAction(label));
        }
    };
};

const LabelsContainer = connect(mapStateToProps,mapDispatchToProps)(Labels);

export default LabelsContainer;