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
            user: "",
            userId: ""
        }
    }

    componentDidMount(){

        fire.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
                console.log(firebaseUser);
                //update nav because user is logged in
                this.setState({
                    user: firebaseUser.displayName,
                    userId: firebaseUser.uid
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

        document.body.style.backgroundColor = "#643472"

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
        let textAreaDefault = `## Where I'm coming from\n\nSome thoughts...\n\n## My perspective on this issue\n\nSome thoughts...`

        return(
            <div className="addOrEditPageContainer">
                <NavBar></NavBar>
                <div className="contentContainer">
                    <div className="addTitle">
                        <span>How a</span>
                        <input type="text" placeholder="perspective" ref={el => this.perspectiveInput=el}></input>
                        <span>sees</span>
                        <input type="text" placeholder="an issue" ref={el => this.issueInput=el}></input>
                    </div>

                    <a href="https://help.github.com/articles/basic-writing-and-formatting-syntax/" target="blank" className="markdownLink">Markdown tips</a>

                    {/* there should be a preset value here */}
                    <textarea value={textAreaDefault} ref={el => this.pageInput=el}></textarea>            
                    <button className="savePage" onClick={this.savePage.bind(this)}>Save page</button>
                </div>
            </div>
        )
    }

}

export default CreateOrEditPage;