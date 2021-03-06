import {Link} from 'react-router-dom'
import React , { Component } from 'react'
import '../css/Nav.css'
    
class NavBar extends Component{    
    constructor(props){
        super(props);
        this.state = {
            loggedIn: false,
            username: ""
        }
    }
    
    componentDidMount(){
        //add a realtime auth listener
        //nav essentially manages the status of a logged in user??
    }
    
    render(){
        return(
            <div className="nav-container">
                <div className="buttons">
                    
                    <Link className="home" to="/"><span className="project">project</span>WATT<span className="beta">BETA</span></Link>

                    <div className="mainNav">   
                        <Link className="rules" to="/how-this-works">HOW THIS WORKS</Link>
                        <Link className="rules" to="/explore">EXPLORE</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default NavBar;