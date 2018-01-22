import React, { Component } from 'react';
import PageSelect from './PageSelect.js';
import Page from './Page';
import './App.css'

class App extends Component{
    constructor(props){
        super(props);
        //state is just variables of this component objc that I get to play around with
        this.state = { 
            atHome: true,
            pageToNavigate: "" 
        };
    }

    //callback function when a page is selected to show an actual page
    renderPage(page){
        this.setState({
            atHome: false,
            pageToNavigate: page 
        });
    }

    render(){
        if(this.state.atHome){
            return(
                <div className="grid">
                    <PageSelect renderPage = {this.renderPage.bind(this)}></PageSelect>
                </div>
            );
        }
        else{
        //this should just render a Page component
            return(
                <div className="grid">
                    <Page pageName={this.state.pageToNavigate}></Page>
                </div>
            );
        }
    }
}

export default App;