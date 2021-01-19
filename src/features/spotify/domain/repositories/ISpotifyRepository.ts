export const SPOTIFY_TOKEN: string = 'SPOTIFY_TOKEN';

interface ISpotifyRepository {
    login(): Promise<string|null>;
    storeAccessToken(token: string): Promise<void>;
    removeAccessToken(): Promise<void>;
}

export default ISpotifyRepository;
