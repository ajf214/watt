import React, { Component } from 'react'
import NavBar from './Nav.js'
import CreateOrEditPage from './CreateOrEditPage'

import '../css/Invite.css'

class Invite extends Component{

    
    constructor(props){
        super(props)
        this.state = {
            inviteCode: "projectwattpilot",
            errorText: ""
        }
    }

    componentDidMount(){
        document.body.style.backgroundColor = "#643472"
    
        //on key down function, so that when I press enter it submits
    }

    checkInvite(){
        if(this.state.inviteCode === this.inviteInput.value){
            this.props.history.push("/login/signup");
        }

        else{
            this.setState({
                errorText: "code's not right."
            })
        }
    }


    render(){
        return(
            <div className="inviteContainer">
                <NavBar></NavBar>
                
                <div className="inviteBox">
                    <h1>We'll need your invite code</h1>
                    <p>In order to get a code, you need a <a target="_blank" rel="noopener noreferrer" href="http://reddit.com/r/changemyview">Change My View</a> post with at least 20 comments.</p>
                    <a className="howThisWorks" href="/how-this-works">Tell me more</a>

                    <input type="text" placeholder="Invite code" className="inviteCode" ref={el => this.inviteInput=el}></input>
                    <button onClick={this.checkInvite.bind(this)}>Sign up</button>
                    <p className="errorText">{this.state.errorText}</p>
                </div>
            </div>
        )
    }

}

export default Invite;