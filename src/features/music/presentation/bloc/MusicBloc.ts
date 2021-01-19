import Bloc, {IBlocState} from "../../../../core/bloc/Bloc";
import Artist from "../../data/entities/Artist";
import Song from "../../data/entities/Song";
import IMusicRepository from "../../domain/repositories/IMusicRepository";
import MusicRepository from "../../data/repositories/MusicRepository";
import chunkArray from "../../domain/useCases/chunkArray";

export class MusicState implements IBlocState {
    artists: Artist[];
    songs: Song[];
    filter: string;
    filteredArtists: Artist[];
    chunks: Artist[][];
    currentPage: number;
    selectedArtist: Artist | null;
    loading: boolean;
    error: Error | null;

    constructor(
        artists: Artist[] = [],
        songs: Song[] = [],
        filter: string = '',
        filteredArtists = [],
        chunks: Artist[][] = [],
        currentPage: number = 0,
        selectedArtist: Artist | null = null,
        loading: boolean = false,
        error: Error | null = null,
    ) {
        this.artists = artists;
        this.songs = songs;
        this.filter = filter;
        this.filteredArtists = filteredArtists;
        this.chunks = chunks;
        this.currentPage = currentPage;
        this.selectedArtist = selectedArtist;
        this.loading = loading;
        this.error = error;
    }
}

class MusicBloc extends Bloc<MusicState> {
    type: string = "MusicBloc";

    private repo: IMusicRepository;

    constructor(initialState: MusicState = new MusicState(), repo: IMusicRepository = new MusicRepository()) {
        super(initialState);
        this.repo = repo;
    }

    setFilter(filter: string) {
        const state = this.state();
        if (state.artists.length === 0) {
            return;
        }

        let filteredArtists = [...state.artists];
        if (filter.length !== 0) {
            const loweredFilter = filter.toLowerCase();
            filteredArtists = filteredArtists.filter((artist) =>
                artist.name.toLowerCase().includes(loweredFilter)
            );
        }

        const currentPage = 0;
        const chunks = chunkArray(filteredArtists, 100);
        filteredArtists = chunks[currentPage];

        this.nextState({...this.state(), filter, filteredArtists, currentPage, chunks});
    }

    setCurrentPage(to: number) {
        const {chunks} = this.state();
        if (to < chunks.length) {
            this.nextState({...this.state(), currentPage: to, filteredArtists: chunks[to]});
        }
    }

    async fetchArtists(): Promise<void> {
        const state = this.state();

        this.nextState({...state, loading: true});
        try {
            const artists = await this.repo.fetchArtists();
            this.nextState({...state, artists, loading: false});
            this.setFilter(state.filter);
        } catch (e) {
            this.nextError(e);
        }
    }

    getArtistById(id: number): Artist | null {
        const state = this.state();
        const { artists } = state;

        const artist = artists.find((artist) => artist.id === id);

        if (!artist) {
            if (artists.length === 0 && !state.loading) {
                this.fetchArtists();
            }
            return null;
        }

        return artist;
    }

    async fetchSongs(artistId: number): Promise<void> {
        await this.fetchArtists();

        const state = this.state();

        const artistName: string | undefined = state.artists.find((artist) => artist.id === artistId)?.name;
        if (artistName === undefined) {
            this.nextError(new Error(`No Artist found with id: ${artistId}.`));
            return;
        }

        this.nextState({...state, loading: true});
        try {
            const songs = await this.repo.fetchSongs(artistName);
            this.nextState({...state, songs, loading: false});
        } catch (e) {
            this.nextError(e);
        }
    }

    async clearSongs(): Promise<void> {
        this.nextState({...this.state(), songs: []});
    }
}

export default MusicBloc;
