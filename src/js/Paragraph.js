import React, { Component } from 'react'
import '../css/Paragraph.css'

const ReactMarkdown = require('react-markdown')

class Paragraph extends Component{
    constructor(props){
        super(props);
        this.state = {
            text: props.text,
            location: props.location,
            filter: props.filter,
            pageFilter: props.parentFilter,
            
            //this is the key, but couldn't use key for some reason??
            id: props.id,
            edit: props.editing
        }
    }

    componentWillMount(){
        this.prepareComponentState(this.props);
        console.log("ComponentWillMount");
    }

    prepareComponentState(props){
        //console.log(this.props.key);
        this.setState({
             pageFilter: props.parentFilter
         })
    }

    //runs when new properties are sent due to parent state change
    componentWillReceiveProps(nextProps){
        console.log("received props");
        this.setState({
             pageFilter: nextProps.parentFilter
         })
    }

    deleteParagraph(e){
        //e.preventDefault();
        this.props.delete(this.state.id);
    }

    //need key for paragraph
    startEdit(e){     
        this.props.edit(this.state.id);
    }

    addParagraph(e){
        this.props.add(this.state.location);
    }

    render(){
        //normal state
        //show only the paragraphs with "None" filter
        if(this.state.pageFilter === "None" && this.state.filter === "None"){
            //normal state
            return(
                <div className="pageParagraph" key={this.props.id}>
                    <p className="order">{this.props.order}</p>
                    <ReactMarkdown source={this.props.text} className="sectionContent"/>
                    <button className="editButton" onClick={() => this.startEdit()}>Edit Section</button>
                    <button className="deleteButton" onClick={() => this.deleteParagraph()}>Delete Section</button>
                    {/*<button className="addButton" onClick={() => this.addParagraph()}>+ Add Below</button>*/}
                </div>
            );
        }

        else{
            //ideology has been selected
            //show master articles and any other that match the filter
            if(this.state.filter === "None" || this.state.pageFilter === this.state.filter){
                //render this paragraph
                console.log("rendered 'non-none' paragraph")
                return(
                    <div className = {(this.state.pageFilter === this.state.filter) ? "filter pageParagraph" : "none pageParagraph"} >                        
                        {(this.state.pageFilter === this.state.filter) ? <p className="filter-tag">{this.state.filter}</p> : ""} {/*<p className="filter-tag">{this.state.filter}</p>*/}
                        <p className="order">{this.props.order}</p>
                        <ReactMarkdown source={this.props.text} className="sectionContent"/>
                        <button className="editButton" onClick={() => this.startEdit()}>Edit Section</button>
                        <button className="deleteButton" onClick={() => this.deleteParagraph()}>Delete Section</button>
                        {/*<button className="addButton" onClick={() => this.addParagraph()}>+ Add Below</button>*/}
                    </div>
                );
            }
            else return null;
        }
    }
}

export default Paragraph;

