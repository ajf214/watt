import React from 'react'
import '../css/HowThisWorks.css'
import NavBar from './Nav.js'
const ReactMarkdown = require('react-markdown')

const HowThisWorks = (props) =>{
    
    let content = 
    `# How this works
    \n\n## What is Project WATT?
    \n\nSocial media has no vested interest in keeping you informed. Their only incentive is to keep you engaged and entertained. Even good journalists are fighting an uphill battle prioritizing their work over engagement metrics. In the last few years we have begun to notice the [devastating effects of these toxic incentives](https://theoutline.com/post/3470/we-are-in-an-information-crisis-parkland-youtube-facebook-fake-news?zd=1&zi=j2ekw5i7).
    \n\nProject WATT (What Are They Thinking?) is an experimental publication to collect a wide variety of perspectives on a wide variety of issues. It is made up of brief yet nuanced articles written and edited by the public.
    \n\nProject WATT is run in partnership with the popular subreddit [Change My View](http://reddit.com/r/changemyview).
    \n\n## How do I sign up to contribute to Project WATT?
    \n\nIn order to become a contributor you need to write a post on [Change My View](http://reddit.com/r/changemyview) that receives more than 20 comments (that follow the [rules](https://www.reddit.com/r/changemyview/wiki/rules)).  If your post receives more than 20 comments, you’ll receive an email with an invite code to sign up for Project WATT.
    \n\n## How do I turn my CMV post into a Project WATT article?
    \n\nOnce you are signed up, you can contribute your WATT article.  We have [writing guidelines](/writing-guidelines) to help you convert your CMV post into a Project WATT article.
    \n\n## Why are you doing this?
    \n\nProject WATT is my [Master’s Thesis](https://medium.com/thesis-blog) at the School of Visual Arts [Interaction Design Program](http://interactiondesign.sva.edu/). For the last eight months, I’ve been researching how we consume information and the incentive structures that inform how media is produced.  It’s clear to me now that there is a gap in our public discourse that both social media and traditional media are structurally incapable of serving.
    \n\nProject WATT is an attempt to elevate discourse that is not finding its way into mainstream channels. The partnership with CMV gives us an amazing community of passionate contributors who are already having these types of conversations in the subreddit. The goal of Project WATT is to convert these CMV posts into concise summaries, so they can be shared more broadly beyond the scope of Reddit.
    `
    
    return(
        <div className="howContainer">
            <NavBar></NavBar>
            <ReactMarkdown className="content" source={content}></ReactMarkdown>
        </div>
    )
}

export default HowThisWorks;