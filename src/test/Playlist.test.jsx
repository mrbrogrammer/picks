import { render } from '@testing-library/react';
import Playlist from '../components/Playlist';

describe('Test playlist Component', () => {
    const playlist = {
        name: 'Test Playlist',
        img: { url: 'https://example.com/image.jpg' },
        songs: [
            { name: 'Song 1' },
            { name: 'Song 2' }
        ]
    };

    it('Should render correctly with a playlist', () => {
        const result = render(<Playlist playlist={playlist} index={0} />);
        expect(result).toMatchSnapshot();
    });

    it('Should display the correct playlist name', () => {
        const { getByText } = render(<Playlist playlist={playlist} index={0} />);
        expect(getByText('Test Playlist')).toBeInTheDocument();
    });

    it('Should display the correct number of songs', () => {
        const { getAllByRole } = render(<Playlist playlist={playlist} index={0} />);
        expect(getAllByRole('listitem')).toHaveLength(2);
    });
});