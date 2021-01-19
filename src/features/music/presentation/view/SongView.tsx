import React from 'react';
import SpotifyPlayer from 'react-spotify-player';

import Song from "../../data/entities/Song";
import './SongView.scss';
import durationToString from "../../domain/useCases/durationToString";

type Props = {
    song: Song;
};


const tableKeys = ['name', 'genre', 'album', 'year', 'duration', 'bpm'];


const SongView = ({song}: Props) => {
    const size = {
        flex: '1',
        height: 80,
    };
    const view = 'coverart';
    const theme = 'white';
    return (
        <div className="song-view">
            <table>
                <tbody>
                {tableKeys.map((key) => {
                    let value = song[key as keyof Song];
                    if (key === 'duration') {
                        value = durationToString(value as number);
                    }
                    return (
                        <tr key={key}>
                            <td>{key.charAt(0).toUpperCase() + key.slice(1)}:</td>
                            <td>{value}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            <SpotifyPlayer
                uri={`spotify:track:${song.spotifyId}`}
                size={size}
                view={view}
                theme={theme}
            />
        </div>
    );
};

export default SongView;
