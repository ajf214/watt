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
            errorText: "",
            examples: ["truck driver", "eagle scout", "pragmatist", "millennial", "asian-american", "idealist", "software engineer" , "farmer", "indian", "brexit voter", "catholic"],
            exampleNumber: 0
        }
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
      }

    componentDidMount(){

        //changes the 'perspective' placeholder to a random item in the array
        this.interval = setInterval(() => {

            const examplesSize = this.state.examples.length
            
            this.setState({
            //change the example text
                exampleNumber: this.getRandomInt(0, examplesSize)
            })  
        }, 1000)      
        
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
            /*
            let textAreaDefault = `Examples\n\n* `
            this.pageInput.value = textAreaDefault
            */
        }
    }

    compenentWillUnmount(){
        //clear interval
        clearInterval(this.interval)
    }

    savePage(){       
        if(this.state.action === "edit"){
            //update existing page          
            fire.database().ref('v2pages/' + this.state.pageId)
                .update({
                    perspective: this.perspectiveInput.value,
                    issue: this.issueInput.value,
                    text: this.pageInput.value,
                    cmvUrl: this.cmvInput.value,
                    view: this.viewTitleInput.value,
                    viewText: this.viewDetailsInput.value,
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
            if(this.perspectiveInput.value === "" || this.issueInput.value === "" || this.pageInput.value === "" || this.cmvInput.value === "" 
                || this.viewTitleInput.value === "" || this.viewDetailsInput.value === ""){
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
                    view: this.viewTitleInput.value,
                    viewText: this.viewDetailsInput.value,
                    author: this.state.user, //I should already have this
                    authorId: this.state.userId, //I won't need this anymore
                    cmvUrl: this.cmvInput.value //I will normally already have this
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
                        <h2 className="sectionLabel sectionLabelTitle">TITLE</h2>
                        
                        <span>How a</span>
                        <input type="text" placeholder={`perspective (ex: ${this.state.examples[this.state.exampleNumber]})`} ref={el => this.perspectiveInput=el}></input>
                        <span>sees</span>
                        <input type="text" placeholder="an issue" ref={el => this.issueInput=el}></input>

                        <span className="cmvLabel">CMV Post URL</span>
                        <input type="text" className="cmvInput" placeholder="http://reddit.com/r/changemyview/some-page" ref={el => this.cmvInput=el}></input>
                    
                        <a className="writingGuidelines" href="/writing-guidelines" target="_blank" rel="noopener noreferrer">How to convert a CMV post to a WATT article</a>
                    </div>            

                    <a href="https://ia.net/writer/support/general/markdown-guide/" target="blank" className="markdownLink">Markdown tips</a>
                    
                    <h3>Where you're coming from</h3>
                    <p>What is your background as it relates to this view?</p>
                    <textarea placeholder={`For example:\n\n - where you grew up\n - what world events you've witnessed\n - what generation you are a part of`}className="whereInput" ref={el => this.pageInput=el}></textarea>            

                    <h3 className="viewLabel">Your view</h3>
                    <p>Likely the same, or similar, to the title of your CMV post</p>
                    <input type="text" placeholder="Your view (in 100 characters)" className="view-title" ref={el => this.viewTitleInput=el}></input>
                    
                    <h3>Details about your view</h3>
                    <p>Explain your view. How has it evolved as a result of your CMV discussion?</p>
                    <textarea className="viewDetailsInput" placeholder="Did you award deltas? Make sure these details reflect those changes" ref={el => this.viewDetailsInput = el}></textarea>

                    <button className="savePage" onClick={this.savePage.bind(this)}>Save page</button>
                    <span className="errorText">{this.state.errorText}</span>
                </div>
            </div>
        )
    }

}

export default CreateOrEditPage;