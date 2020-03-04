import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string' ;

let defaultStyle = {
  color: '#fff'
};

/* declared variable, has a user that holds parameter (name) */
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
				<img alt=""/>
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
        <img src={playlist.imageUrl} alt="" style={{width: '160px'}}/>
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
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then((response) => response.json())
    .then(data => this.setState({
      user: {
        name: data.display_name
      }
    }))
    
    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then((response) => response.json())
    .then(data => this.setState({
      playlists: data.items.map(item => {
        console.log(data.items)
        return {
          name: item.name,
          imageUrl: item.images.find(image => image.width = 60).url,
          songs: []
        }
      })
    }))
  }

  /* when you using the arrow function like this and you returning an 
   * object literall, the javascript intepretor gets confused because
   * it doesn't know if you want to start the arrow with multipule lines
   * or you trying to return an object. + parens around the curlys
  */
	/* boolean amppecent operator */

  render() {
		/*
		* let playlistElements = []
		* if (this.state.serverData.user) {
		*	this.state.serverData.user.playlists.forEach(playlist =>
		*		playlistElements.push(<Playlist playlist={playlist} />) 
		*	)
	 	* } 
    */
    let playlistToRender =
      this.state.user && 
      this.state.playlists 
      ? this.state.playlists.filter(playlist =>
        playlist.name.toLowerCase().includes(
          this.state.filterString.toLowerCase()))
      : []

    return (
      <div className="App">
        {this.state.user ?
        <div>
          <h1 style={{...defaultStyle, fontSize: '54px'}}>
            {this.state.user.name}'s Playlists
          </h1>
          <PlaylistCounter playlists={playlistToRender}/>
          <HoursCounter playlists={playlistToRender}/>
          <Filter onTextChange={text => {
              this.setState({filterString: text})
            }}/>			
          {playlistToRender.map(playlist =>
            <Playlist playlist={playlist} />
          )}
        </div> : <button onClick={() => window.location='https://picksbackend.herokuapp/login'} 
          style={{padding: '20px', fontSize: '58px', marginTop: '20px'}}>Sign in with Spotify</button>
        } 
      </div>
    );
  }
/* we are call the class "Plays" into the main render */
}


/* {this.state.serverData.user.playlists.map(playlist =>
 * <Playlist name={playlist.name} />
 * )} this map() does the same function as the for loop 
 */
export default App;
