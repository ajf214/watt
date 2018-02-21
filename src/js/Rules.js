import React, { Component } from 'react'
import fire from './fire'
import '../css/Rules.css'
import NavBar from './Nav.js'

import ReactGA from 'react-ga'
ReactGA.initialize('UA-114547651-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const ReactMarkdown = require('react-markdown')

const db = fire.database().ref('rules');

class Rules extends Component {

    constructor(props){
        super(props)
        this.state = {
            list: []
        }

        //this.fillDatabaseWithRules()
    }
    
    componentDidMount(){
        //oad rules from database and update state
        var dbRef = db.orderByKey().limitToLast(100);

        let temp = []
        
        dbRef.on('child_added', snapshot => {
            let rule = {
                text: snapshot.val().text,
                order: snapshot.val().order
            }

            //order results            
            temp = [rule].concat(temp);
            temp.sort((a,b) => (a.order - b.order));
            

            this.setState({
                list: temp
            })
        })

    }

    fillDatabaseWithRules(){
        //clear the rule list so it can be recreated
        db.remove()
        
        let masterRuleList = [
            {
                order: "-1",
                text: "# TL;DR\n\nWhen contributing content, follow these three rules or your content will be removed.\n\n1. Write only about your perspective\n2. Providing your reasoning for your perspective\n3. Provide resources to help get a deeper understanding of that perspective"
            },
            {
                order: "0",
                text: "## Tell your story, not others'\n Do your best to only write and edit articles that represent you and your perspective on issues.  This is an inherently subjective project, so it’s best to limit yourself to the ideas, morals and philosophies you understand best because you believe in them.\n\nThere are no right answers to exactly how you see the world — just do your best. The writing, content and sourcing will all benefit from it."
            },
            {
                order: "1",
                text: "## Foster a culture of understanding\n In our passions to make society better, we can sometimes get aggressive and hurtful.  **Don’t try to win arguments here.**  Do your best to get people to understand how you see the world and keep things positive. We want to understand your beliefs, not be convinced why someone is wrong.\n\nMost traditional media is far more effective at **confirming** our biases and don't do a good job exposing our bubbles. This keeps us divided, so **keep the “talking heads” out of this.**\n\n Consider how you would want to talk to a loved one that just happened to disagree with you."
            },
            {
                order: "2",
                text: "## Help me go deeper\n While the material we are discussing is squishy and subjective, there are usually good reasons and resources we can point to in order to explain why we believe what we believe.  What are the sources that you have read, watched or listened to that have helped form your beliefs?  It can even be an anecdote about the town you grew up in or a tragedy you experienced.\n\n Do your best to provide links that allow readers and editors alike to see a bigger context for your beliefs."
            }
        ]

        masterRuleList.forEach(rule => {
            db.push(rule)
        })
    }

    render(){
        return( 
            <div className="gridContainer">
                <NavBar></NavBar>
                <div className="ruleContainer">
                    <h1>The Rules</h1>
                    {this.state.list.map(rule => <ReactMarkdown className="rule">{rule.text}</ReactMarkdown>)}
                    <p className="caption">Can't break the rules, if you only write your perspective</p>
                    <img alt="pointy head meme guy" src={require('../img/roll safe.JPG')}></img>   
                </div>
                <div class="spacer"></div>
            </div>
        )       
    }
}

export default Rules;