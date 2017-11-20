//declaring variables
var fs = require('fs');
var action = process.argv[2];
var keys = require('./keys.js');
var request = require('request');
var Twitter = require('twitter');
var client = new Twitter(keys.twitterKeys);
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotifyKeys);
var api_key = '40e9cece';
//MY-Tweets screen name
var params = {
    screen_name: 'zinaw2017',
    count: 20
}

//Action for each of arguments using switch() method
switch (action) {
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        spotifyThisSong();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:

        console.log("Wel come to Liri node App");
        console.log("===============================");
        console.log("\r\n" + "Type one of the following commands after 'node liri.js' : " + "\r\n" +
            "1. my-tweets 'any twitter name' " + "\r\n" +
            "2. spotify-this-song 'any song name' " + "\r\n" +
            "3. movie-this 'any movie name' " + "\r\n" +
            "4. do-what-it-says." + "\r\n" +
            "Be sure to put the movie or song name in quotation marks if it's more than one word.");
};

//my-tweets function
function myTweets() {
    var client = new Twitter(keys.twitterKeys);


    // console.log(client);
    client.get("statuses/user_timeline/", params, function(error, data, response) {
        if (!error) {
            for (var i = 0; i < data.length; i++) {
                //console.log(response); 
                var twitterResults =
                    "@" + data[i].user.screen_name + ": " +
                    data[i].text + "\r\n" +
                    data[i].created_at + "\r\n" +
                    "------------------------------ " + i + " ------------------------------" + "\r\n";
                console.log(twitterResults);
                log(twitterResults);
            }
        } else {
            console.log(error);
            return;
        }
    });
}

// Spotify-this-song function, uses the Spotify module to call the Spotify api
function spotifyThisSong(songName) {
    var songName = process.argv[3];
    if (!songName) {
        songName = "The Sign by Ace of Base";
    }
    params = songName;
    spotify.search({
        type: "track",
        query: params
    }, function(err, data) {
        if (!err) {
            var songInfo = data.tracks.items;
            for (var i = 0; i < 5; i++) {
                if (songInfo[i] != undefined) {
                    var spotifyResults =
                        "Artist: " + songInfo[i].artists[0].name + "\r\n" +
                        "Song: " + songInfo[i].name + "\r\n" +
                        "Album the song is from: " + songInfo[i].album.name + "\r\n" +
                        "Preview Url: " + songInfo[i].preview_url + "\r\n" +
                        "------------------------------ " + i + " ------------------------------" + "\r\n";
                    console.log(spotifyResults);
                    log(spotifyResults);
                }
            }
        } else {
            console.log("Error :" + err);
            return;
        }
    });
};

// Movie function, uses the Request module to call the OMDB api
function movieThis() {
    var movie = process.argv[3];
    if (!movie) {
        movie = "MR.Nobody";
    }

    params = movie
    request("http://www.omdbapi.com/?apikey=" + api_key + "&t=" + params + "&y=&plot=short&r=json&tomatoes=true", function(error, response, body) {
        //console.log(body);
        if (!error && response.statusCode == 200) {
            var movieObject = JSON.parse(body);
            //console.log(movieObject); 
            var movieResults =

                "Title: " + movieObject.Title + "\r\n" +
                "Year: " + movieObject.Year + "\r\n" +
                "Imdb Rating: " + movieObject.imdbRating + "\r\n" +
                "Country: " + movieObject.Country + "\r\n" +
                "Language: " + movieObject.Language + "\r\n" +
                "Plot: " + movieObject.Plot + "\r\n" +
                "Actors: " + movieObject.Actors + "\r\n" +
                "Rotten Tomatoes Rating: " + movieObject.tomatoRating + "\r\n" +
                "Rotten Tomatoes URL: " + movieObject.tomatoURL + "\r\n";

            console.log(movieResults);
            log(movieResults);
        } else {
            console.log(error);
            return;
        }
    });
};

// doWhatItSays () function, uses the reads and writes module to access the random.txt file 
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (!error) {
            doWhatItSaysResults = data.split(",");
            spotifyThisSong(doWhatItSaysResults[0], doWhatItSaysResults[1]);
            movieThis(doWhatItSaysResults[0], doWhatItSaysResults[1]);
        } else {
            console.log("Error occurred" + error);
        }
    });
};
// log(logResults) function, uses the reads and writes module to access the log.txt file 
function log(logResults) {
    fs.appendFile("log.txt", logResults, (error) => {
        if (error) {
            throw error;
        }
    });
}