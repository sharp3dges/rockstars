import BlocConsumer from "../../../../core/bloc/BlocConsumer";
import SpotifyBloc, {SpotifyState} from "../bloc/SpotifyBloc";
import Spinner from "../../../../core/view/spinner/Spinner";
import React, {useContext, useEffect} from "react";
import {useLocation} from "react-router-dom";
import BlocProvider from "../../../../core/bloc/BlocProvider";
import BlocRegistry from "../../../../core/bloc/BlocRegistry";

type Props = {
    children: React.ReactNode;
};

const SpotifyLoginGuard = ({children}: Props) => {
    const location = useLocation();
    const hash = location.hash;

    let accessToken: string | null = null;
    if (hash) {
        const match = hash.match(/access_token=([^&]+)/g);
        if (match && match.length > 0) {
            accessToken = match[0].replace(/access_token=/g, '');
        }
    }

    const context = useContext(BlocRegistry);
    const spotifyBloc = BlocProvider.of<SpotifyBloc, SpotifyState>(context, 'SpotifyBloc');

    useEffect(() => {
        if (spotifyBloc) {
            if (accessToken) {
                spotifyBloc.storeAccessToken(accessToken);
            } else {
                spotifyBloc.login();
            }
        }
    }, [spotifyBloc, accessToken]);

    return (
        <BlocConsumer builder={(bloc: SpotifyBloc, state: SpotifyState) => {
            const {loading, token} = state;
            if (loading || !token) {
                return (<Spinner/>);
            }
            return children;

        }} type="SpotifyBloc"/>
    );
};

export default SpotifyLoginGuard;
