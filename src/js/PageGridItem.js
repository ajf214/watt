import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import '../css/PageGridItem.css'

class PageGridItem extends Component{
    render(){
        return(
            <div className="pageGridWrapper">
                <p>{"/u/" + this.props.author}</p>
                {this.props.id === "whatThisIs" ? <Link to="how-this-works">{this.props.title}</Link> : <Link to={`pagesv2/${this.props.id}`}>{this.props.title}</Link>}
                <h3>{this.props.subtitle}</h3>
                {/* highlights, comments would go here */}
            </div>
        )
    }
} export default PageGridItem;