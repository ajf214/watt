import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './autosuggest.css';
import Autosuggest from 'react-autosuggest';
import { createStore } from 'redux';


const reducer = function(state, action){
  if(action.type == "INC"){
    return state+action.payload;
  }
  if(action.type == "DEC"){
    return state-action.payload;
  }
  else{
    return state;
  }
}

const store = createStore(reducer, 0);

store.subscribe(() => {
  console.log("store changed", store.getState())
})

//payload could be called anything, but type must be type
store.dispatch({type: "INC", payload: 1})
store.dispatch({type: "INC", payload: 2})
store.dispatch({type: "INC", payload: 22})
store.dispatch({type: "INC", payload: 1})
store.dispatch({type: "INC", payload: 1})
store.dispatch({type: "DEC", payload: 1000})


/*
const people = [
  {
    first: 'Charlie',
    last: 'Brown',
    twitter: 'dancounsell'
  },
  {
    first: 'Charlotte',
    last: 'White',
    twitter: 'mtnmissy'
  },
  {
    first: 'Chloe',
    last: 'Jones',
    twitter: 'ladylexy'
  },
  {
    first: 'Cooper',
    last: 'King',
    twitter: 'steveodom'
  }
];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('\\b' + escapedValue, 'i');
  
  return people.filter(person => regex.test(getSuggestionValue(person)));
}

function getSuggestionValue(suggestion) {
  return `${suggestion.first} ${suggestion.last}`;
}

function renderSuggestion(suggestion, { query }) {
  const suggestionText = `${suggestion.first} ${suggestion.last}`;

  var AutosuggestHighlightMatch = require('autosuggest-highlight/match');
  var AutosuggestHighlightParse = require('autosuggest-highlight/parse');

  const matches = AutosuggestHighlightMatch(suggestionText, query);
  const parts = AutosuggestHighlightParse(suggestionText, matches);

  return (
    <span className={'suggestion-content ' + suggestion.twitter}>
      <span className="name">
        {
          parts.map((part, index) => {
            const className = part.highlight ? 'highlight' : null;

            return (
              <span className={className} key={index}>{part.text}</span>
            );
          })
        }
      </span>
    </span>
  );
}
*/

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };    
  }

  /*
  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  */

  render() {
    /*
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Type 'c'",
      value,
      onChange: this.onChange
    };
    */

    return (
      <div> </div>
      /*
      <Autosuggest 
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps} />
      */
      );
  }
}

export default App;