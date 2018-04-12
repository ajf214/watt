import React, { Component } from 'react'
import './Explore.css'
import NavBar from '../js/Nav.js'

class Explore extends Component{

    render(){
        return(
            <div className="exploreContainer">
                <NavBar></NavBar>
                <div className="underConstructionContainer">
                    <h2>Coming soon</h2>
                    <p>The explore feature is not quite ready yet, but I promise it's going to be really cool.</p>
                </div>
            </div>
        )
    }
}

export default Explore;