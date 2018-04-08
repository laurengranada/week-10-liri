// npm color stylizing
var colors = require('colors');

// variables for platforms
var fs = require('fs');

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');


// this below no longer works --> spotify now requires a token
// var spotify = require('spotify');

var request = require('request');

// adding the var to pull keys
var keys = require('./keys.js');

var twitKey = keys.twitKey;

var spotKey = keys.spotKey;

//arguments
var argument = process.argv[2];
var value = process.argv[3];


//parameters
var params = {
	screen_name: "LaurenGranada",
	count: 20
};


//switch case
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

function mySpotify(){

var song = process.argv[3];

var spotify = new Spotify(spotKey);
 
spotify.search({ type: 'track', query: song }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data.tracks.items[0]); 
});
};

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

function Movie(){

	var movieData = process.argv[3];

	request("http://www.omdbapi.com/?t=" + movieData + "&y=&plot=full&tomatoes=true&r=json",function(error, response, body){
		if (error && response.statusCode === 200){
			request("http://www.omdbapi.com/?t=mr+nobody+&y=&plot=full&tomatoes=true&r=json");
		} else {
			//movie name
			console.log("Movie: ".yellow + movieData);
			//release date
			console.log("Release Date: " + JSON.parse(body).Year);
			// Rating
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			// Plot
			console.log("Plot: " + JSON.parse(body).Plot);
			// Actors
			console.log("Actors: " + JSON.parse(body).Actors);
			// Rotten tomatoes
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoes);
		};
	});
};

function doCommand(){

	fs.readFile('random.txt', "utf8", function(error, data){
		console.log(data);
	})
};

// 	}
// };

// if(argument === "movie-this"){
// request("http://www.omdbapi.com/?t= + movie + &y=&plot=short&r=json",function(error, response, body){
// 	if(!error && response.statusCode === 200){
// 		console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
// 	}
// })
// };