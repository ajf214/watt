import React, {Component} from 'react'

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
        <form onSubmit={this.saveParagraph.bind(this)}>
            <input type="text" className="paragraphInput" defaultValue={this.props.text} placeholder="Paragraph text" ref={el => this.paragraphInput=el}/>
            <input type="text" defaultValue={this.props.filter==="" ? "None" : this.props.filter} placeholder="filter" ref={el => this.filterInput=el}/>
            <input type="order" defaultValue={this.props.order} placeholder="display order" ref={el => this.orderInput=el}/>
            <input type="submit" />
        </form>
        );
    }
}

export default ParagraphInput;