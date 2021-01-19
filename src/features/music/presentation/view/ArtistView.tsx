import React from 'react';
import Artist from "../../data/entities/Artist";
import './ArtistView.scss';

type Props = {
    artist: Artist;
    onClick: () => void;
};

const ArtistView = ({artist, onClick}: Props) => {
    return (
        <div role="button" className="artist-view" onClick={onClick}>
            <h5 className="artist-identifier">{artist.id}</h5>
            <h5 className="artist-name">{artist.name}</h5>
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" x="0px" y="0px" width="20" height="20" viewBox="0 0 490 490">
                <g>
                    <path d="M247.756,245.008L0,21.851v446.297L247.756,245.008z"/>
                </g>
                <g>
                    <path d="M490,245.008L242.244,21.851v446.297L490,245.008z"/>
                </g>
            </svg>
        </div>
    )
};

export default ArtistView;
