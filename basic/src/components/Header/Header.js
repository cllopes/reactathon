import React from 'react'

import { Link } from 'react-router-dom'

import './Header.css'

const Header = () => {
    return(
        <div className="header-container">
            <Link to="/" className="home">Home</Link>
            <Link to="/about" className="nav-items">About</Link>
            <span className="nav-items">Sign In</span>
            <span className="nav-items">Create Account</span>
        </div>
    )
}

export default Header