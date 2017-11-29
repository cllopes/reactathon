import React from 'react'

import './Header.css'

const Header = () => {
    return(
        <div className="header-container">
            <span className="home">Home</span>
            <span className="nav-items">About</span>
            <span className="nav-items">Sign In</span>
            <span className="nav-items">Create Account</span>
        </div>
    )
}

export default Header