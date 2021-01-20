import React from 'react';
import {Switch, Route} from 'react-router-dom';

import './App.scss';
import ArtistScreen from "./features/music/presentation/view/ArtistScreen";
import HorizontalWrapper from "./core/view/layout/HorizontalWrapper";
import Header from "./core/view/header/Header";
import Screen404 from "./features/404/presentation/view/Screen404";
import SongScreen from "./features/music/presentation/view/SongScreen";
import SpotifyLoginGuard from "./features/spotify/presentation/guard/SpotifyLoginGuard";

const App = () => {
    return (
        <div className="app">
            <SpotifyLoginGuard>
                <Switch>
                    <Route exact path="/">
                        <ArtistScreen/>
                    </Route>
                    <Route exact path="/callback">
                        <ArtistScreen/>
                    </Route>
                    <Route path="/artist/:id">
                        <SongScreen/>
                    </Route>
                    <Route path="*">
                        <Header title='Page not found'/>
                        <HorizontalWrapper>
                            <Screen404/>
                        </HorizontalWrapper>
                    </Route>
                </Switch>
            </SpotifyLoginGuard>
        </div>
    )
};

export default App;
