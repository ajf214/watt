import React from 'react'
import { Link } from 'react-router-dom'
import '../css/JoinWatt.css'


function JoinWatt(props){
    
    return(
        <div className="create-page">
            <div className="inviteWrapper">
                <h1 className="form-title">Want to contribute? <Link to="/rules">Read the rules first</Link></h1>
                
                <h1>Now add your perspective</h1>
                <label className="explainInvite">WATT is invite only at the moment</label>
                <Link to="/requestInvite">Request an invite</Link>
            </div>
        </div>
    )
}

export default JoinWatt;
