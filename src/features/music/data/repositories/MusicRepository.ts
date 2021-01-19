import IMusicRepository, {ARTISTS_KEY, SONGS_KEY} from "../../domain/repositories/IMusicRepository";
import Artist from "../entities/Artist";
import Song from "../entities/Song";
import IDataStorage from "../../../../core/storage/IDataStorage";
import DataStorage from "../../../../core/storage/DataStorage";
import WebServiceError from "../../../../core/errors/WebServiceError";
import IHttpClient from "../../../../core/http/IHttpClient";
import HttpClient from "../../../../core/http/HttpClient";

class MusicRepository implements IMusicRepository {

    private storage: IDataStorage;
    private client: IHttpClient;

    constructor(storage: IDataStorage = new DataStorage(), client: IHttpClient = new HttpClient()) {
        this.storage = storage;
        this.client = client;
    }

    async fetchArtists(): Promise<Artist[]> {
        const localArtists: Artist[] | null = this.storage.getItem(ARTISTS_KEY);

        ///If we already have the artists stored locally, we do not need to call a webservice.
        if (localArtists !== null && localArtists.length) {
            return localArtists;
        }

        const response = await this.client.fetch('artists').catch();
        const { data, status } = response;

        if (status === 200 && data !== null) {
            return data as Artist[];
        }

        throw new WebServiceError(status);
    }

    async fetchSongs(artistName: string): Promise<Song[]> {
        let localSongs: {[key: string]: Song[]} | null = this.storage.getItem(SONGS_KEY);
        if (localSongs === null) {
            localSongs = {};
        }

        const safeArtistName = artistName.trim().toLowerCase();

        ///If we already have the songs stored locally, we do not need to call a webservice.
        if (localSongs[safeArtistName] !== undefined && localSongs[safeArtistName].length > 0) {
            return localSongs[safeArtistName];
        }

        const response = await this.client.fetch('songs', {artist: artistName})
            .catch((_) => {});

        if (response) {
            const {data, status} = response;

            if (status === 200 && data !== null) {
                localSongs[safeArtistName] = data;
                this.storage.setItem(SONGS_KEY, localSongs);
                return data as Song[];
            }

            throw new WebServiceError(status);
        }

        throw new WebServiceError(500);
    }

}

export default MusicRepository;
