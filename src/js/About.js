import React, { Component } from 'react'
import '../css/About.css'
import NavBar from './Nav.js'

import ReactGA from 'react-ga'
ReactGA.initialize('UA-114547651-1');
ReactGA.pageview(window.location.pathname + window.location.search);


class About extends Component{
    componentDidMount(){
        document.body.style.backgroundColor = "#643472"
    }
    
    render(){
        return(
            <div className="aboutContainer">
                <NavBar></NavBar>
                <h1>"What are they thinking" is an anti-encyclopedia for political perspectives of current events.</h1>
                <p>It's also Alex's <a href="http://medium.com/thesis-blog" target="blank">Master's Thesis</a></p>
                <p>Twitter: <a href="http://twitter.com/sonofdiesel" target="blank">@sonofdiesel</a></p>
            </div>
        )       
    }   
}

export default About;