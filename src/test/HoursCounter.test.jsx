import { render, screen } from '@testing-library/react';
import HoursCounter from '../components/HoursCounter';

describe('HoursCounter Component', () => {
    const playlists = [
        { name: 'Playlist 1', songs: [{ name: 'Song 1', duration: 3600 }, { name: 'Song 2', duration: 7200 }] },
        { name: 'Playlist 2', songs: [{ name: 'Song 3', duration: 1800 }] }
    ];

    it('renders correctly with no playlists', () => {
        const result = render(<HoursCounter playlists={[]} />);
        
        expect(result).toMatchSnapshot();
    });

    it('renders correctly with playlists containing songs', () => {
        const result = render(<HoursCounter playlists={playlists} />);
        expect(result).toMatchSnapshot();
    });

    it('calculates total hours correctly', () => {
        const result = render(<HoursCounter playlists={playlists} />);
        expect(result.container.textContent).toBe('13 Hours');
    });
});