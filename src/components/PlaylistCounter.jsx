
/**
 * PlaylistCounter Component
 *
 * @description
 *   A React component that displays the total number of playlists provided via props. It renders a styled counter showing the count of playlists in a visually prominent way.
 *
 * @component
 *
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.playlists - An array of playlist objects. The length of this array determines the number displayed.
 *
 * @returns {JSX.Element} A styled div containing the number of playlists.
 *
 * @example
 * // Example usage in a parent component:
 * <PlaylistCounter playlists={[{name: 'Playlist 1'}, {name: 'Playlist 2'}]} />
 *
 * @notes
 * - If the `playlists` prop is undefined or not an array, accessing `playlists.length` will throw an error. Ensure the prop is always an array (can be empty).
 * - The component does not validate the contents of the playlist objects; it only counts the array length.
 * - No exceptions are thrown by this component itself, but improper prop types may cause runtime errors.
 */
import React, { Component } from 'react';
import '../App.css';


// Inline style for the counter text
let defaultStyle = {
    color: '#fff'
};


class PlaylistCounter extends Component {
    render() {
        // Defensive: If playlists is not provided, default to empty array to avoid errors
        const playlists = Array.isArray(this.props.playlists) ? this.props.playlists : [];
        let PlaylistCounterStyle = {
            ...defaultStyle,
            width: '40%',
            display: 'inline-block',
            fontSize: '22px',
            lineHeight: '30px',
            marginBottom: '10px'
        };

        return (
            <div style={PlaylistCounterStyle}>
                <h2>{playlists.length} Playlists</h2>
            </div>
        );
    }
}

export default PlaylistCounter;