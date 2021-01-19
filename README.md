# RockStar Project

##Setup

Clone Project:

`git clone git@github.com:sharp3dges/rockstars.git`

Install node modules:
`cd rockstars && npm i`

Run project:
`npm start`

Run tests:
`npm run test`

## Stack
- React
- Typescript
- Jest
- EsLint

## Architecture
I chose to use a *Domain Driven* Architecture, because it increases testability and separates concerns. Furthermore I divided everything into features.
The project uses the following basic folder structure:

- core
- features
  - **feature**
    - data
      - entities
      - repositories
    - domain
      - repositories
      - useCases
    - presentation
      - bloc
      - view
      - guard
    
Wherein core usually contains classes used by multiple features.

For state management I chose to use my own implementation of the BloC pattern introduced by Google (mostly used in Flutter apps).
As Redux usually needs a lot of extra work and is slower than the Bloc Pattern.
Furthermore I especially like it's testability and further separation of concerns.

## What's in it
I must first state 4 hours just isn't a lot of time, so I had to work very hard to get as many things implemented in the way I wanted to.

I managed to create a login procedure (OAUTH) to connect with Spotify.

After login the user will be taken to the Artists page, where all the artists live.
Artists are chunked into separate pages and can be filtered.

Upon selection of an artist the user is taken to the Songs page. The songs of the selected artist will be displayed and the user can even play a part of the song.
Furthermore the user will be able to tap a link that will redirect to the related song on Spotify.

Overall the views scale quite nice across devices if I may say so myself. ;)

I managed to include 6 UnitTests.

## What's missing
Sadly I did not have enough time to include logic for the creation and management of PlayLists.
I did setup the basics for end-to-end tests, but did not have the time to write them.

## Last notes
Tablet and phone can only be tested using chrome dev-tools: Unfortunately OAUTH requires a pre-known redirect-uri which blocs the callback from landing on the right environment.
