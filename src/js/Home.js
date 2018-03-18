import React , { Component } from 'react'
import '../css/Home.css'


class Home extends Component{

    constructor(props){
        super(props)
        this.setState = {

        }
    }

    componentDidMount(){
        //set listener for new pages?
        //OR run algorithm for display order

        //split array of titles into sections as per below?
    }

    render(){
        return(
            <div className = "homeContainer">
                <NavBar></NavBar>
                <div className = "bigTitle"></div>
                
                <div className = "mediumTitle"></div>
                <div className = "mediumTitle"></div>
                <div className = "mediumTitle"></div>

                <div className = "articleList">
                    {/* mapping the rest of the titles here */}
                </div>

                {/* footer from the normal homepage, except make it a sign up button */}
            </div>
        )
    }

}