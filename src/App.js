import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './js/Home.js';
import Page from './js/Page';
import './css/App.css';
import Rules from './js/Rules';
import About from './js/About';
import Login from './js/Login';
import PageV2 from './js/PageV2';
import CreateOrEditPage from './js/CreateOrEditPage';



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
                    <Route path="/page/:pageId" component={Page} />
                    <Route path="/pagesv2/:pageId" component={PageV2} />
                    <Route path="/rules/" component={Rules} />
                    <Route path="/about" component={About} />
                    <Route path="/login/:action" component={Login} />
                    <Route exact path="/post/:action" component={CreateOrEditPage} />
                    <Route exact path="/post/:action/:pageId" component={CreateOrEditPage} />
                </div>
            </BrowserRouter>
        )
    }
}

export default App;