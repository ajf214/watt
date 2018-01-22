import React, { Component } from 'react'
import fire from './fire.js'
import './PageSelect.css'

class PageSelect extends Component{
    constructor(props){
        super(props);
        this.state = {
            //the list of articles
            pages: [],
            value: "Select a page"
        }
    }

    componentWillMount(){
        //get a database reference and fill up pages
        let pageRef = fire.database().ref('pages').orderByChild('name').limitToLast(100);

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

    navigateToPage(p){
        //load the app component with a certain page property
        this.props.renderPage(this.state.value);
    }
    
    addPage(p){
        //add new page to pages database
        p.preventDefault();

        let newPage = {
            name: this.newPageInput.value
        }

        //add paragraph object to database
        fire.database().ref('pages').push(newPage);
        
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
                <p>Too often, we disagree with what is being proposed, without first considering why someone is proposing it.</p>
                <p>What Are They Thinking helps you understand the ideology of those you disagree with so you can have better conversations.</p>
            </div>
            <form onSubmit = {this.navigateToPage.bind(this)}>
                <select value={this.state.value} onChange={this.handleChange.bind(this)}>
                    <option value="Select a page">Select a page</option>
                    {
                        this.state.pages.map(page => <option value={page.id} key={page.id}>{page.name}</option>)
                    } 
                </select>
                <input type="submit" value="look at page"/>
            </form>

            <form onSubmit = {this.addPage.bind(this)}>
                <input type="text" ref={el => this.newPageInput=el} />
                <input type="submit"/>
            </form>
        </div>
        );
    }
}

export default PageSelect;


