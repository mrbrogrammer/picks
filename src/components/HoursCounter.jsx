
/**
 * HoursCounter Component
 *
 * @description
 *   Displays the total duration (in hours) of all songs across all provided playlists. It sums the durations of all songs and renders the result, rounded to the nearest hour.
 *
 * @component
 *
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.playlists - An array of playlist objects. Each playlist should have a `songs` property, which is an array of song objects with a `duration` property (in seconds).
 *
 * @returns {JSX.Element} A styled div showing the total hours of music in the playlists.
 *
 * @example
 * // Example usage in a parent component:
 * <HoursCounter playlists={[
 *   { name: 'Playlist 1', songs: [{ name: 'Song 1', duration: 180 }, { name: 'Song 2', duration: 200 }] },
 *   { name: 'Playlist 2', songs: [{ name: 'Song 3', duration: 240 }] }
 * ]} />
 *
 * @notes
 * - If `playlists` is not an array or is empty, the component will display 0 hours.
 * - Each song object must have a numeric `duration` property (in seconds). If missing or not a number, it may cause NaN results.
 * - No exceptions are thrown by this component itself, but improper prop types may cause runtime errors.
 */
import React, { Component } from 'react';
import '../App.css';



// Inline style for the counter text
let defaultStyle = {
    color: '#fff'
};


class HoursCounter extends Component {
    render() {
        // Defensive: If playlists is not provided, default to empty array to avoid errors
        const playlists = Array.isArray(this.props.playlists) ? this.props.playlists : [];
        // Flatten all songs from all playlists
        let allSongs = playlists.reduce((songs, eachPlaylist) => {
            return songs.concat(eachPlaylist.songs)
        }, [])
        // Sum durations (in seconds)
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


export default HoursCounter;
