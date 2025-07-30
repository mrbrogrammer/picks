import React, { Component } from 'react';
import '../App.css';


// Inline style for the counter text
let defaultStyle = {
    color: '#fff'
};


class Playlist extends Component {
    render() {
        let playlist = this.props.playlist
        let index = this.props.index;

        return (
            <div style={{...defaultStyle, backgroundColor: index % 2 ? '#C0C0C0' : '#808080', width: '25%', display: 'inline-block', margin: '10px', padding: '10px'}}>
                <img src={playlist.img ? playlist.img.url : ''} alt="" style={{width: '60px'}}/>
                <h3 style={{...defaultStyle, fontSize: '22px'}}>{playlist.name}</h3>
                <ul style={{marginTop: '10px', fontWeight: 'bold'}}>
                    {playlist.songs.map(song =>
                        <li style={{paddingTop: '2px'}}>{song.name}</li>
                    )}
                </ul>
            </div>
        );
    }
}


export default Playlist;