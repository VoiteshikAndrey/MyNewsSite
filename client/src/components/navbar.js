import React, {useContext} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import '../public/css/header-style.css';


export const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = event => {
        auth.logout()
        history.push('/auth')
    }

    let links;

    if(auth.role == "admin") {
        links = <>
            <NavLink className="nav-link"  activeClassName="active-nav-link" to="/admin">ADMIN</NavLink>
            <NavLink className="nav-link" exact activeClassName="active-nav-link" to="/">NEWS</NavLink>
            <NavLink className="nav-link" activeClassName="active-nav-link" to="/profile">PROFILE</NavLink>
            <button className="nav-button" onClick={logoutHandler}>LOGOUT</button>
        </>
    }
    else if(auth.role == "user") {
        links = <>
            <NavLink className="nav-link" exact activeClassName="active-nav-link" to="/">NEWS</NavLink>
            <NavLink className="nav-link" activeClassName="active-nav-link" to="/profile">PROFILE</NavLink>
            <button className="nav-button" onClick={logoutHandler}>LOGOUT</button>
        </>
    }
    else{
        links = <>
            <NavLink className="nav-link" exact activeClassName="active-nav-link" to="/">NEWS</NavLink>
            <NavLink className="nav-link" exact activeClassName="active-nav-link" to={{
    pathname: '/auth',
    state: {isLoginForm: true},
  }}>LOGIN</NavLink>
            <NavLink className="nav-link" exact activeClassName="active-nav-link" to={{
    pathname: '/auth',
    state: {isLoginForm: false},
  }}>REGISTER</NavLink>
        </>
    }
    
    


    return (
        <header id="header">
            <div className="container">
                <div className="header-inner">
                    <div className="header-logo">
                        <img src="http://localhost:3000/images/logo.png" alt="logo"></img>
                    </div>
                    <nav className="header-nav">
                        <ul>
                            {links}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};
