import {Link} from 'react-router-dom'
import React , { Component } from 'react'
import fire from './fire.js'
import '../css/Nav.css'

const auth = fire.auth();
    
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
        fire.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
                console.log(firebaseUser);
                //update nav because user is logged in
                this.setState({
                    loggedIn: true,
                    username: firebaseUser.displayName
                })
            }
            else{
                //update nav because user has just logged out
                console.log('not logged in');
                this.setState({
                    loggedIn: false,
                    username: ""
                })
            }
        })
    }

    signOut(){
        const promise = auth.signOut();
        promise.catch(e => console.log(e.message));
    }
    
    render(){
        return(
            <div className="nav-container">
                <div className="buttons">
                    
                    <Link className="home" to="/"><span class="project">project</span>WATT</Link>

                    <div className="mainNav">   
                        <Link className="rules" to="/how-this-works">How this works</Link>
                        <Link className="about" to="/about">About</Link>
                        <Link className={this.state.loggedIn ? "addPage mobile-hide" : "hidden"} to="/post/new">New post</Link>
                    </div>

                    <div className="authContainer">
                        <Link className={this.state.loggedIn ? "signUp hidden" : "signUp"} to="/invite">Sign up</Link>
                        <Link className={this.state.loggedIn ? "loginLink hidden" : "loginLink"} to="/login/signin">Log in</Link>

                        <Link className={this.state.loggedIn ? "profile" : "profile hidden"} to="/users/<placeholderForUsernameOrID?">{`@${this.state.username}`}</Link>
                        <button className={this.state.loggedIn ? "signOut" : "hidden"} onClick={this.signOut.bind(this)}>Sign out</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default NavBar;