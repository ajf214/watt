import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import fire from './fire'
import NavBar from './Nav.js'
import '../css/PageV2.css'

import ReactGA from 'react-ga'
ReactGA.initialize('UA-114547651-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const ReactMarkdown = require('react-markdown')

class PageV2 extends Component{

    constructor(props){
        super(props);
        this.state = {
            pageId: this.props.match.params.pageId,
            pageTitle: "",
            pageText: "",
            author: "",
            authorId: "",
            userId: "",
            cmvUrl: "",
            view: "",
            viewText: "",
            loading: true
        }
    }

    componentDidMount(){
        document.body.style.backgroundColor = "#FFF"

        fire.database().ref("v2pages/" + this.state.pageId)
            .once("value", snapshot => {
                //set state with this info
                this.setState({
                    pageTitle: (this.isVowel(snapshot.val().perspective.charAt(0)) ? `How an ${snapshot.val().perspective} sees ${snapshot.val().issue}` : `How a ${snapshot.val().perspective} sees ${snapshot.val().issue}`),
                    author: snapshot.val().author,
                    authorId: snapshot.val().authorId,
                    pageText: snapshot.val().text,
                    view: (snapshot.val().view ? snapshot.val().view : ""),
                    viewText: (snapshot.val().viewText ? snapshot.val().viewText : ""),
                    userId: fire.auth().currentUser ? fire.auth().currentUser.uid : null,
                    loading: false,
                    cmvUrl: snapshot.val().cmvUrl
                })
            })
            .catch(e => console.log(e))
    }

    isVowel(c){
        switch(c){
            case 'a':
            case 'e':              
            case 'i':
            case 'o':
            case 'u':
            case 'A':
            case 'E':
            case 'I': 
            case 'O':
            case 'U':
                return true;
            default:
                return false;
        }
    }

    render(){
        if(this.state.loading){
            return null
        }
        
        else{
            return(
                <div className="pageV2Container">
                    <NavBar></NavBar>      
                    
                    <div className="titleSection">
                        <div className="titleContent">                        
                            {/* this link should only be visible if the uid of author matches the currently logged in user*/}                   
                            <Link className={this.state.userId === this.state.authorId ? "editPage" : "hidden"} to={`/post/edit/${this.state.pageId}`}>Edit this page</Link>

                            <h1 className="pageTitle">{this.state.pageTitle}</h1>
                            <p className="author">{"/u/" + this.state.author}</p>

                            <a className="cmvLink" target="_blank" href={this.state.cmvUrl}>Open CMV Discussion</a> 
                            <a className="aboutCMV" target="_blank" href="https://changemyview.net/" rel="noopener noreferrer">What's CMV?</a>
                        </div>
                    </div>

                    {/* this should have a white background */}
                    <h2 className="view">Where I'm coming from</h2>
                    <ReactMarkdown source={this.state.pageText} className="pageText"/>
                    <h2 className="view">{this.state.view}</h2>
                    <ReactMarkdown source={this.state.viewText} className="pageText viewText"/>
                    
                </div>
            )
        }
    }
}

export default PageV2;