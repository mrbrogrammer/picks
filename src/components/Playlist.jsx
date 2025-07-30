import React, { Component } from 'react';
import '../App.css';


// Inline style for the counter text
let defaultStyle = {
    color: '#fff'
};


class Playlist extends Component {
    render() {
        let playlist = this.props.playlist
        console.log(playlist);
        return (
            <div style={{...defaultStyle, width: '25%', display: 'inline-block', margin: '10px'}}>
                <img src={playlist.img ? playlist.img.url : ''} alt="" style={{width: '160px'}}/>
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


export default Playlist;