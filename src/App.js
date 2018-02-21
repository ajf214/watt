import React, { Component } from 'react';
import PageSelect from './js/PageSelect.js';
import Page from './js/Page';
import './css/App.css';
import Rules from './js/Rules';
import About from './js/About';
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
                    <Route path="/rules/" component={Rules} />
                    <Route path="/about" component={About} />
                </div>
            </BrowserRouter>
        )
    }
}

export default App;