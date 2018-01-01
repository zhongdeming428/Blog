import React from 'react';
import './Home.css';
import { connect } from 'react-redux';
import Loading from '../Loading/Loading';

class Home extends React.Component {
    constructor(){
        super();
        this.state = {tmp:<Loading/>};
        this.processData = this.processData.bind(this);
    }
    componentDidMount(){
        this.processData();
    }
    componentDidUpdate(prevProps){
        if(this.props !== prevProps){
            this.processData();
        }
    }
    processData(){
        let tmp = <Loading/>;
        if(this.props.showBlogs.length > 0){
            tmp = <div className="HomePage">
                <div className="HomePage-header">
                    <div className="AvatarContainer">
                        <img className="HomePage-avatar" src="/avatar.png" alt="avatar"/>
                    </div>
                    <div className="Contact-board">
                        <a href="https://github.com/zhongdeming428" target="blank"><i className="fab fa-github"></i></a>
                        <a href="mailto:zhongdeming428@gmail.com"><i className="fab fa-google"></i></a>
                        <a href="https://twitter.com/zhongdeming428" target="blank"><i className="fab fa-twitter"></i></a>
                        <a href="https://weibo.com/5198069647/profile?rightmod=1&wvr=6&mod=personinfo" target="blank"><i className="fab fa-weibo"></i></a>
                        <a href="https://www.facebook.com/profile.php?id=100015155345813" target="blank"><i className="fab fa-facebook-f"></i></a>
                    </div>
                </div>
                <div className="HomePage-body">
                    <h1>Welcome!</h1>
                    <h1 id="HomePage-body-text-2">这里是钟德鸣的博客，</h1>
                    <h1 id="HomePage-body-text-3">感谢您的到来。</h1>
                    <h1 id="HomePage-body-text-4">在这里，</h1>
                    <h1 id="HomePage-body-text-5">您可以看到我的最新动态；</h1>
                    <h1 id="HomePage-body-text-6">可能会是一些新的学习笔记，</h1>
                    <h1 id="HomePage-body-text-7">也可能会是一些新的生活感悟，</h1>
                    <h1 id="HomePage-body-text-8">还有可能会是一些小牢骚。</h1>
                    <h1 id="HomePage-body-text-9">总之，</h1>
                    <h1 id="HomePage-body-text-10">这个博客会经常更新；</h1>
                    <h1 id="HomePage-body-text-11">不管是博客内容的更新，</h1>
                    <h1 id="HomePage-body-text-12">还是网站外观、结构、功能上的更新，</h1>
                    <h1 id="HomePage-body-text-13">希望您可以多多关注，常来浏览。</h1>
                    <h1 id="HomePage-body-text-14">感谢！</h1>
                </div>
                <div className="HomePage-footer">
                    <img id="QRCode" src="/WechatQRCode.png" alt="WechatQRCode"/>
                    <p>
                        扫码添加作者微信
                    </p>
                    <p>
                        作者原博客：<a href="http://www.cnblogs.com/DM428/" target="blank">点击跳转</a>
                    </p>
                    <p>
                        博客源码地址：<a href="https://github.com/zhongdeming428/Blog" target="blank">点击跳转</a>
                    </p>
                </div>
            </div>;
        }
        this.setState({tmp});
    }
    render(){
        return this.state.tmp;
    }
}

const mapStateToProps = (state) => {
    return {
        showBlogs: state.showBlogs
    };
};

const HomeContainer = connect(mapStateToProps, null)(Home);

export default HomeContainer;