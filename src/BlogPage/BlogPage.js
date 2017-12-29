import React from 'react';
import './BlogPage.css';
import Blogs from '../Blogs/Blogs';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import EntireBlog from '../EntireBlog/EntireBlog';

class Home extends React.Component {
    constructor(){
        super();
    }
    render(){
        return <div className="Home">
            <div className="Home-panel">
                <Switch>
                    <Route path="/Blog" exact component={Blogs}/>
                    <Route path="/Blog/:id" exact component={EntireBlog}/>
                </Switch>
                <div className="Home-detail">
                    
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = null;

const mapDispatchToProps = null;

const HomeContainer = connect(mapStateToProps,mapDispatchToProps)(Home);

export default HomeContainer;