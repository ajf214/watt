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
                <div className="aboutContent">
                    <h1>Project WATT is an experimental publication that challenges the current state of online discourse with real, user-generated perspectives on important issues.</h1>
                    <p>It's also Alex's <a href="http://medium.com/thesis-blog" target="blank">Master's Thesis</a></p>
                    <p>Twitter: <a href="http://twitter.com/sonofdiesel" target="blank">@sonofdiesel</a></p>
                </div>
            </div>
        )       
    }   
}

export default About;