import React, { Component } from 'react';
import './App.css';
import Header from './Header/Header';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Blog from './BlogPage/BlogPage';
import { addBlogsAction, addShowBlogsAction } from './Actions';
import Ajax from '@fdaciuk/ajax';
import { connect } from 'react-redux';
import Home from './Home/Home';
import LC from 'leancloud-storage';

class App extends Component {
  componentWillMount() {
    const { addBlogs, addShowBlogs } = this.props;
    let appId = 'gFbGUb4swYk9TigfK0RvND8u-gzGzoHsz';
    let appKey = 'GpeKbkVMMK5lJAPpWnTJlODu';
    LC.init({ appId, appKey });
    let res = Ajax({
        method:'get',
        url:'https://api.github.com/repos/zhongdeming428/Blog/issues'
    });
    res.then(response => {
        addBlogs(response);
        addShowBlogs(response.slice(0,10));
    });
    // 伪造请求
    // let res = Ajax({
    //   method: 'get',
    //   url: '/json.js',
    //   headers: {
    //     'content-type': 'application/json'
    //   }
    // }); 
    // res.then(response => {
    //   addBlogs(response);
    //   if(response.length > 10){ 
    //     addShowBlogs(response.slice(0,10));
    //   }
    //   else {
    //     addShowBlogs(response);
    //   }
    // });
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter basename="/Blog">
          <div>
            <Header />
            <Switch>
              <Route path="/Home" exact component={Home}/>
              <Route path="/Blog" exact component={Blog} />
              <Route path="/Blog/:id" exact component={Blog} />
              <Route render={() => (<Redirect to="/Home" />)} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}


const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => {
  return {
    addBlogs(blogs) {
      dispatch(addBlogsAction(blogs));;
    },
    addShowBlogs(blogs){
      dispatch(addShowBlogsAction(blogs));
    }
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
