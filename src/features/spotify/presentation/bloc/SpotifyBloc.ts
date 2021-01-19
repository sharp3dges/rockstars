import Bloc, {IBlocState} from "../../../../core/bloc/Bloc";
import ISpotifyRepository from "../../domain/repositories/ISpotifyRepository";
import SpotifyRepository from "../../data/repositories/SpotifyRepository";

export class SpotifyState implements IBlocState {
    loading: boolean;
    token: string | null;

    constructor(
        loading: boolean = false,
        token: string | null = null,
    ) {
        this.loading = loading;
        this.token = token;
    }
}

class SpotifyBloc extends Bloc<SpotifyState> {
    type: string = 'SpotifyBloc';

    private repo: ISpotifyRepository;
    constructor(initialState: SpotifyState = new SpotifyState(), repo: ISpotifyRepository = new SpotifyRepository()) {
        super(initialState);
        this.repo = repo;
    }

    setLoading(loading: boolean) {
        if (this.state().loading !== loading) {
            this.nextState({...this.state(), loading});
        }
    }

    async storeAccessToken(token: string) {
        this.setLoading(true);
        await this.repo.storeAccessToken(token);
        this.nextState({...this.state(), loading: false, token: token});
    }

    async removeAccessToken() {
        this.setLoading(true);
        await this.repo.removeAccessToken();
        this.nextState({...this.state(), loading: false, token: null});
    }

    async login() {
        this.setLoading(true);
        const token = await this.repo.login();
        if (token) {
            await this.storeAccessToken(token);
        }
        this.setLoading(false);
    }
}

export default SpotifyBloc;
