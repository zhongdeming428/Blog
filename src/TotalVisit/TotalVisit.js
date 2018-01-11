import React from 'react';
import './TotalVisit.css';
import LC from 'leancloud-storage';

class TotalVisit extends React.Component {
    constructor(){
        super();
        this.state = {
            visitCount:0
        };
    }
    componentDidMount(){
        //leancloud initialization has been moved to App.js
        // let appId = 'gFbGUb4swYk9TigfK0RvND8u-gzGzoHsz';
        // let appKey = 'GpeKbkVMMK5lJAPpWnTJlODu';
        // LC.init({appId, appKey});
        let query = new LC.Query('BlogInfo');
        query.select('visited');
        let sum = 0;
        query.find().then((data) => {
            data.forEach(r => {
                sum += r.attributes.visited
            });
            this.setState({visitCount: sum});
        }, function (error) {
        });
    }
    render(){
        return <div className="TotalVisit">
            <div className="Blogs-label">总访问量</div>
            <div className="Visit-Count">
                <strong>{this.state.visitCount}</strong>
            </div>
        </div>
    }
}

export default TotalVisit;