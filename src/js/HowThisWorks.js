import React from 'react'
import '../css/HowThisWorks.css'
import NavBar from './Nav.js'
const ReactMarkdown = require('react-markdown')

const HowThisWorks = (props) =>{
    
    let content = 
    `# Welcome to projectWATT
    \n\nSociety is still working out how best to communicate online. Just ask one of the 87 million people in the Cambridge Analytica database, or the many who have quit Twitter because of toxic trolling. Yet being able to converse with the world and learn from those conversations is what makes the internet so valuable, so we need to figure out a way to promote good discussion and make that information as accessible as possible.
    \n\nThankfully, there is a popular subreddit called [Change My View](https://reddit.com/r/changemyview) (CMV):— “A place to post an opinion you accept may be flawed, in an effort to understand other perspectives on the issue.” CMV has a unique, transparent, and well-enforced set of rules that fosters healthy discussion and promotes nuanced points of view.     
    \n\nprojectWATT exists as a partnership with the CMV team to expand the scope of these rich and nuanced discussions beyond Reddit, so that they can be accessible to a broader audience.    
    \n\n## So what is it?
    \n\nprojectWATT is an invite-only, user-generated publication for capturing the essence of a Change My View post and discussion, so that it is easy to read, explore, and share with others.    
    \n\n## How do I get an invite to projectWATT?
    \n\nWhen you post on CMV, projectWATT keeps an eye on the post to see how much activity it has. If the post receives 50+ comments and 10+ replies from the Original Poster (OP), the OP will automatically get a direct message on Reddit with an invite link to create the projectWATT article.
    \n\n## How does a CMV post turn into a WATT article?
    \n\nIn a good WATT article, the author will update their view based on the discussion they had in the CMV post. The author also should provide context for why they wrote the CMV post in the first place. Usually CMV posts are related to a personal story or maybe a longstanding debate they have with friends. This context is really valuable to new readers.    
    \n\n## Why are you doing this?
    \n\nprojectWATT is my [Master’s Thesis](https://medium.com/thesis-blog) at the School of Visual Arts’ [Interaction Design](http://interactiondesign.sva.edu/) Program. For the last nine months, I’ve been researching how we consume information and the incentive structures that inform how media is produced.  It’s clear there is a gap in our public discourse that both [social media](https://theoutline.com/post/4128/mark-zuckerberg-kamala-harris-facebook-priorities-cambridge-analytica) and [traditional media](https://www.politico.com/magazine/story/2016/04/2016-donald-trump-blame-tv-cable-news-media-campbell-brown-campaign-cnn-fox-msnbc-213839) aren’t incentivized to close.
    \n\nprojectWATT is an attempt to elevate discourse that is not finding its way into mainstream channels. The partnership with CMV gives us an amazing community of passionate contributors who are already having these types of conversations in the subreddit. The goal of projectWATT is to convert as many CMV posts as possible into concise summaries, so they can be shared more broadly.    
    \n\n## I still have questions    
    \n\nGreat! You can reach out to me at [/u/wattinviterunner](https://www.reddit.com/message/compose/?to=wattinviterunner) on reddit, [@projectwatt](http://twitter.com/projectwatt) on Twitter or you can email me at <mailto:questions@projectwatt.com>    
    `
    
    return(
        <div className="howContainer">
            <NavBar></NavBar>
            <ReactMarkdown className="content" source={content}></ReactMarkdown>
        </div>
    )
}

export default HowThisWorks;