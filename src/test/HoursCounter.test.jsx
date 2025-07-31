import { render } from '@testing-library/react';
import HoursCounter from '../components/HoursCounter';

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
});