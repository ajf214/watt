import {Link} from 'react-router-dom'
import React from 'react'
import '../css/Nav.css'

const NavBar = (props) => {
    return(
        <div className="nav-container">
            <div className="buttons">
                <Link className="home" to="/">WATT</Link>
                <Link className="rules" to="/rules">The Rules</Link>
                <Link className="about" to="/about">About</Link>
            </div>
        </div>
    )
}

export default NavBar;