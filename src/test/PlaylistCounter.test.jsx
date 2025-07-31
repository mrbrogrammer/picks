import { render, screen } from '@testing-library/react';
import PlaylistCounter from '../components/PlaylistCounter';

describe('Test playlistCounter Component', () => {
    const playlists = [
        { name: 'Playlist 1' },
        { name: 'Playlist 2' }
    ];

    it('Should render correctly with no playlists', () => {
        const result = render(<PlaylistCounter playlists={[]} />);
        expect(result).toMatchSnapshot();
    });

    it('Should render correctly with playlists', () => {
        const result = render(<PlaylistCounter playlists={playlists} />);
        expect(result).toMatchSnapshot();
    });

    it('Should display the correct number of playlists', () => {
        render(<PlaylistCounter playlists={playlists} />);
        expect(screen.getByText('2 Playlists')).toBeInTheDocument();
    });
});