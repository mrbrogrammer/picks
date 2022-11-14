import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string' ;

let signInButton = {
	width: '400px',
 padding: '10px 20px',
	backgroundColor: 'transparent',
 color: '#fff',
 border: 'solid 2px',
	borderColor: '#fff',
	fontWeight: 'bold',
	fontSize: '1rem',
 marginTop: '20px',
 borderRadius: '100px'
};

let defaultParagraph = {
	fontSize: '0.8rem',
	textAlign: 'left',
	marginTop: '20px'
};

let checkbox = {
	marginTop: '8px',
	marginRight: '8px',
	width: '10px',
 	borderRadius: '2px',
	height: '10px',
	border: 'solid 1.5px',
	borderColor: '#eee',
	display: 'inline-block',
	position: 'relative'
};

let linkTo = {
	color: '#fff',
	 textDecoration: 'none'
};

let defaultStyle = {
	color: '#fff'
};

/* declared variable, has a user that holds parameter (name) */

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
		if (!accessToken)
			return;
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
		}).then(response => response.json())
    .then(playlistData => {
			let playlists = playlistData.items
			let trackDataPromises = playlists.map(playlist => {
				let responsePromise = fetch(playlist.tracks.href, {
					headers: {'Authorization': 'Bearer ' + accessToken}
				})
				let trackDataPromise = responsePromise
					.then(response => response.json())
				return trackDataPromise
			})
			let allTracksDataPromises = 
        Promise.all(trackDataPromises)
      let playlistsPromise = allTracksDataPromises.then(trackDatas => {
        trackDatas.forEach((trackData, i) => {
          playlists[i].trackDatas = trackData.items
          .map(item => item.track)
          .map(trackData => ({
            name: trackData.name,
            duration: trackData.duration_ms / 1000
          }))
        })
        return playlists
      })
      return playlistsPromise
    })
    .then(playlists => this.setState({
      playlists: playlists.map(item => {
        return {
          name: item.name,
	  imageUrl: item.images[0].find(image => image.width = 60).url,
          songs: item.trackDatas.slice(0,3)
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
      ? this.state.playlists.filter(playlist => {
        let matchesPlaylist = playlist.name.toLowerCase().includes(
          this.state.filterString.toLowerCase())
        let matchesSong = playlist.songs.find(song => song.name.toLowerCase()
          .includes(this.state.filterString.toLowerCase()))
        return matchesPlaylist || matchesSong
      }) : []

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
        </div> 
				:	<div style={{...defaultStyle, marginLeft: '35%', marginRight: '35%', marginTop: '200px'}}>
						<img alt="" style={{width: '100px', marginBottom: '30px'}} src='logo192.png'/>
						<p style={{...defaultParagraph}}>
							BetterPicks is a web application that displays all your Spotify playlists.
							For the app to work effectively,
							the user should already have a Spotify account set up with desired playlists.</p> 
						<button className="signInButton" onClick={() => { 
            window.location = window.location.href.includes('localhost') 
              ? 'https://localhost:3000/login'
              : 'https://picksbackend.herokuapp.com/login'}
        	}
          style={{...signInButton}}>Sign in with Spotify
						</button>
						<p style={defaultParagraph}>
							<div style={checkbox}>
							</div>
							By signing in you accept the <a style={linkTo} href='#'>Terms & Conditions</a></p> 
					</div>
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
