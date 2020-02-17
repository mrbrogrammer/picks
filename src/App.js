import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
  color: '#fff'
};

class Plays extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2 style={{...defaultStyle, 'font-size': '36px'}}>Number Text</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div>
        <img alt=" "/>
	<input type="text"/>
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: '25%', display: 'inline-block', margin: '10px'}}>
        <img alt=" "/>
        <h3 style={{...defaultStyle, 'font-size': '22px'}}>Playlist Name</h3>
        <ul><li>Song 1</li><li>Song 2</li><li>Song 3</li></ul>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 style={{...defaultStyle, 'font-size': '54px'}}>Title</h1>
        <Plays/> 
        <Plays/>
	<Filter/>
	<Playlist/>
	<Playlist/>
	<Playlist/>
      </div>
    );
  }
/* we are call the class "Plays" into the main render */
}

export default App;
