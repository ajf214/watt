import React, { Component } from 'react'
import fire from './fire'
import Paragraph from './Paragraph.js'
import ParagraphInput from './ParagraphInput.js'
import './Page.css'

class Page extends Component{

    constructor(props){
        super(props);
        this.state = {
            paragraphs: [],
            pageName: this.props.match.params.pageTitle,
            filterValue: "None",
            pageTitle: ""
        }
    }


    componentDidMount(){  
        this.updateParagraphList();
        let actualPageTitle;

        let pTitle = fire.database().ref('pages/' + this.state.pageName + '/name')
        
        pTitle.once("value", (snapshot) => {
            return actualPageTitle = snapshot.val()
        })

        console.log("something else");

        this.setState({
            pageTitle: actualPageTitle
        })
    }

    updateParagraphList(){
        let something=[]
        //need a reference to all the paragraphs
        let paragraphRef = fire.database().ref('pages/' + this.state.pageName + '/paragraphs').orderByChild('order').limitToLast(100);

        paragraphRef.on('child_added', snapshot => {
            let paragraph = {
                
                //this should be nested so I can get properties of paragraph
                text: snapshot.val().text,
                filter: snapshot.val().filter,
                order: snapshot.val().order, 
                id: snapshot.key,
                edit: false
            };

            //put new child in the right order
            //let temp = [paragraph].concat(this.state.paragraphs)
            
            //something is weird here and I would really like to figure it out!!!
            let temp = [paragraph].concat(something);
            temp.sort((a,b) => (a.order - b.order));

            something = temp;

            this.setState({
                paragraphs: something
            });
        })
    }

    //needs to also account for the order, can't just push
    //needs to be add OR edit paragraph
    addParagraph(newParagraph, key){
        if(key != null){
            //do an update
            this.updateParagraph(newParagraph, key)
        }
        else{
            //add paragraph object to database
            fire.database().ref('pages/' + this.state.pageName + '/paragraphs').push(newParagraph);
        }
    }

    updateParagraph(newParagraph, key){
        let paragraphRef = fire.database().ref('pages/'+ this.state.pageName +'/paragraphs').child(key);
        paragraphRef.update(newParagraph) 
        
        //now need to set paragraph back to regular paragraph
        this.state.paragraphs.forEach(paragraph => (paragraph.edit = false))
        this.updateParagraphList();
    }

    startEdit(key){
        //put paragraph with key == key into edit mode
        
        this.state.paragraphs.forEach(function(paragraph, index){
            if(paragraph.id === key){
                paragraph.edit = true                
            }     
        })
        
        this.forceUpdate();
    }

    addMiddleParagraph(order){
        //insert a new paragraph at that spot in the order
    }

    renderParagraph(paragraph){
        if(!paragraph.edit){
            return(
                <div>
                    <Paragraph 
                        parentFilter={this.state.filterValue} 
                        key={paragraph.id}
                        id={paragraph.id} 
                        text={paragraph.text} 
                        order={paragraph.order} 
                        filter={paragraph.filter}
                        edit={this.startEdit.bind(this)}
                        delete={this.deleteParagraph.bind(this)}>
                    </Paragraph>
                </div>
            );
        }
        else{
            return(
                <div>
                    <ParagraphInput
                        filter={paragraph.filter} 
                        text={paragraph.text} 
                        order={paragraph.order}
                        key={paragraph.id}
                        id={paragraph.id}
                        addParagraph={this.addParagraph.bind(this)}>
                    </ParagraphInput>
                </div>
            );
        }
    }

    /*
    THIS IS TO ADD A PARAGRAPH TO ANYTHING BUT THE BOTTOM
    
    
    input:
        - index to start at for moving paragraphs
    output:
        - true if it ran successfully
        - database will be updated at this point, order on page should be correct
    */
    moveParagraphsDown(){

    }

    deleteParagraph(key){
        let paragraphRef = fire.database().ref('pages/'+ this.state.pageName +'/paragraphs').child(key);
        paragraphRef.remove();

        this.updateParagraphList();
        
    }



    handleChange(event){
        this.setState({filterValue: event.target.value});
    }



    

    render(){
        return(
            <div className = "pageContainer">
                <h1>{this.state.pageTitle}</h1>
               
                {/* "ideology" input*/}
                <form id="ideologyFilter">
                    <label className="ideologyLabel"> Choose a filter: 
                        <select className="ideologyDropdown" value = {this.state.filterValue} onChange = {this.handleChange.bind(this)}>
                            {/* need to  eliminate duplicates*/}
                            <option value="None">Filter ideology</option>
                            {
                                this.state.paragraphs.map(paragraph => paragraph.filter !== "None" ? <option key={paragraph.id} value={paragraph.filter}>{paragraph.filter}</option> : "")
                            }
                        </select>
                    </label>
                </form>

                {
                    /* this is where an "added" filter should go with a description */
                }


                {
                    this.state.paragraphs.map(paragraph => this.renderParagraph(paragraph))
                }

                <ParagraphInput 
                    filter="" 
                    text="" 
                    order=""
                    key="1234" 
                    addParagraph={this.addParagraph.bind(this)}>
                </ParagraphInput>       
                
            </div>    
        );
    }
}

export default Page;