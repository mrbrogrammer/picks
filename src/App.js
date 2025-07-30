import React, { Component } from 'react';
import queryString from 'query-string';
import PlaylistCounter from './components/PlaylistCounter'
import HoursCounter from './components/HoursCounter';
import Filter from './components/Filter';
import Playlist from './components/Playlist';


let defaultParagraph = {
	fontSize: '0.8rem',
	width: '100%',
	padding: '30px',
	textAlign: 'center',
	marginTop: '0px'
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


class App extends Component {
    constructor() {
        super();
        // Initialize state: serverData is unused, filterString is for search input
        this.state = {
            serverData: {},
            filterString: ''
        }

        // window.location = window.location.href.includes('localhost') 
        // ? 'http://localhost:8888/login'
        // : 'https://mypicksbackend-5fe787abe3ab.herokuapp.com/login'
    }

    componentDidMount() {
        // Parse access token from URL
        let parsed = queryString.parse(window.location.search);
        let accessToken = parsed.access_token;
        if (!accessToken)
            return window.location = window.location.href.includes('localhost') 
                    ? 'http://localhost:8888/login'
                    : 'https://mypicksbackend-5fe787abe3ab.herokuapp.com/login';
                     // Not authenticated, show sign-in

        // Fetch user profile
        fetch('https://api.spotify.com/v1/me', {
            headers: {'Authorization': 'Bearer ' + accessToken}
        }).then((response) => response.json())
        .then(data => this.setState({
            user: {
                name: data.display_name
            }
        }))
        
        // Fetch playlists
        fetch('https://api.spotify.com/v1/me/playlists', {
            headers: {'Authorization': 'Bearer ' + accessToken}
        }).then(response => response.json())
        .then(playlistData => {
            let playlists = playlistData.items

            console.log(playlists);

            // For each playlist, fetch its tracks
            let trackDataPromises = playlists.map(playlist => {
                let responsePromise = fetch(playlist.tracks.href, {
                    headers: {'Authorization': 'Bearer ' + accessToken}
                })
                let trackDataPromise = responsePromise
                    .then(response => response.json())
                return trackDataPromise
            })
            // Wait for all track fetches to complete
            let allTracksDataPromises = Promise.all(trackDataPromises)
            let playlistsPromise = allTracksDataPromises.then(trackDatas => {
                trackDatas.forEach((trackData, i) => {
                    // Map each track to a simplified object
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
                // Only keep the first 3 tracks for each playlist
                return {
                    name: item.name,
                    img: item.images ? item.images[0] : '',
                    songs: item.trackDatas.slice(0,3)
                }
            })
        }))
    }

    render() {
        // Filter playlists and songs by filterString
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
            <div className="App" style={{...defaultStyle}}>
                {this.state.user ?
                    // Authenticated: show playlists and filter
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
                    </div> :
                    <div></div>

                    /* Not authenticated: show sign-in
                    <div style={{...defaultStyle, width: '100%', contentAlign: 'center', marginTop: '30px'}}>
                        <img alt="" style={{width: '100px', marginBottom: '30px'}} src='logo192.png'/>
                        <div style={{...defaultParagraph}}>
                            <p>
                                Picks is a web application that displays all your Spotify playlists.
                                For the app to work effectively,
                                the user should already have a Spotify account set up with desired playlists.
                            </p> 
                        </div>
                        <button className="signInButton" onClick={() => {
        
                            Sign in with Spotify
                        </button>
                        <p style={defaultParagraph}>
                            <div style={checkbox}></div>
                            By signing in you accept the <a style={linkTo} href='#'>Terms & Conditions</a>
                        </p> 
                    </div> */
                } 
            </div>
        );
    }
}

/* {this.state.serverData.user.playlists.map(playlist =>
 * <Playlist name={playlist.name} />
 * )} this map() does the same function as the for loop 
 */
export default App;
