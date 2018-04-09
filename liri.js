// npm color stylizing
var colors = require('colors');

// variables for platforms
var fs = require('fs');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

// this below no longer works --> spotify now requires a token
// var spotify = require('spotify');

// adding the var to pull keys
var keys = require('./keys.js');
var twitKey = keys.twitKey;
var spotKey = keys.spotKey;

//arguments
var argument = process.argv[2];
var value = process.argv[3];

//parameters for twitter command
var params = {
	screen_name: "LaurenGranada",
	count: 20
};


//switch cases for all commands
switch (argument) {
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        mySpotify();
        break;

    case "movie-this":
        Movie();
        break;

    case "do-what-it-says":
        doCommand();
        break;
};

// command for twitter
function myTweets() {

	var tweet = new Twitter(twitKey);

	tweet.get('statuses/user_timeline', params,
	function(error, myTweets, response){
    	for(var i = 0; i < myTweets.length; i++){
    		//tweet text
      		console.log(myTweets[i].text.cyan);
      		//date tweet created
      		console.log(myTweets[i].created_at.yellow); 
      		console.log("\n"); 
    }
  });
};

// command for spotify
function mySpotify(){

	var song = process.argv[3];

	var spotify = new Spotify(spotKey);

	var getArtists = function(artist){
		return artist.name;
	} 
	spotify.search({ type: 'track', query: song }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	 //save data for easier callback
	 var songData = data.tracks.items;

	 // used for loop with "i=1" only for the sole purpose of console.logging the results list to start at number 1 :)
	 for (var i = 1; i < songData.length; i++){
	 	console.log(colors.underline("Result #".underline + i));
	 	console.log("Artist(s): ".green + songData[i].artists.map(getArtists));
	 	console.log("Song title: ".green + songData[i].name);
	 	console.log("Album title: ".green + songData[i].album.name);
	 	console.log("Preview song here:".green + " https://open.spotify.com/track/" + songData[i].id);
	 	console.log("");
	 }
	});
};

// the below no longer works because spotify now requires a token /////////////////////

// function mySpotify(){

// 	var Song = process.argv[3];

// 	spotify.search({type: 'track', query: Song}, function(err, data){
// 		if (err){
// 			console.log("Artist: Ace of Base \n Song Name: The Sign \n Album Name: The Sign (US Album) [Remastered] \nPreview song here: https://p.scdn.co/mp3-preview/4c463359f67dd3546db7294d236dd0ae991882ff?cid=null");
// 			return;
// 		} else {
// 			var songData = data.tracks.items[0];
// 			//artists
// 			var songResult = console.log("Artist: " + songData.artists[0].name);
// 			//song name
// 			console.log("Song Name: " + songData.name.green);
// 			//album
// 			console.log("Album Name: " + songData.album.name);
// 			//preview
// 			console.log("Preview song here: " + songData.preview_url);
// 			};
// 	});

// };

/////////////////////////////////////////////////////////////////////////////

// command for OMDB
function Movie(){
	var movieData = process.argv[3];

	//altered url to include user input as "movieData"
	request("http://www.omdbapi.com/?i=tt3896198&apikey=fc1c67aa&t=" + movieData + "&y=&plot=full&tomatoes=true&r=json", function (error, response, body) {

	  		// console.log(response); // Print the data
	  		console.log("Title: ".magenta + JSON.parse(body).Title);
	  		console.log("Release Date: ".magenta + JSON.parse(body).Released);
	  		console.log("IMDB Rating: ".magenta + JSON.parse(body).imdbRating);
	  		console.log("Country: ".magenta + JSON.parse(body).Country);
	  		console.log("Language: ".magenta + JSON.parse(body).Language);
	  		console.log("Plot: ".magenta + JSON.parse(body).Plot);
	  		console.log("Actors: ".magenta + JSON.parse(body).Actors);
	  		console.log("Rotten Tomatoes Rating: ".magenta + JSON.parse(body).Ratings[1].Value);
	  		console.log("Rotten Tomatoes URL: ".magenta + JSON.parse(body).tomatoURL);
	  		console.log("\n");

});
};



function doCommand(){
	fs.readFile('random.txt', "utf8", function(error, data){
		console.log(data);
	})
};
