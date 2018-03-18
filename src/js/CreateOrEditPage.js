import React, { Component } from 'react'
import fire from './fire.js'
import NavBar from './Nav.js'
import '../css/CreateOrEditPage.css';


class CreateOrEditPage extends Component {

    constructor(props){
        super(props)
        this.state = {
            isEdit: false,
            user: fire.auth().currentUser.displayName
        }
    }

    componentDidMount(){
        if(this.state.isEdit){
            //call the db and get the current info
        }

        var newThis = this;

        //UNTESTED
        fire.auth().onAuthStateChanged(function(firebaseUser){
            if(firebaseUser){
                newThis.setState({
                    user: firebaseUser.displayName
                })
            }
            else{
                newThis.setState({
                    user: null
                })
            }
        })
    }

    savePage(){       
        if(this.state.isEdit){
            //update existing page
        }else{
            //assemble the page name
            let page = {
                perspective: this.perspectiveInput.value,
                issue: this.issueInput.value,
                text: this.pageInput.value,
                author: this.state.user
            }

            //add page to db
            fire.database().ref('v2pages').push(page)
                .then(() => console.log("successfully posted page"))
                .catch(e => console.log(e))
        
        }
    }

    render(){
        return(
            <div className="addOrEditPageContainer">
                <NavBar></NavBar>
                <div className="contentContainer">
                    <div className="addTitle">
                        <label>How a</label>
                        <input type="text" placeholder="perspective" ref={el => this.perspectiveInput=el}></input>
                        <label>sees</label>
                        <input type="text" placeholder="an issue" ref={el => this.issueInput=el}></input>
                    </div>
                    <textarea placeholder="Some thoughts..." ref={el => this.pageInput=el}></textarea>            
                    <button className="savePage" onClick={this.savePage.bind(this)}>Save page</button>
                </div>
            </div>
        )
    }

}

export default CreateOrEditPage;