import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
    render(){
        return <div className="Header">
            <h1 className="Header-title">ZHONGMD</h1>
            <div className="Header-links">
                <NavLink to="/" exact activeClassName="active-Link">首页</NavLink>
                <NavLink to="/introduction" activeClassName="active-Link">关于</NavLink>
            </div>
        </div>
    }
}

export default Header;