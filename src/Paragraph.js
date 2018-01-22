import React, { Component } from 'react'
import './Paragraph.css'

class Paragraph extends Component{
    constructor(props){
        super(props);
        this.state = {
            text: props.text,
            location: props.location,
            filter: props.filter,
            pageFilter: props.parentFilter,
            
            //this is the key, but couldn't use key for some reason??
            test: props.test,
            edit: props.editing
        }
    }

    componentWillMount(){
        this.prepareComponentState(this.props);
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
        this.props.delete(this.state.test);
    }

    //need key for paragraph
    startEdit(e){     
        this.props.edit(this.state.test);
    }

    render(){
        //normal state
        //show only the paragraphs with "None" filter
        if(this.state.pageFilter === "None" && this.state.filter === "None"){
            //normal state
            return(
                <div>
                    <p className="pageParagraph">{this.props.text}</p>
                    <button onClick={() => this.startEdit()}>Edit text</button>
                    <button onClick={() => this.deleteParagraph()}>Delete text</button>
                    {/*<p className="order">{this.props.order}</p>*/}
                </div>
            );
        }

        else{
            //ideology has been selected
            //show master articles and any other that match the filter
            if(this.state.filter === "None" || this.state.pageFilter === this.state.filter){
                //render this paragraph
                return(
                    <div className = {(this.state.pageFilter === this.state.filter) ? "filter pageParagraph" : "none pageParagraph"} >
                        <p>{this.props.text}</p>
                        <button onClick={() => this.startEdit()}>Edit text</button>
                        <button onClick={() => this.deleteParagraph()}>Delete text</button>
                        {/*<p className="order">{this.props.order}</p>*/}
                    </div>
                );
            }
            else return null;
        }
    }
}

export default Paragraph;

