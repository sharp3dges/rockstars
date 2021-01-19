import React, {useContext, useEffect} from 'react';
import {useHistory} from "react-router-dom";

import MusicBloc, {MusicState} from "../bloc/MusicBloc";
import Spinner from "../../../../core/view/spinner/Spinner";
import ArtistView from "./ArtistView";
import BlocConsumer from "../../../../core/bloc/BlocConsumer";

import './ArtistScreen.scss';
import Header from "../../../../core/view/header/Header";
import HorizontalWrapper from "../../../../core/view/layout/HorizontalWrapper";
import ErrorView from "../../../../core/view/error/ErrorView";
import BlocRegistry from "../../../../core/bloc/BlocRegistry";
import BlocProvider from "../../../../core/bloc/BlocProvider";

const ArtistScreen = () => {
    const history = useHistory();

    const context = useContext(BlocRegistry);
    const musicBloc = BlocProvider.of<MusicBloc, MusicState>(context, 'MusicBloc');

    useEffect(() => {
        if (musicBloc) {
            musicBloc.fetchArtists();
        }
    }, [musicBloc]);

    return (
        <>
            <Header title="Artists" subtitle="who rock!" />
            <HorizontalWrapper>
                <div className="screen artist-screen">
                    <BlocConsumer builder={(bloc: MusicBloc, state: MusicState) => {
                        const {loading, filter, filteredArtists, chunks, currentPage, error} = state;
                        if (loading) {
                            return (<Spinner/>);
                        }
                        return (
                            <>
                                <input type="text" placeholder="Search.." value={filter}
                                       onChange={(e) => bloc.setFilter(e.target.value)}/>
                                <div className="artist-list-view list-view">
                                    <div className="list-view-content">
                                        {filteredArtists.length
                                            ? filteredArtists.map((artist) =>
                                                <ArtistView key={artist.id} artist={artist} onClick={() => {
                                                    bloc.clearSongs();
                                                    history.push(`/artist/${artist.id}`);
                                                }}/>
                                            )
                                            : <p className="no-results">No Artists found for current filter.</p>
                                        }
                                    </div>
                                </div>
                                <div className="paging-buttons">
                                    {chunks.map((_, index) => (
                                        <div
                                            key={`paging-button-${index}`}
                                            role="button"
                                            className={'paging-button' + (index === currentPage ? ' current' : '')}
                                            onClick={() => bloc.setCurrentPage(index)}
                                        >
                                            {index + 1}
                                        </div>
                                    ))}
                                </div>
                                <ErrorView error={error} />
                            </>
                        );
                    }} type="MusicBloc"/>
                </div>
            </HorizontalWrapper>
        </>
    )
};

export default ArtistScreen;
