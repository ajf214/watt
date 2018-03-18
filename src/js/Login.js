//should come here for both login and sign up
import React , { Component } from 'react'
import fire from './fire.js'
import '../css/login.css'

const auth = fire.auth();

class Login extends Component{


    logInOrSignUp(e){
        e.preventDefault()

        //decide if you are logging in or signing up
        let email = this.emailInput.value;
        let pass = this.passwordInput.value;
        //let passwordConfirm = this.confirmPasswordInput.value;
        let username = this.usernameInput.value;

        //make sure email is good

        //make sure passwords are match and are good
        
        this.signUp(email, pass, username)

        //route them somewhere, preferably where I just came from, but now logged in!
        
    }

    login(email, pass){
        const promise = auth.signInWithEmailAndPassword(email,pass);
        promise.catch(e => console.log(e.message));
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
        
        return(
            <div className="loginContainer">
                <form className="login" onSubmit={this.logInOrSignUp.bind(this)}>
                    <h3>Sign up for WATT</h3>
                    <label>Email</label>
                    <input id="email" type="text" placeholder="hello@watt.com" ref={el => this.emailInput=el}/>
                    
                    <label>Username</label>
                    <input id="username" type="text" placeholder="username" ref={el => this.usernameInput=el}/>

                    <label>Password</label>
                    <input id="password" type="password" placeholder="password" ref={el => this.passwordInput=el}/>
                    
                    <label>Confirm Password</label>
                    <input id="confirmPassword" type="password" placeholder="confirm password" ref={el => this.confirmPasswordInput=el}/>

                    <input type="submit" className="submit" value="Sign Up"/>
                </form>
            </div>
        )
    }

}

export default Login