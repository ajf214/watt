import React, { Component } from 'react'

/*
    This isn't in use yet, but eventually this should be the main component for the filter control
*/

class FilterControl extends Component{

    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentWillMount(){

    }

    render(){
        return(
            <div>
                <form>
                    <label> Choose a filter: 
                        <select value = {this.state.filterValue} onChange = {this.handleChange.bind(this)}>
                            <option value="None">Filter ideology</option>
                            {
                                this.state.paragraphs.map(paragraph => <option key={paragraph.id} value={paragraph.filter}>{paragraph.filter}</option>)
                            }
                        </select>
                    </label>
                </form>
            </div>
        );
    }

}

export default FilterControl;