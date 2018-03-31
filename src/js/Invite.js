import React, { Component } from 'react'
import NavBar from './Nav.js'

import '../css/Invite.css'

class Invite extends Component{

    
    constructor(props){
        super(props)
        this.state = {
            inviteCode: "12345",
            errorText: ""
        }
    }

    componentDidMount(){
        document.body.style.backgroundColor = "#643472"
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
                    <p>In order to get a code, you need a <a target="_blank" href="http://reddit.com/r/changemyview">Change My View</a> post with at least 20 comments.<a className="howThisWorks" href="http://google.com">tell me more</a></p>

                    <input type="text" placeholder="Invite code" className="inviteCode" ref={el => this.inviteInput=el}></input>
                    <button onClick={this.checkInvite.bind(this)}>Sign up</button>
                    <p className="errorText">{this.state.errorText}</p>
                </div>
            </div>
        )
    }

}

export default Invite;