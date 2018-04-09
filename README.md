# LIRI (Language Interpretation and Recognition Interface) Bot

### Instructions for Use
Download files, and open in your terminal/bash window.

`npm install` to download all dependencies.

### Overview
LIRI is a command line node app that takes in parameters and gives you back data. Liri.js can take in one of the following commands:
    - ```javascript
        my-tweets
        spotify-this-song
        movie-this`
        ```

![alt text](https://github.com/laurengranada/week-10-liri/blob/master/read-images/node_liri.png)

### What Does Each Command Do
1. `node liri.js my-tweets`
    - This will show my last 20 tweets and when they were created at in your terminal/bash window.

![alt text](https://github.com/laurengranada/week-10-liri/blob/master/read-images/my-tweets.png)

2. `node liri.js spotify-this-song '<song name here>'`
    - This will show 20 results with the following from Spotify:
        - Artist(s)
        - Song Title
        - Album Title
        - A link to preview the song from Spotify

![alt text](https://github.com/laurengranada/week-10-liri/blob/master/read-images/spotify.png)

3. `node liri.js movie-this '<movie name here>'`
    - This will show OMDB information of the following: 
        - Title of the movie
        - Year the movie came out
        - IMDB Rating of the movie
        - Country where the movie was produced
        - Language of the movie
        - Plot of the movie
        - Actors in the movie
        - Rotten Tomatoes Rating
        - Rotten Tomatoes URL

![alt text](https://github.com/laurengranada/week-10-liri/blob/master/read-images/movie-this.png)

### Languages/Technologies Used
- node.js
- fs npm
- twitter npm
- node-spotify-api npm 
    * previously used Spotify npm - that did not require a token to retrieve Spotify data * * *
- request npm
- colors npm - for stylizing the command line
- OMDB api (http://www.omdbapi.com/)

