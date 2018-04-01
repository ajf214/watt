import React from 'react'
import '../css/HowThisWorks.css'
import NavBar from './Nav.js'
const ReactMarkdown = require('react-markdown')

const WritingGuide = (props) =>{
    
    let content = 
        `# Converting a CMV post into a WATT article
        \n\n## Choosing the perspective
        \n\nYou don’t need to box yourself in to the typical “conservative” or “liberal” perspective (unless you want to). Too often the sides of an argument boil down to these two sides, try to move beyond that. Think about your background and what gives you a unique outlook on this particular issue.  
        \n\nSome general areas to choose from:
        \n\n* What generation are you a part of? 
        \n\n* What part of the world did you grow up in?
        \n\n* What major world events did you witness?
        \n\n## Choosing the issue
        \n\nThis should be more straightforward. What’s the issue you discussed in your CMV?
        \n\n## Writing the article
        \n\nThere are three sections that need to be filled out:
        \n\n### 1. Where I’m coming from
        \n\nExpand on your chosen perspective. What gives you a unique insight on this issue? It could be about your job, your upbringing, your nationality, or really anything. Many CMV posts already include something like this.  Think about why you wanted to write this CMV in the first place.
        \n\n### 2. My perspective
        \n\nThis should be more straightforward and you should be able to use a lot of your original CMV here. If you learned something from the discussion or if you awarded any Delta’s, then you should incorporate some of that thinking into this section.
        \n\n### 3. What I took away from the discussion
        \n\nWhat did you get out of discussing these issues on CMV? What were you suprised by?
        \n\n
        \n\n
        \n\n
        \n\nHave more questions? You can reach us [@projectwatt](http://twitter.com/projectwatt) on twitter or send us an email to writing@projectwatt.com 
        `
    
    return(
        <div className="howContainer">
            <NavBar></NavBar>
            <ReactMarkdown className="content" source={content}></ReactMarkdown>
        </div>
    )
}

export default WritingGuide;