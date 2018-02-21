import React, {Component} from 'react'
import '../css/ParagraphInput.css'

class ParagraphInput extends Component{
    constructor(props){
        super(props);
        this.state = {
            maxOrder: this.props.order
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

        this.props.addParagraph(paragraph, this.props.id)
        
        //clear input
        this.paragraphInput.value = '';
        this.filterInput.value = 'None';
        this.orderInput.value = '';
    }

    componentWillReceiveProps(nextProps){
        console.log("received props -- ParagraphInput");
        this.setState({
             maxOrder: nextProps.order
         })
        console.log(`Updated State: ${this.state.maxOrder}`)
    }

    componentDidUpdate(){
        console.log("componentDidUpdate -- ParagraphInput")
        // eslint-disable-next-line
        this.orderInput.value = parseInt(this.state.maxOrder) + 1
    }

    //{`This is a test of \t Let's see if it works`}
    //Add your perspective. Markdown supported(ex:" \t '## This is a header' \t '**This is Bold**')

    render(){
        return(
        <form className={`${this.props.special} paragraphInputForm`} onSubmit={this.saveParagraph.bind(this)}>
            <h3>Add something</h3>
            <textarea className="paragraphInput" defaultValue={this.props.text} placeholder={`Add your perspective. Markdown supported \n\nEx: \n## This is a header \n**this is bold**`} ref={el => this.paragraphInput=el}/>
            <label for="order" className="orderLabel">Display order:</label>
            <label for="filter" className="filterLabel">Filter:</label>
            <input id="order" type="order" className="orderInput" defaultValue={this.state.maxOrder} placeholder="display order" ref={el => this.orderInput=el}/>
            <input id="filter" type="text" className="filterInput" defaultValue={this.props.filter==="" ? "None" : this.props.filter} placeholder="filter" ref={el => this.filterInput=el}/>
            <input type="submit" className="submit" value="Save section"/>
        </form>
        );
    }
}

export default ParagraphInput;