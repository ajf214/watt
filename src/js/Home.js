import React , { Component } from 'react'
import {Link} from 'react-router-dom'

import fire from './fire.js'
import NavBar from './Nav.js'
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

    componentWillMount(){
        //set listener for new pages?
        //OR run algorithm for display order

        //split array of titles into sections as per below?
        pageRef.on('child_added', snapshot => {
            let page = {
                //this should be nested so I can get properties of paragraph
                title: `How a ${snapshot.val().perspective} sees ${snapshot.val().issue}`,
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
                    <div className = "bigTitle">
                        <Link to={`pagesv2/${newThis.state.pages[0].id}`}>{newThis.state.pages[0].title}</Link>
                    </div>
                    
                    <div className="mediumTitleContainer">
                        <div className = "mediumTitle">
                            <Link to={`pagesv2/${newThis.state.pages[1].id}`}>{newThis.state.pages[1].title}</Link>
                        </div>
                        <div className = "mediumTitle">
                            <Link to={`pagesv2/${newThis.state.pages[2].id}`}>{newThis.state.pages[2].title}</Link>
                        </div>
                        <div className = "mediumTitle">
                            <Link to={`pagesv2/${newThis.state.pages[3].id}`}>{newThis.state.pages[3].title}</Link>
                        </div>
                    </div>
    
                    <div className = "articleList">
                        {/* mapping the rest of the titles here */}
                        {this.state.pages.map(function(page,index){
                            if(index>=4){
                                return(
                                    <Link to={`pagesv2/${newThis.state.pages[index].id}`}>{newThis.state.pages[index].title}</Link>
                                )
                            }
                            else{
                                return null
                            }
                        })}
                    </div>
    
                    {/* footer from the normal homepage, except make it a sign up button */}
                </div>
            )
        }    
    }

}

export default Home;