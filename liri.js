var action = process.argv[2];
var value = process.argv[3];
var keys = require('./keys.js');
var request = require('request');
var fs = require('fs');
var Twitter = require('twitter');
var client = new Twitter(keys.twitterKeys);

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotifyKeys);
var api_key = '40e9cece';
var params = {
    screen_name: 'zinaw2017',
    count: 20
}



switch (action) {
    case 'myTweets':
        my_tweets();
        break;
    case 'spotify':
        spotify_this_song(value);
        break;
    case 'movieThis':
        movie_this(value);
        break;
    case 'doWhatItSays':
        do_what_it_says();
        break;
}

// my-tweets function
function my_tweets() {
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error && response.statusCode == 200) {
            fs.appendFile('terminal.log', ('=============== LOG ENTRY BEGIN ===============\r\n' + Date() + '\r\n \r\nTERMINAL COMMANDS:\r\n$: ' + process.argv + '\r\n \r\nDATA OUTPUT:\r\n'), function(err) {
                if (err) throw err;
            });
            console.log(' ');
            console.log('Last 20 Tweets:')
            for (i = 0; i < tweets.length; i++) {
                var number = i + 1;
                console.log(' ');
                console.log([i + 1] + '. ' + tweets[i].text);
                console.log('Created on: ' + tweets[i].created_at);
                console.log(' ');
                fs.appendFile('terminal.log', (number + '. Tweet: ' + tweets[i].text + '\r\nCreated at: ' + tweets[i].created_at + ' \r\n'), function(err) {
                    if (err) throw err;
                });
            }
            fs.appendFile('terminal.log', ('=============== LOG ENTRY END ===============\r\n \r\n'), function(err) {
                if (err) throw err;
            });
        }

    });
}
// end myTweets function

// Movie function, uses the Request module to call the OMDB api
function movie_this() {
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
            //log(movieResults);
        } else {
            console.log(error);
            // return;
        }
    });
};

//spotify function.

function spotify_this_song(songName) {
    var songName = process.argv[3];
    if (!songName) {
        songName = "the sign";
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


// random function
function do_what_it_says() {
    fs.readFile('random.txt', 'utf8', function(error, data) {
        if (error) {
            console.log(error);
        } else {
            var dataArr = data.split(',');
            if (dataArr[0] === 'spotify') {
                spotify_this_song(dataArr[1]);
            }
            if (dataArr[0] === 'movieThis') {
                   movie_this(dataArr[1]);
            }
        }
    });
} // end doWhatItSays function



