import {Link} from 'react-router-dom'
import React from 'react'
import '../css/About.css'
import NavBar from './Nav.js'


const About = (props) => {
    return(
        <div className="container">
            <NavBar></NavBar>
            <h1>"What are they thinking" is an encyclopedia for political perspectives.</h1>
            <p>It's also Alex's <a href="http://medium.com/thesis-blog" target="blank">Master's Thesis</a></p>
        </div>
    )
}

export default About;