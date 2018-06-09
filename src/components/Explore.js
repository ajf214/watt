import React, { Component } from 'react'
import './Explore.css'
import NavBar from '../js/Nav.js'
import fire from '../js/fire'
import PageGridItem from '../js/PageGridItem.js'

const stringSim = require('string-similarity');

class Explore extends Component{

    constructor(props){
        super(props)
        this.state = {
            pages: []
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

    onKeyPressed(key){
        //execute search on 'enter'
        if(key.keyCode === 13){
            this.search();
        }
    }
    
    async search(){
        const searchTerm = this.exploreInput.value
        const similarityThreshold = 0.5

        let searchResults = []
        this.setState({
            pages: []
        })
        
        //get all perspectives
        //get all issues
        const pages = await fire.database().ref("v2pages").once("value")

        //create array that will be loaded up with each iteration

        pages.forEach((page) => {
             //match 'searchTerm' against perspectives
             //match 'searchTerm' against perspectives
             const pSimilarity = stringSim.compareTwoStrings(searchTerm, page.val().perspective)
             if(pSimilarity > similarityThreshold){
                 //add to array
                 //should save issue, perspective, key so I can reconstruct titles
                 searchResults.push(page)
             }

             //only need to check the issue if the perspective is NOT similar
             else{
                const iSimilarity = stringSim.compareTwoStrings(searchTerm, page.val().issue)
                if(iSimilarity > similarityThreshold){
                    //add to array
                    searchResults.push(page)
                }
             }
        })

        console.log(searchResults)

        searchResults.forEach(r => {
            let page = {
                //this should be nested so I can get properties of paragraph
                
                //need to detect if the first letter is a vowel so I can decide between 'a' or 'an'
                title: (this.isVowel(r.val().perspective.charAt(0)) ? `How an ${r.val().perspective} sees ${r.val().issue}` : `How a ${r.val().perspective} sees ${r.val().issue}`),
                author: r.val().author,
                id: r.key,
                view: r.val().view,
                viewText: r.val().viewText
            }

            this.setState({
                pages: [page].concat(this.state.pages)
            })
        })

        console.log(this.state.pages)

        //return combined list of all results
        //should be a list of links

    }

    componentDidMount(){
        document.body.style.backgroundColor = "#643472"
        document.addEventListener("keydown", this.onKeyPressed.bind(this))
    }
    
    render(){
        return(
            <div className="exploreContainer">
                <NavBar></NavBar>
                <div className="exploreSearchBoxContainer">
                    <input type="text" ref={el => this.exploreInput=el} placeholder="search by perspective or by issue"></input>
                    <button onClick={this.search.bind(this)}>Search</button>
                </div>

                <div className="resultsContainer">
                    {/* map pages here */}
                    {this.state.pages.map( (page,index) => {
                        return <PageGridItem
                            author={page.author}
                            id={page.id}
                            title={page.title}
                            subtitle={(page.view == null) ? "" : page.view} 
                            key={index}   
                        ></PageGridItem>    
                    })}
                </div>
            </div>
        )
    }
}

export default Explore;