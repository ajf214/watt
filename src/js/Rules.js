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
        document.body.style.backgroundColor = "#643472"
        
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
                order: "-2",
                text: `# Converting a CMV post to a Project WATT article
                \n\n### Choosing the perspective
                \n\nYou don’t need to box yourself in to the typical “conservative” or “liberal” perspective (unless you want to). 
                    Too often the sides of an argument boil down to these two sides, try to move beyond that. Think about your background 
                    and what gives you a unique outlook on this particular issue.  
                \n\nSome general areas to choose from:
                \n- What generation are you a part of?
                \n- What part of the world did you grow up in?
                \n- What major world events did you witness?
                \n\n### Choosing the issue
                \n\nThis should be more straightforward. What’s the issue you discussed in your CMV?
                \n\n### Writing the article
                \n\nThere are three sections that need to be filled out:
                \n\n#### Where I’m coming from
                \n\nExpand on your chosen perspective. What gives you a unique insight on this issue? It could be about your job, your upbringing, your nationality, or really anything. Many CMV posts already include something like this.  Think about why you wanted to write this CMV in the first place.
                \n\n#### My perspective
                \n\nThis should be more straightforward and you should be able to use a lot of your original CMV here. If you learned something from the discussion or if you awarded any Delta’s, then you should incorporate some of that thinking into this section.
                \n\n#### What did you get out of the discussion
                \n\nWhat did you get out of discussing these issues?
                \n\nHave more questions? You can reach us [@projectwatt](twitter.com/projectwatt) on twitter or send us an email to writing@projectwatt.com`
            }
        ]

        masterRuleList.forEach(rule => {
            db.push(rule)
        })
    }

    render(){
        return( 
            <div className="rulesPageContainer">
                <NavBar></NavBar>
                <div className="ruleContainer">
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