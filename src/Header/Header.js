import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
    render(){
        return <div className="Header">
            <h1 className="Header-title"><a href="/">ZHONGDM</a></h1>
            <div className="Header-links">
                <NavLink to="/Home" activeClassName="active-Link">首页</NavLink>
                <NavLink to="/Blog" activeClassName="active-Link">博客</NavLink>
            </div>
        </div>
    }
}

export default Header;