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
            loading: true
        }
    }

    componentDidMount(){
        fire.database().ref("v2pages/" + this.state.pageId)
            .once("value", snapshot => {
                //set state with this info
                this.setState({
                    pageTitle: `How a ${snapshot.val().perspective} sees ${snapshot.val().issue}`,
                    author: snapshot.val().author,
                    authorId: snapshot.val().authorId,
                    pageText: snapshot.val().text,
                    userId: fire.auth().currentUser ? fire.auth().currentUser.uid : null,
                    loading: false
                })
            })
            .catch(e => console.log(e))
    }

    render(){
        if(this.state.loading){
            return null
        }
        
        else{
            return(
                <div className="pageV2Container">
                    <NavBar></NavBar>

                    {/* this link should only be visible if the uid of author matches the currently logged in user*/}                   
                    <Link className={this.state.userId === this.state.authorId ? "editPage" : "hidden"} to={`/post/edit/${this.state.pageId}`}>Edit this page</Link>
                    
                    <h1 className="pageTitle">{this.state.pageTitle}</h1>
                    <p className="author">{"@" + this.state.author}</p>
                    <ReactMarkdown source={this.state.pageText} className="pageText"/>
                </div>
            )
        }
    }
}

export default PageV2;