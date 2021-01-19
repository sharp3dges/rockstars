import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import App from './App';
import BlocRegistry from './core/bloc/BlocRegistry';

import './index.scss';
import MusicBloc from "./features/music/presentation/bloc/MusicBloc";
import SpotifyBloc from "./features/spotify/presentation/bloc/SpotifyBloc";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <BlocRegistry.Provider value={[
                new MusicBloc(),
                new SpotifyBloc(),
            ]}>
                <App/>
            </BlocRegistry.Provider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
