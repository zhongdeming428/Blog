import React from 'react';
import './Loading.css';

class Loading extends React.Component {
    render(){
        return <div className="Loading">
            <div className="Loading-text"></div>
            <div className="Loading-text"></div>
            <div className="Loading-text"></div>
            <div className="Loading-text"></div>
            <div className="Loading-text"></div>
        </div>
    }
}

export default Loading;