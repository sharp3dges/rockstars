import React, {useContext, useEffect} from 'react';
import {useParams} from "react-router-dom";
import BlocConsumer from "../../../../core/bloc/BlocConsumer";
import MusicBloc, {MusicState} from "../bloc/MusicBloc";
import Spinner from "../../../../core/view/spinner/Spinner";
import SongView from "./SongView";
import BlocProvider from "../../../../core/bloc/BlocProvider";
import BlocRegistry from '../../../../core/bloc/BlocRegistry';
import {useHistory} from "react-router-dom";

import './SongScreen.scss';
import Header from "../../../../core/view/header/Header";
import HorizontalWrapper from "../../../../core/view/layout/HorizontalWrapper";
import ErrorView from "../../../../core/view/error/ErrorView";

const SongScreen = () => {
    const context = useContext(BlocRegistry);
    const bloc = BlocProvider.of<MusicBloc, MusicState>(context, 'MusicBloc');

    // @ts-ignore
    const {id} = useParams();
    const artistId = parseInt(id);
    const history = useHistory();

    useEffect(() => {
        if (bloc && !isNaN(artistId)) {
            bloc.fetchSongs(artistId);
        } else {
            history.replace('/');
        }
    }, [bloc, artistId, history]);

    return (
        <BlocConsumer builder={(bloc: MusicBloc, state: MusicState) => {
            const {loading, songs, error} = state;
            const artist = bloc?.getArtistById(artistId) || null;
            const subtitle = artist ? `by ${artist.name}` : null;
            return (
                <>
                    <Header title="Songs" subtitle={subtitle} canGoBack />
                    <HorizontalWrapper>
                        <div className="screen song-screen">
                            {loading
                                ? (<Spinner/>)
                                : (
                                    <div className="songs-list-view list-view">
                                        <div className="list-view-content">
                                            {songs.length
                                                ? songs.map((song) =>
                                                    <SongView key={song.id} song={song}/>
                                                )
                                                : <p className="no-results">No Songs found for selected artist.</p>
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </HorizontalWrapper>
                    <ErrorView error={error} />
                </>
            );
        }} type="MusicBloc"/>
    );
};

export default SongScreen;
