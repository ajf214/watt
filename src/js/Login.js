//should come here for both login and sign up
import React , { Component } from 'react'
import fire from './fire.js'
import NavBar from './Nav.js'
import '../css/login.css'

const auth = fire.auth();

class Login extends Component{
    
    
    constructor(props){
        super(props)
        this.state = {
            errorText: ""
        }
    }
    

    componentDidMount(){
        document.body.style.backgroundColor = "#643472"
    }

    logInOrSignUp(e){
        e.preventDefault()

        //decide if you are logging in or signing up
        let email = this.emailInput.value;
        let pass = this.passwordInput.value;
        let passwordConfirm = this.confirmPasswordInput.value;
        let username = this.usernameInput.value;

        const params = this.props.match.params;

        if(params.action === "signup"){
            //make sure email is good
            let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

            //make sure passwords are match and are good
            if(email.match(emailRegex) && pass === passwordConfirm){
                this.signUp(email, pass, username)  
            }
            else{
                console.log("error with input")

                if(!email.match(emailRegex)){
                    console.log("issue with email")
                    this.setState({
                        errorText: "Invalid email address"
                    })
                }
                if(pass !== passwordConfirm){
                    console.log("passwords don't match")
                    this.setState({
                        errorText: "Passwords don't match"
                    })
                }
            }
        }

        if(params.action === "signin"){
            this.login(email, pass)
        }
        
    }

    login(email, pass){
        const promise = auth.signInWithEmailAndPassword(email,pass);
        var newThis = this;

        promise
            .then(function(user){
                console.log(user)
                newThis.props.history.push("/")
            })
            .catch(e => {
                console.log(e.message)
                this.setState({
                    errorText: e.message
                })
            });
    }

    signUp(email, pass, username){
        //how do I create a specific username?

        const promise = auth.createUserWithEmailAndPassword(email,pass);
        var newThis = this;
        
        
        promise
            //make sure I've succesfully created a new user
            .then(function(user){
                console.log(user)

                //save the username of the auth'd user in their Profile
                user.updateProfile({
                    displayName: username
                }).then(function(){
                    //if Profile was successfully updated, go back to home screen
                    newThis.props.history.push("/")
                }).catch(function(e){
                    console.log(e)
                })
            })
            .catch(e => console.log(e.message));

        
    }

   
    render(){
        //let labelClass = "loginLabel"

        let action = this.props.match.params.action
        
        return(
            <div className="loginContainer">
                <NavBar></NavBar>
                <form className="login" onSubmit={this.logInOrSignUp.bind(this)}>
                    <h3>{action==="signin" ? "Log in to WATT" : "Sign up for WATT"}</h3>
                    <label>Email</label>
                    <input id="email" type="text" placeholder="name@domain.com" ref={el => this.emailInput=el}/>
                    
                    <label className={action==="signin" ? "hide" : ""}>Username</label>
                    <input id="username" className={action==="signin" ? "hide" : ""} type="text" placeholder="username" ref={el => this.usernameInput=el}/>

                    <label>Password</label>
                    <input id="password" type="password" placeholder="password" ref={el => this.passwordInput=el}/>
                    
                    <label className={action==="signin" ? "hide" : ""}>Confirm Password</label>
                    <input className={action==="signin" ? "hide" : ""} id="confirmPassword" type="password" placeholder="confirm password" ref={el => this.confirmPasswordInput=el}/>

                    <input type="submit" className="submit" value={action==="signin" ? "Log in" : "Sign up"}/>
                    <label className="errorText">{this.state.errorText}</label>
                </form>
            </div>
        )
    }

}

export default Login