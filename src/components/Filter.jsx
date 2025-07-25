
/**
 * Filter Component
 *
 * @description
 *   A React component that renders a text input for filtering playlists or songs. It calls a callback function whenever the user types in the input, passing the current value to the parent component for filtering logic.
 *
 * @component
 *
 * @param {Object} props - The component props.
 * @param {function} props.onTextChange - Callback function called with the input value whenever the user types in the filter box.
 *
 * @returns {JSX.Element} A styled div containing a text input for filtering.
 *
 * @example
 * // Example usage in a parent component:
 * <Filter onTextChange={value => setFilterString(value)} />
 *
 * @notes
 * - The component does not manage its own state; it relies on the parent to handle the filter value.
 * - If `onTextChange` is not provided or not a function, typing in the input will throw an error.
 * - The input is not debounced; every keyup event triggers the callback.
 */
import React, { Component } from 'react';
import '../App.css';



// Inline style for the filter input
let defaultStyle = {
    color: '#fff'
};



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

export default Filter;
