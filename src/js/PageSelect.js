import React, { Component } from 'react'
import fire from './fire.js'
import '../css/PageSelect.css'
import { Link } from 'react-router-dom'
import NavBar from './Nav.js'
import ReactGA from 'react-ga'
ReactGA.initialize('UA-114547651-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const ReactMarkdown = require('react-markdown')
const pageRef = fire.database().ref('pages').orderByChild('name').limitToLast(100);

class PageSelect extends Component{
    constructor(props){
        super(props);
        this.state = {
            //the list of articles
            pages: [],
            value: "Select a page",
            errorText: ""
        }
    }

    componentDidMount(){
        //get a database reference and fill up pages
        console.log("componentDidMount -- Start");

        //let pageRef = fire.database().ref('pages').orderByChild('name').limitToLast(100);

        //called once for each row on initialization, then once for each new child
        pageRef.on('child_added', snapshot => {
            let page = {
                //this should be nested so I can get properties of paragraph
                name: snapshot.val().name,
                id: snapshot.key
            };

            this.setState({
                pages: [page].concat(this.state.pages)
            })
        })
    }

    componentWillUnmount(){
        pageRef.off('child_added')
    }

    shouldComponentUpdate(){
        console.log("should component update");
        return true;
    }

    navigateToPage(p){
        //this new way will use the Link thing in React Router
        this.props.history.push("/page/" + this.state.value);
    }
    
    
    //add new page to pages database 
    addPage(p){
        
        p.preventDefault();

        //check the page input value
        if(this.newPageInput.value === ""){
            //output some kind of error
            this.errorMessage.value="ERROR"
            this.setState({
                errorText: "You can't create a blank page"
            })
            return
        }

        //matches 'How [perspective] view(s) [an issue]'
        //need special '/' character to create a regex instead of string
        let regex = /How\s(.*)\sviews?\s.*/

        if(!this.newPageInput.value.match(regex)){
            this.errorMessage.value="ERROR"
            this.setState({
                errorText: "You must match the pattern 'How [perspective] view(s) [an issue]'. Look at existing pages for examples"
            })
            return
        }
        
        let newPage = {
            name: this.newPageInput.value
        }

        //add paragraph object to database
        let newPageKey = fire.database().ref('pages').push(newPage);
        
        //push some stubs into the page
        let stub1 = "## Where I'm coming from\n\nWrite some stuff..."
        let stub2 = "## How I see this issue\n\nWrite some stuff..."

        //extracting "perspective" w/ regex and creating that section
        //NEED TO CHANGE THIS TO THE ISSUE, NOT PERSPECTIVE
        let perspective = this.newPageInput.value.match(regex)[1]
        let stub3 = `## The ${perspective} perspective\n\nHow does this perspective view this issue?`

        let stub4 = "## Keep reading\n\nShare some links to get a better understanding of this perspective"

        let p1 = {
            text: stub1,
            filter: "None",
            order: "0"
        }

        let p2 = {
            text: stub2,
            filter: "None",
            order: "1"
        }

        let p3 = {
            text: stub3,
            filter: "None",
            order: "2"
        }

        let p4 = {
            text: stub4,
            filter: "None",
            order: "3"
        }

        fire.database().ref('pages/' + newPageKey.key + '/paragraphs').push(p1);
        fire.database().ref('pages/' + newPageKey.key + '/paragraphs').push(p2);
        fire.database().ref('pages/' + newPageKey.key + '/paragraphs').push(p3);
        fire.database().ref('pages/' + newPageKey.key + '/paragraphs').push(p4);
        
        //clear input
        this.newPageInput.value = '';

        this.props.history.push("/page/" + newPageKey.key);
        //should be in "edit" mode since the page was just create
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render(){
        return(
        <div className = "container">
            <NavBar></NavBar>
            <div className = "cover">
                <div className = "title">
                    <h1>What are they thinking?</h1>
                    <ReactMarkdown className="page-paragraph">{"Too often, we disagree with someone's opinion without first considering *why* &nbsp;they have that opinion in the first place."}</ReactMarkdown>
                    <ReactMarkdown className="page-paragraph">{"*What Are They Thinking* helps you understand the ideology of those you disagree with so you can have better conversations."}</ReactMarkdown>
                
                    <div className = "pageSubmit">
                        <select className="pageDropdown" value={this.state.value} onChange={this.handleChange.bind(this)}>
                            <option value="Select a page">Select a page</option>
                            {
                                this.state.pages.map(page => <option value={page.id} key={page.id}>{page.name}</option>)
                            } 
                        </select>
                        <button onClick={this.navigateToPage.bind(this)} value="View this page">View page</button>
                    </div>
                </div>
            </div>
            <div className="create-page">
                <h1 className="form-title">Want to contribute? <Link to="/rules">Read the rules first</Link></h1>
                
                <form className="addNewPage" onSubmit = {this.addPage.bind(this)}>
                    <h1>Now add your perspective</h1>
                    <label className="errorMessage" ref={el => this.errorMessage = el}>{this.state.errorText}</label>
                    <input className="pageInput" type="text" placeholder="How [your perspective] view(s) [an issue]" ref={el => this.newPageInput=el} />
                    <input className="submitButton" type="submit" value="Create new page"/>
                </form> 
            </div>
        </div>

                    

        );
    }
}

export default PageSelect


