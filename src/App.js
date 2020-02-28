import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
  color: '#fff'
};

// declared variable, has a user that holds parameter (name)
let fakeServerData = {
  user: {
    name: 'Luka',
    playlists: [
      {
        name: 'Liked Songs',
        songs: [
          {name: 'Lucky', duration: 30000},
					{name: 'Caged Bird', duration: 30000},
					{name: 'Nights', duration: 40000}, 
         	{name: 'Herside Story', duration: 30000},
          {name: 'Dark & Handsome', duration: 20000}
        ]
      },
      {
        name: 'Discover Weekly',
        songs: [
					{name: 'Rari', duration: 20000},
					{name: 'Speaking Sonar', duration: 30000},
					{name: 'Carefree', duration: 30000},
					{name: 'Childism', duration: 40000},
					{name: 'Loose Ends', duration: 30000}
        ]
      },
      {
        name: 'Daily Mix',
        songs: [
					{name: 'Bliss City', duration: 30000},
          {name: 'Tadow', duration: 50000},
          {name: 'Drift', duration: 40000}, 
          {name: 'I Want You Around', duration: 30000},
          {name: 'Faces + Places', duration: 40000}
        ]
      },
      {
        name: 'Recently Played',
        songs: [
					{name: 'Chewing Gum', duration: 20000},
       	  {name: 'Cooks', duration: 30000},
     	    {name: 'Free Spirit', duration: 40000},
          {name: 'CPR', duration: 30000},
          {name: 'Vent', duration: 30000}
        ]
      },
    ]
  }
};

class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: '40%', display: 'inline-block', fontSize: '22px'}}>
        <h2>{this.props.playlists.length} Playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
		let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
			return songs.concat(eachPlaylist.songs)
		}, [])
		let totalDuration  = allSongs.reduce((sum, eachSong) => {
			return sum + eachSong.duration
		}, 0)

		return (
			<div style={{...defaultStyle, width: '40%', display: 'inline-block', fontSize: '22px'}}>
				<h2>{Math.round(totalDuration/1000)} Hours</h2>
			</div>
    );
  }
}
		
class Filter extends Component {
  render() {
    return (
      <div style={defaultStyle}>
				<img/>
				<input type="text" onKeyUp={event => 
					this.props.onTextChange(event.target.value)}/>
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
		let playlist = this.props.playlist
    return (
      <div style={{...defaultStyle, width: '25%', display: 'inline-block', margin: '10px'}}>
        <h3 style={{...defaultStyle, fontSize: '22px'}}>{playlist.name}</h3>
        <ul>
					{playlist.songs.map(song =>
						<li>{song.name}</li>
					)}
				</ul>
      </div>
    );
  }
}

/* an object literal = {} */

class App extends Component {
  constructor() {
    super();
    this.state = {
			serverData: {},
			filterString: ''
		}
  }

  componentDidMount() {
    setTimeout(() => {
    this.setState({serverData: fakeServerData});
    }, 1000);
  }

	// boolean amppecent operator

  render() {
		/*
		* let playlistElements = []
		* if (this.state.serverData.user) {
		*	this.state.serverData.user.playlists.forEach(playlist =>
		*		playlistElements.push(<Playlist playlist={playlist} />) 
		*	)
	 	* } 
		*/

    return (
      <div className="App">
        {this.state.serverData.user ?
        <div>
          <h1 style={{...defaultStyle, fontSize: '54px'}}>
            {this.state.serverData.user.name}'s Playlists
          </h1>
          <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
          <HoursCounter playlists={this.state.serverData.user.playlists}/>
  			  <Filter onTextChange={text => {
							this.setState({filterString: text})
						}}/>				
					{this.state.serverData.user.playlists.filter(playlist =>
						playlist.name.toLowerCase().includes(
						this.state.filterString.toLowerCase())
					).map(playlist =>
						<Playlist playlist={playlist} />
					)}
				</div> : <h1 style={defaultStyle}>Loading...</h1>
				} 
    	</div>
    );
  }
/* we are call the class "Plays" into the main render */
}


					/*	{this.state.serverData.user.playlists.map(playlist =>
						<Playlist name={playlist.name} />
					)} this map() does the same function as the for loop */
export default App;
