import React, { Component } from 'react'
import fire from './fire'
import Paragraph from './Paragraph.js'
import ParagraphInput from './ParagraphInput.js'
import './Page.css'

var paragraphRef

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
        this.getPageData();
    }

    getPageData(){
        console.log("getting data")

        let pTitle = fire.database().ref('pages/' + this.state.pageName + '/name')
        
        pTitle.once("value", (snapshot) => {
                console.log("I successfully read the title data")
                this.setState({
                    pageTitle: snapshot.val()
                })
            },(error) => {
                console.log("I messed up")
            }
        )



        //array for temporary sort of 2 paragraphs
        let temp=[]

        //need a reference to all the paragraphs
        paragraphRef = fire.database().ref('pages/' + this.state.pageName + '/paragraphs').orderByChild('order').limitToLast(100);

        paragraphRef.on('child_added', snapshot => {
            let paragraph = {
                //this should be nested so I can get properties of paragraph
                text: snapshot.val().text,
                filter: snapshot.val().filter,
                order: snapshot.val().order, 
                id: snapshot.key,
                edit: false
            };

            //sort paragraphs
            temp = [paragraph].concat(temp);
            temp.sort((a,b) => (a.order - b.order));

            this.setState({
                paragraphs: temp
            })
        })

        paragraphRef.on('child_changed', snapshot => {
            //should find the item in the array and change whatever property is important?
            //window.location.reload()
            this.getPageData()
        })

        paragraphRef.on('child_removed', snapshot => {
            //should find the item in the array and delete it
            this.getPageData()
            //window.location.reload()
        })
    }

    componentWillUnmount(){
        paragraphRef.off('child_added')
        paragraphRef.off('child_removed')
        paragraphRef.off('child_changed')
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
        paragraphRef = fire.database().ref('pages/'+ this.state.pageName +'/paragraphs').child(key);
        paragraphRef.update(newParagraph) 
        
        //now need to set paragraph back to regular paragraph
        this.state.paragraphs.forEach(paragraph => (paragraph.edit = false))
    }

    //BUG: if I edit, change nothing, then save the paragraph component doens't re-render
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
                        special={"custom name"}
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
        paragraphRef = fire.database().ref('pages/'+ this.state.pageName +'/paragraphs').child(key);
        paragraphRef.remove();
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
                            <option key="1234" value="None">Filter ideology</option>
                            {
                                this.state.paragraphs.map(paragraph => paragraph.filter !== "None" ? <option key={paragraph.id} value={paragraph.filter}>{paragraph.filter}</option> : null)
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