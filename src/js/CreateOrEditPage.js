import React, { Component } from 'react'
import fire from './fire.js'
import NavBar from './Nav.js'
import '../css/CreateOrEditPage.css';


class CreateOrEditPage extends Component {

    constructor(props){
        super(props)
        
        this.state = {
            action: this.props.match.params.action,
            pageId: this.props.match.params.pageId,
            user: fire.auth().currentUser.displayName,
            userId: fire.auth().currentUser.uid
        }
    }

    componentDidMount(){
        if(this.state.action === "edit"){
            //call the db and get the current info
            fire.database().ref("v2pages/" + this.state.pageId)
                .once("value", snapshot => {
                    this.perspectiveInput.value = snapshot.val().perspective
                    this.issueInput.value = snapshot.val().issue
                    this.pageInput.value = snapshot.val().text
                })
                .catch(e => console.log(e))
        }

        var newThis = this;



        /*
            UNTESTED UNTESTED UNTESTED
        
        
        
        */
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
        if(this.state.action === "edit"){
            //update existing page            
            fire.database().ref('v2pages/' + this.state.pageId)
                .update({
                    perspective: this.perspectiveInput.value,
                    issue: this.issueInput.value,
                    text: this.pageInput.value
                })
                .then(() => {
                    //route to the newly saved page
                    this.props.history.push("/pagesv2/" + this.state.pageId);
                })
                .catch(e => console.log(e))
        }
        else{
            //assemble the page name
            let page = {
                perspective: this.perspectiveInput.value,
                issue: this.issueInput.value,
                text: this.pageInput.value,
                author: this.state.user,
                authorId: this.state.userId
            }

            //add page to db
            fire.database().ref('v2pages').push(page)
                .then((snapshot) => {
                    console.log("successfully posted page")
                    //route to the saved page
                    this.props.history.push("/pagesv2/" + snapshot.key);
                })
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

                    {/* there should be a preset value here */}
                    <textarea placeholder="Some thoughts..." ref={el => this.pageInput=el}></textarea>            
                    <button className="savePage" onClick={this.savePage.bind(this)}>Save page</button>
                </div>
            </div>
        )
    }

}

export default CreateOrEditPage;