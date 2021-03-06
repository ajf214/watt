import React , { Component } from 'react'
import {Link} from 'react-router-dom'

import fire from './fire.js'
import NavBar from './Nav.js'
import JoinWatt from './JoinWatt.js'
import '../css/Home.css'
import PageGridItem from './PageGridItem.js'

import ReactGA from 'react-ga'
ReactGA.initialize('UA-114547651-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const pageRef = fire.database().ref('v2pages').limitToLast(100);

class Home extends Component{

    constructor(props){
        super(props)
        this.state = {
            pages: [],
            loading: true
        }
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

    componentWillMount(){
        //set listener for new pages?
        //OR run algorithm for display order

        //split array of titles into sections as per below?
        pageRef.on('child_added', snapshot => {
            let page = {
                //this should be nested so I can get properties of paragraph
                
                //need to detect if the first letter is a vowel so I can decide between 'a' or 'an'
                title: (this.isVowel(snapshot.val().perspective.charAt(0)) ? `How an ${snapshot.val().perspective} sees ${snapshot.val().issue}` : `How a ${snapshot.val().perspective} sees ${snapshot.val().issue}`),
                author: snapshot.val().author,
                id: snapshot.key,
                view: snapshot.val().view,
                viewText: snapshot.val().viewText
            };

            this.setState({
                pages: [page].concat(this.state.pages)
            })
        })

        //once is called after ALL initial child added's are done, 
        //so this essentially tells me i'm done loading
        pageRef.once('value', snapshot => {
            console.log("done loading")
            this.setState({
                loading: false
            })
        })
    }

    componentDidMount(){
        //this.createSpecialInvite("comeyPepperoniInvite")

        document.body.style.backgroundColor = "#FFF"
    }

    componentWillUnmount(){
        //need to remove this 
        pageRef.off('child_added')
    }

    async createSpecialInvite(inviteCode){
        const newInvite = {
            "author" : "PepperoniFire",
            "cmvTitle": "CMV: James Comey deviated from his own standards of leadership and should acknowledge that.",
            "dateAdded" : Date.now(),
            "wattPageUrl" : "",
            "wattPostUid" : inviteCode //need to pick the invite code        
        }
        await fire.database().ref("invites").push(newInvite)
        console.log("special invite successfully created")
    }

    render(){
        var newThis = this;

        if(this.state.loading){
            console.log("loading")
            return null;
        }

        else{
            return(
                <div className = "homeContainer">
                    <NavBar></NavBar>
                        <div className="homeContent">
                            <a className="bigTitle" href="how-this-works">
                                <span>
                                    <PageGridItem
                                        title="Welcome to projectWATT*"
                                        subtitle="We're a new kind of publication to promote nuanced perspectives on a wide variety of issues."
                                        id="whatThisIs"
                                    ></PageGridItem>
                                    <h5 className="asterisk">*What are they thinking?</h5>
                                </span>
                            </a>
                            <div className="mediumTitleContainer">   
                                <h2 className="containerLabel">RECENT</h2>                             
                                {this.state.pages.map( (page, index) => {                                 
                                    if(index < 6){
                                        return(
                                        <PageGridItem
                                            author={page.author}
                                            id={page.id}
                                            title={page.title}
                                            subtitle={(page.view == null) ? "" : page.view} 
                                            key={index}   
                                        ></PageGridItem>  
                                        )
                                    }
                                    else{
                                        return null
                                    }
                                })}
                            </div>
            
                            <div className = "articleList">
                                <h2 className="containerLabel">MORE POSTS</h2>
                                {/* mapping the rest of the titles here */}
                                {this.state.pages.map(function(page,index){
                                    if(index>=6){
                                        return(
                                            <div key={index} className = "smallTitle">
                                                <Link to={`pagesv2/${newThis.state.pages[index].id}`}>{newThis.state.pages[index].title}</Link>
                                                <p>{"/u/" + newThis.state.pages[index].author}</p>
                                            </div>
                                        )
                                    }
                                    else{
                                        return null
                                    }
                                })}
                            </div>
                                                    
                        </div>
                    {/* footer from the normal homepage, except make it a sign up button */}
                    <JoinWatt></JoinWatt>
                </div>
            )
        }    
    }

}

export default Home;