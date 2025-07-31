import { render } from '@testing-library/react';
import HoursCounter from '../components/HoursCounter';

/**
 * 1. Clarity: The test should clearly state what behavior it is verifying.
 * 2. Isolation: Each test should check one thing (e.g., rendering, calculation, style).
 * 3. Precision: Use assertions that check the actual output, not just snapshots.
 * 4. Edge Cases: Test with empty, minimal, and maximal data.
 * 5. Maintainability: The test should be easy to update if the component changes.
 */


describe('Test hoursCounter Component', () => {
    const playlists = [
        { 
            name: 'Playlist 1', 
            songs: [
                {name: 'Song 1', duration: 3600 },
                { name: 'Song 2', duration: 7200 }
            ] 
        },


        {
            name: 'Playlist 2',
            songs: [
                { name: 'Song 3', duration: 1800 }
            ] 
        }
    ];

    it('Shouold render correctly with no playlists', () => {
        const result = render(<HoursCounter playlists={[]} />);

        expect(result).toMatchSnapshot();
    });

    it('Should render correctly with playlists containing songs', () => {
        const result = render(<HoursCounter playlists={playlists} />);
        expect(result).toMatchSnapshot();
    });

    it('Should calculate total hours correctly', () => {
        const result = render(<HoursCounter playlists={playlists} />);
        expect(result.container.textContent).toBe('13 Hours');
    });

    it('Should display the correct color and text for less than 1 hour', () => {
        // Only 30 seconds total (less than 1 minute)
        const shortPlaylists = [
            { name: 'Short', songs: [{ name: 'Tiny', duration: 3 }] }
        ];

        const { getByText } = render(<HoursCounter playlists={shortPlaylists} />);
        // Check text
        expect(getByText('0 Hours')).toBeInTheDocument();
        // Check style (Should be red and bold)
        const div = getByText('0 Hours').closest('div');
        expect(div).toHaveStyle('color: red');
        expect(div).toHaveStyle('fontWeight: bold');
    });


    it('Should display the correct color and text for more than 1 hour', () => {
        // Only 30 seconds total (less than 1 minute)
        const shortPlaylists = [
            { name: 'Short', songs: [{ name: 'Tiny', duration: 3000 }] }
        ];

        const { getByText } = render(<HoursCounter playlists={shortPlaylists} />);
        // Check text
        expect(getByText('3 Hours')).toBeInTheDocument();
        // Check style (Should be white)
        const div = getByText('3 Hours').closest('div');
        expect(div).toHaveStyle('color: white');
    });
});