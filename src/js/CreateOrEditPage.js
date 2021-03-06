import React, { Component } from 'react'
import fire from './fire.js'
import NavBar from './Nav.js'
import '../css/CreateOrEditPage.css';


class CreateOrEditPage extends Component {

    constructor(props){
        super(props)
        
        this.state = {
            password: this.props.match.params.password,
            user: "",
            pageTitle: "",
            errorText: "",
            examples: ["musician", "truck driver", "eagle scout", "pragmatist", "millennial", "asian-american", "idealist", "software engineer" , "farmer", "indian", "brexit voter", "catholic"],
            exampleNumber: 0,
            goodInvite: false,
            pageKey: "invalid-code",
            pageUrl: "",
            cmvPostId: "",
            inviteDbLocation: "no-match"
        }
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
      }

    async componentDidMount(){

        //changes the 'perspective' placeholder to a random item in the array
        this.interval = setInterval(() => {
            const examplesSize = this.state.examples.length
            this.setState({
            //change the example text
                exampleNumber: this.getRandomInt(0, examplesSize)
            })  
        }, 1000)      

        document.body.style.backgroundColor = "#643472"
  
        try{
            //check that the password is legit
            const inviteResult = await fire.database().ref("invites").orderByChild("wattPostUid").equalTo(this.state.password).once("value")
            
            //need to manually look through results because data model is fucked
            if(inviteResult.val() == null){
                console.log("Bad invite code")
            }

            inviteResult.forEach(i => {
                let tempUrl = "no-match"
                
                //will only enter if there is at least 1 result (there should only be 1)
                console.log("Invite code matched")

                //if the invite matches, see if there is an existing watt page
                if(i.val().wattPageUrl){
                    //this page already exists so do some stuff
                    tempUrl = i.val().wattPageUrl
                }

                this.setState({
                    user: i.val().author,
                    pageTitle: i.val().cmvTitle,
                    goodInvite: true,
                    pageUrl: tempUrl,
                    inviteDbLocation: i.key,
                    cmvPostId: i.val().postId
                })
            })

            //if the invite is valid
            if(this.state.goodInvite){
                //get the pageId only if the invite is valid

                //check if there is any page data
                //ISSUE - this returns ALL pages if pageKey is empty
                const pageResult = await fire.database().ref("v2pages/" + this.state.pageUrl).once("value")

                //fill page data if there is any
                if(pageResult.val()){
                    this.perspectiveInput.value = pageResult.val().perspective
                    this.issueInput.value = pageResult.val().issue
                    this.pageInput.value = pageResult.val().text
                    this.viewTitleInput.value = pageResult.val().view
                    this.viewDetailsInput.value = pageResult.val().viewText
                }
            }
        }catch(e){console.log(e)}
    }

    compenentWillUnmount(){
        //clear interval
        clearInterval(this.interval)
    }

    async savePage(){
        //for v3 of the page
        //eventually should not need this if this code works as expected
            //check if key exists
        if(this.state.pageUrl==="no-match"){
            //key doesn't exist
            const newPageUrl = await fire.database().ref().child('v2pages').push().key;    
            this.setState({
                pageUrl: newPageUrl
            })
        }

        const pageUpdate = {
            perspective: this.perspectiveInput.value,
            issue: this.issueInput.value,
            text: this.pageInput.value, //this is now 'Where I'm coming from'
            view: this.viewTitleInput.value, //new field
            viewText: this.viewDetailsInput.value, //new field
            author: this.state.user, //I should already have this
            cmvUrl: `http://reddit.com/${this.state.cmvPostId}`, //postId for CMV url
            lastUpdatedInUtc: Date.now()
        }
        
        //this should work for new or edit
        await fire.database().ref('v2pages/' + this.state.pageUrl).update(pageUpdate) 
        //update the invite with the just created page url
        await fire.database().ref('invites/' + this.state.inviteDbLocation).update({wattPageUrl: this.state.pageUrl})      
        
        this.props.history.push("/pagesv2/" + this.state.pageUrl)
    }

    render(){
        if(!this.state.goodInvite){
            return(
                <div className="badInviteContainer">
                    <p>Bad URL</p>
                </div>
            )
        }
        
        else{
            return(
                <div className="addOrEditPageContainer">
                    <NavBar></NavBar>
                    <div className="leftInfoBox">
                        <div className="inviteDetails">
                            <h3 className="leftInfoLabel">INVITE</h3>
                            <span className="titleLabel">CMV Post:</span>
                            <p className="titleValue">{this.state.pageTitle}</p>
                            <span className="titleLabel">Reddit username:</span>
                            <p className="titleValue">{this.state.user}</p> 
                        </div>

                        <div className="helpfulLinks">    
                            <h3 className="leftInfoLabel">HELPFUL LINKS</h3>
                            <a className="markdownLink" href="/writing-guidelines" target="_blank" rel="noopener noreferrer">How to convert a CMV post to a WATT article</a>
                            <a href="https://ia.net/writer/support/general/markdown-guide/" target="blank" className="markdownLink">Markdown tips</a>    
                        </div>       
                    </div>

                    <div className="contentContainer">
                        <div className="addTitle">
                            <h2 className="sectionLabel sectionLabelTitle">{this.state.pageUrl==="no-match" ? "NEW PAGE" : "EDIT PAGE"}</h2>
                            
                            <span>How a</span>
                            <input type="text" placeholder={`perspective (ex: ${this.state.examples[this.state.exampleNumber]})`} ref={el => this.perspectiveInput=el}></input>
                            <span>sees</span>
                            <input type="text" placeholder="an issue" ref={el => this.issueInput=el}></input>
    

                            {/*<input type="text" className="cmvInput" placeholder="http://reddit.com/r/changemyview/some-page" ref={el => this.cmvInput=el}></input>*/}
                        </div>            
    
                        

                        <h3 className="whereLabel bodySectionTitle">Where you're coming from</h3>
                        <p>Your background. What gives you a unique perspective on this issue?</p>
                        <textarea placeholder={`where you grew up, what world events you've witnessed, what generation you are a part of, etc.`}className="whereInput" ref={el => this.pageInput=el}></textarea>            
    
                        <h3 className="viewLabel bodySectionTitle">Your view</h3>
                        <p>Summarize your latest view. Could be the same as your CMV post, but modify if you awarded deltas</p>
                        <input type="text" placeholder="Your view (in 100 characters)" className="view-title" ref={el => this.viewTitleInput=el}></input>
                        
                        <h3 className="bodySectionTitle">Details about your view</h3>
                        <p>Explain your view. How has it evolved as a result of your CMV discussion?</p>
                        <textarea className="viewDetailsInput" placeholder="Start with you original CMV post, but update it according to any deltas awarded or important points that were made during the discussion." ref={el => this.viewDetailsInput = el}></textarea>
    
                        <button className="savePage" onClick={this.savePage.bind(this)}>SAVE PAGE</button>
                        <span className="errorText">{this.state.errorText}</span>
                    </div>
                </div>
            )
        }
    }

}

export default CreateOrEditPage;