import React, { Component } from 'react'
import fire from './fire'
import '../css/Rules.css'
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
        db.orderByChild('order').on('child_added', snapshot => {
            let rule = snapshot.val().text

            this.setState({
                list: [rule].concat(this.state.list)
            })
        })

    }

    fillDatabaseWithRules(){
        //clear the rule list so it can be recreated
        db.remove()
        
        let masterRuleList = [
            {
                order: "0",
                text: "## Tell your story, not others'\n Do your best to only write and edit articles that represent you and your ideology.  This is an inherently subjective project, so it’s best to limit yourself to the ideas, morals and philosophies you understand best because you believe in them.\n\nThere are no right answers to exactly how you see the world — just do your best. The writing, content and sourcing will all benefit from it."
            },
            {
                order: "1",
                text: "## Foster a culture of understanding\n In our passions to make society better, we can sometimes get aggressive and hurtful.  Don’t try to win arguments here.  Do your best to get people to understand how you see the world and keep things positive. We want to understand your beliefs, not be convinced why someone is wrong.\n\nMost traditional media is far more effective at confirming our biases which keeps us divided. Keep the “talking heads” out of this.  Consider how you would want to talk to a loved one that just happened to disagree with you."
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
                <h1>The Rules</h1>
                <p>If you don't follow the rules, your content will be removed</p>
                {this.state.list.map(rule => <ReactMarkdown>{rule}</ReactMarkdown>)}
            </div>
        )       
    }
}

export default Rules;