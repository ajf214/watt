import React, { Component } from 'react';
import PageSelect from './PageSelect.js';
import Page from './Page';
import './App.css';
import { BrowserRouter, Route} from 'react-router-dom'


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
                    <Route exact path = "/" component={PageSelect} />
                    <Route path="/page/:pageTitle" component={Page} />
                </div>
            </BrowserRouter>
        )
    }
}

export default App;