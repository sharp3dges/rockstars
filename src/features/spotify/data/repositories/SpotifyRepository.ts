import ISpotifyRepository, {SPOTIFY_TOKEN} from "../../domain/repositories/ISpotifyRepository";
import IDataStorage from "../../../../core/storage/IDataStorage";
import DataStorage from "../../../../core/storage/DataStorage";
import IHttpClient from "../../../../core/http/IHttpClient";
import HttpClient from "../../../../core/http/HttpClient";

class SpotifyRepository implements ISpotifyRepository {
    storage: IDataStorage;
    client: IHttpClient;

    constructor(storage: IDataStorage = new DataStorage(), client: IHttpClient = new HttpClient('https://api.spotify.com/v1/me')) {
        this.storage = storage;
        this.client = client;
    }

    async login(): Promise<string|null> {

        const storedToken: string | null = this.storage.getItem(SPOTIFY_TOKEN);
        if (storedToken) {
            this.client.addDefaultRequestParam('Authorization', `Bearer ${storedToken}`);
            return storedToken;
        }

        const client_id = 'dd9576d95da74f46b10f49de60f879fb';
        const { protocol, hostname, port } = window.location;
        const redirect_uri = `${protocol}://${hostname}:${port}/callback`;


        console.log(window.location.protocol);

        const state = SpotifyRepository.generateRandomString(16);
        const scope = 'user-read-private user-read-email playlist-read-private';

        let url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(client_id);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
        url += '&state=' + encodeURIComponent(state);

        window.location.href = url;

        return null;
    }

    async storeAccessToken(token: string): Promise<void> {
        this.client.addDefaultRequestParam('Authorization', `Bearer ${token}`);
        this.storage.setItem(SPOTIFY_TOKEN, token);
    }

    async removeAccessToken(): Promise<void> {
        this.storage.removeItem(SPOTIFY_TOKEN);
        this.client.clearDefaultRequestParams();
    }

    static generateRandomString(length: number): string {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
}

export default SpotifyRepository;
