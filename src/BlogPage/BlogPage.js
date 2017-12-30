import React from 'react';
import './BlogPage.css';
import Blogs from '../Blogs/Blogs';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import EntireBlog from '../EntireBlog/EntireBlog';
import Labels from '../Labels/Labels';
import ReactDOM from 'react-dom';

class Home extends React.Component {
    constructor({match}){
        super();
        this.processDisplay = this.processDisplay.bind(this);
        this.match = match;
    }
    componentDidMount(){
        // this.processDisplay(this.match);
    }
    componentWillReceiveProps({match}){
        this.processDisplay(match);
    }
    processDisplay(match){
        if(match.path !== '/Blog/:id'){
            window.location.reload();
            document.getElementsByClassName('Home-detail')[0].style.width = '29%';
        }
        else {
            document.getElementsByClassName('Home-detail')[0].style.width = '0';
        }
    }
    render(){
        return <div className="Home">
            <div className="Home-panel">
                <Switch>
                    <Route path="/Blog" exact component={Blogs}/>
                    <Route path="/Blog/:id" exact component={EntireBlog}/>
                </Switch>
                <div className="Home-detail">
                    <Route path="/Blog" exact component={Labels}/> 
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = null;

const mapDispatchToProps = null;

const HomeContainer = connect(mapStateToProps,mapDispatchToProps)(Home);

export default HomeContainer;