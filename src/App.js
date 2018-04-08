import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './js/Home.js';
import './css/App.css';
import Rules from './js/Rules';
import About from './js/About';
import PageV2 from './js/PageV2';
import CreateOrEditPage from './js/CreateOrEditPage';
import HowThisWorks from './js/HowThisWorks'
import WritingGuide from './js/WritingGuide'



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
        return(
            <BrowserRouter>
                <div className = "grid">
                    <Route exact path = "/" component={Home} />
                    <Route path="/pagesv2/:pageId" component={PageV2} />
                    <Route path="/rules/" component={Rules} />
                    <Route path="/about" component={About} />
                    <Route exact path="/invite/:password" component={CreateOrEditPage} />
                    <Route path="/how-this-works" component={HowThisWorks} />        
                    <Route path="/writing-guidelines" component={WritingGuide} />
                </div>
            </BrowserRouter>
        )
    }
}

export default App;