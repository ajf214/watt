import React, { Component } from 'react'
import fire from './fire.js'
import '../css/PageSelect.css'
import { Link } from 'react-router-dom'
const ReactMarkdown = require('react-markdown')

const pageRef = fire.database().ref('pages').orderByChild('name').limitToLast(100);

class PageSelect extends Component{
    constructor(props){
        super(props);
        this.state = {
            //the list of articles
            pages: [],
            value: "Select a page"
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
    
    addPage(p){
        //add new page to pages database
        p.preventDefault();

        let newPage = {
            name: this.newPageInput.value
        }

        //add paragraph object to database
        let newPageKey = fire.database().ref('pages').push(newPage);
        
        //push some stubs into the page
        let stub1 = "### Some background\n\nWrite some stuff..."
        let stub2 = "### The Players\n\nWrite some stuff..."

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

        fire.database().ref('pages/' + newPageKey.key + '/paragraphs').push(p1);
        fire.database().ref('pages/' + newPageKey.key + '/paragraphs').push(p2);
        
        //clear input
        this.newPageInput.value = '';
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render(){
        return(
        <div className = "container">
            <div className = "title">
                <h1>What are they thinking?</h1>
                <ReactMarkdown>{"Too often, we disagree with someone's opinion without first considering *why* &nbsp;they have that opinion in the first place."}</ReactMarkdown>
                <ReactMarkdown>{"*What Are They Thinking* helps you understand the ideology of those you disagree with so you can have better conversations."}</ReactMarkdown>
            </div>
            <div className = "pageSubmit">
                <select className="pageDropdown" value={this.state.value} onChange={this.handleChange.bind(this)}>
                    <option value="Select a page">Select a page</option>
                    {
                        this.state.pages.map(page => <option value={page.id} key={page.id}>{page.name}</option>)
                    } 
                </select>
                <button onClick={this.navigateToPage.bind(this)} value="View this page">View page</button>
            </div>    
            <Link to="/rules">Want to contribute? You gotta read the rules first</Link>
            <form className="addNewPage" onSubmit = {this.addPage.bind(this)}>
                <h3>Add a page</h3>
                <input className="pageInput" type="text" placeholder="name of new page" ref={el => this.newPageInput=el} />
                <input className="submitButton" type="submit" value="Create new page"/>
            </form> 
        </div>

                    

        );
    }
}

export default PageSelect


