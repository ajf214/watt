import React , { Component } from 'react'
import {Link} from 'react-router-dom'

import fire from './fire.js'
import NavBar from './Nav.js'
import JoinWatt from './JoinWatt.js'
import '../css/Home.css'

const pageRef = fire.database().ref('v2pages').orderByChild('perspective').limitToLast(100);

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
                return true;
            case 'e':
                return true;               
            case 'i':
                return true;
            case 'o':
                return true;
            case 'u':
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
                id: snapshot.key
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
        document.body.style.backgroundColor = "#FFF"
    }

    componentWillUnmount(){
        pageRef.off('child_added')
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
                        <div class="homeContent">
                        
                            <div className = "bigTitle">
                                <Link to={`pagesv2/${newThis.state.pages[0].id}`}>{newThis.state.pages[0].title}</Link>
                                <p>{"@" + this.state.pages[0].author}</p>
                            </div>
                            
                            <div className="mediumTitleContainer">
                                <div className = "mediumTitle">
                                    <Link to={`pagesv2/${newThis.state.pages[1].id}`}>{newThis.state.pages[1].title}</Link>
                                    <p>{"@" + this.state.pages[1].author}</p>
                                </div>
                                <div className = "mediumTitle">
                                    <Link to={`pagesv2/${newThis.state.pages[2].id}`}>{newThis.state.pages[2].title}</Link>
                                    <p>{"@" + this.state.pages[2].author}</p>
                                </div>
                                <div className = "mediumTitle">
                                    <Link to={`pagesv2/${newThis.state.pages[3].id}`}>{newThis.state.pages[3].title}</Link>
                                    <p>{"@" + this.state.pages[3].author}</p>
                                </div>
                            </div>
            
                            <div className = "articleList">
                                <h2>More posts</h2>
                                {/* mapping the rest of the titles here */}
                                {this.state.pages.map(function(page,index){
                                    if(index>=4){
                                        return(
                                            <div className = "smallTitle">
                                                <Link to={`pagesv2/${newThis.state.pages[index].id}`}>{newThis.state.pages[index].title}</Link>
                                                <p>{"@" + newThis.state.pages[index].author}</p>
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