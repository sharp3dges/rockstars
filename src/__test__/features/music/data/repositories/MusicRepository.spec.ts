import MockDataStorage from "../../../../core/storage/MockDataStorage";
import MusicRepository from "../../../../../features/music/data/repositories/MusicRepository";
import MockHttpClient from "../../../../core/http/MockHttpClient";
import artistsResponse from '../../mock/mockArtists.json';
import songsResponse from '../../mock/mockSongs.json';
import {ARTISTS_KEY, SONGS_KEY} from "../../../../../features/music/domain/repositories/IMusicRepository";
import WebServiceError from "../../../../../core/errors/WebServiceError";

describe('MusicRepository', () => {
    let storage: MockDataStorage | undefined;
    let client: MockHttpClient | undefined;
    let repo: MusicRepository | undefined;

    beforeEach(() => {
        storage = new MockDataStorage();
        client = new MockHttpClient();
        repo = new MusicRepository(storage, client);
    });

    test('should perform a fetch on the artists endpoint when no storage is available', async () => {
        client?.setupResponse({ data: artistsResponse, status: 200, statusText: 'Ok', headers: {}, config: {} }, 'artists');
        const artists = await repo?.fetchArtists();
        expect(artists).toEqual(artistsResponse);
    });

    test('should return stored artist values when storage is available', async () => {
        storage?.setItem(ARTISTS_KEY, artistsResponse);
        const artists = await repo?.fetchArtists();
        expect(artists).toEqual(artistsResponse);
    });

    test('should throw an exception on server error fetching artists', async () => {
        client?.setupResponse(new WebServiceError(500), 'artists');
        let error: Error | null = null;
        try {
            await repo?.fetchArtists();
        } catch (e) {
            error = e;
        }
        expect(error).not.toBeNull();
    });

    test('should perform a fetch on the songs endpoint when no storage is available', async () => {
        client?.setupResponse({ data: songsResponse, status: 200, statusText: 'Ok', headers: {}, config: {} }, 'songs');
        const songs = await repo?.fetchSongs('30 Seconds to Mars');
        expect(songs).toEqual(songsResponse);
    });

    test('should return stored song values when storage is available', async () => {
        storage?.setItem(SONGS_KEY, {'30 seconds to mars': songsResponse});
        const songs = await repo?.fetchSongs('30 Seconds to Mars');
        expect(songs).toEqual(songsResponse);
    });

    test('should throw an exception on server error fetching songs', async () => {
        client?.setupResponse(new WebServiceError(500), 'songs');
        let error: Error | null = null;
        try {
            await repo?.fetchSongs('30 Seconds to Mars');
        } catch (e) {
            error = e;
        }
        expect(error).not.toBeNull();
    });

});
