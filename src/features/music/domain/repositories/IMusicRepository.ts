import Artist from "../../data/entities/Artist";
import Song from "../../data/entities/Song";

export const ARTISTS_KEY: string = 'ARTISTS';
export const SONGS_KEY: string = 'SONGS';

interface IMusicRepository {
    fetchArtists(): Promise<Artist[]>;
    fetchSongs(artistName: string): Promise<Song[]>;
}

export default IMusicRepository;
