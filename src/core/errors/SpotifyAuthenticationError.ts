class SpotifyAuthenticationError extends Error {
    constructor() { super('Failed to authorize with Spotify. Check your credentials')};
}

export default SpotifyAuthenticationError;
