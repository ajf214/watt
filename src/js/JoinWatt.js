import React from 'react'
import { Link } from 'react-router-dom'
import '../css/JoinWatt.css'


function JoinWatt(props){
    
    return(
        <div className="create-page">
            <div className="inviteWrapper">
                <h1 className="form-title">What is Project WATT?</h1>
                <p>Project WATT is an experimental publication that challenges the current state of online discourse. Project WATT is a growing collection of diverse persectives on a wide range of issues.</p>
                <p>At the moment, our editors are <Link to="/how-this-works">invite only</Link> based on activity in the <a target="_blank" rel="noopener noreferrer" href="http://reddit.com/changemyview">Change My View subreddit</a>. If you have questions you can message <a href="http://twitter.com/projectwatt">@projectwatt</a> on twitter.</p>
            </div>
        </div>
    )
}

export default JoinWatt;
