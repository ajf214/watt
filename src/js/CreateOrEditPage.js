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
            userId: "",
            errorText: ""
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
                    this.cmvInput.value = (snapshot.val().cmvUrl != null ? snapshot.val().cmvUrl : "")
                })
                .catch(e => console.log(e))
        }

        if(this.state.action === "new"){
            let textAreaDefault = `## Where I'm coming from\n\nSome thoughts...\n\n## [YOUR VIEW GOES HERE — ex: Pen is better than pencil]\n\nExplain your view — including the result of any deltas or other discussion...\n\n## What I got from the CMV Discussion\n\nSome thoughts...`
            this.pageInput.value = textAreaDefault
        }
    }

    savePage(){       
        if(this.state.action === "edit"){
            //update existing page          
            fire.database().ref('v2pages/' + this.state.pageId)
                .update({
                    perspective: this.perspectiveInput.value,
                    issue: this.issueInput.value,
                    text: this.pageInput.value,
                    cmvUrl: this.cmvInput.value
                })
                .then(() => {
                    //route to the newly saved page
                    this.props.history.push("/pagesv2/" + this.state.pageId);
                })
                .catch(e => {
                    console.log(e)
                    this.setState({
                        errorText: e
                    })
                })
        }
        else{
            //check that the fields are valid
            if(this.perspectiveInput.value === "" || this.issueInput.value === "" || this.pageInput.value === "" || this.cmvInput.value === ""){
                console.log("one of the fields was not filled out")
                this.setState({
                    errorText: "One of the fields is empty"
                })
            }

            //page text has been validated
            else{
                let page = {
                    perspective: this.perspectiveInput.value,
                    issue: this.issueInput.value,
                    text: this.pageInput.value,
                    author: this.state.user,
                    authorId: this.state.userId,
                    cmvUrl: this.cmvInput.value
                }
    
                //add page to db
                fire.database().ref('v2pages').push(page)
                    .then((snapshot) => {
                        console.log("successfully posted page")
                        //route to the saved page
                        this.props.history.push("/pagesv2/" + snapshot.key);
                    })
                    .catch(e => {
                        console.log(e)
                        this.setState({
                            errorText: e
                        })
                    })
            }
        }
    }

    render(){
        
        return(
            <div className="addOrEditPageContainer">
                <NavBar></NavBar>
                <div className="contentContainer">
                    <div className="addTitle">
                        <h2 className="sectionLabel">TITLE</h2>
                        
                        <span>How a</span>
                        <input type="text" placeholder="perspective" ref={el => this.perspectiveInput=el}></input>
                        <span>sees</span>
                        <input type="text" placeholder="an issue" ref={el => this.issueInput=el}></input>

                        <span className="cmvLabel">CMV Post URL</span>
                        <input type="text" className="cmvInput" placeholder="http://reddit.com/r/changemyview/some-page" ref={el => this.cmvInput=el}></input>
                    
                        <a className="writingGuidelines" href="/writing-guidelines" target="_blank" rel="noopener noreferrer">How to convert a CMV post to a WATT article</a>
                    </div>            

                    
                    <h2 className="sectionLabel">BODY</h2>
                    <a href="https://ia.net/writer/support/general/markdown-guide/" target="blank" className="markdownLink">Markdown tips</a>
                    <textarea ref={el => this.pageInput=el}></textarea>            
                    <button className="savePage" onClick={this.savePage.bind(this)}>Save page</button>
                    <span className="errorText">{this.state.errorText}</span>
                </div>
            </div>
        )
    }

}

export default CreateOrEditPage;