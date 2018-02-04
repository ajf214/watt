import React, {Component} from 'react'
import './ParagraphInput.css'

class ParagraphInput extends Component{
    constructor(props){
        super(props);
        this.state = {
            //callback to save with a set of properties
        }
    }

    componentWillMount(){

    }

    saveParagraph(e){
        e.preventDefault();

        let paragraph = {
            text: this.paragraphInput.value,
            filter: this.filterInput.value,
            order: this.orderInput.value,
        }

        this.props.addParagraph(paragraph, this.props.myKey)
        
        //clear input
        this.paragraphInput.value = '';
        this.filterInput.value = 'None';
        this.orderInput.value = '';
    }

    render(){
        return(
        <form className="paragraphInputForm" onSubmit={this.saveParagraph.bind(this)}>
            <textarea className="paragraphInput" defaultValue={this.props.text} placeholder="Add your perspective..." ref={el => this.paragraphInput=el}/>
            <input type="text" className="filterInput" defaultValue={this.props.filter==="" ? "None" : this.props.filter} placeholder="filter" ref={el => this.filterInput=el}/>
            <input type="order" className="orderInput" defaultValue={this.props.order} placeholder="display order" ref={el => this.orderInput=el}/>
            <input type="submit" className="submit" value="Save section"/>
        </form>
        );
    }
}

export default ParagraphInput;