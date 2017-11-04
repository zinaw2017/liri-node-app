#!/usr/bin/env node

var action = process.argv[2];
var value = process.argv[3];
var keys = require('./keys.js');
console.log(keys);
//var twitterKeys = keys.twitterKeys;
var Twitter = require('twitter');
var client = new Twitter(keys.twitterKeys);
var params = {
    screen_name: 'zinaw2017',
    count: 20
}
var request = require('request');
var fs = require('fs');

var Spotify = require('node-spotify-api');

switch (action) {
    case 'mytweets':
        myTweets();
        break;
    case 'spotify':
        spotifyThisSong(value);
        break;
    case 'omdb':
        movieThis(value);
        break;
    case 'random':
        doWhatItSays();
        break;
}

// my-tweets function
function myTweets() {
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
} // end myTweets function

// spotify function
function spotifyThisSong(value) {
    if (value == null) {
        value = 'The sign';
    }
    request('https://api.spotify.com/v1/search?q=' + value + '&type=track', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            jsonBody = JSON.parse(body);
            console.log(' ');
            console.log('Artist: ' + jsonBody.tracks.items[0].artists[0].name);
            console.log('Song: ' + jsonBody.tracks.items[0].name);
            console.log('Preview Link: ' + jsonBody.tracks.items[0].preview_url);
            console.log('Album: ' + jsonBody.tracks.items[0].album.name);
            console.log(' ');
            fs.appendFile('terminal.log', ('=============== LOG ENTRY BEGIN ===============\r\n' + Date() + '\r\n \r\nTERMINAL COMMANDS:\r\n$: ' + process.argv +
                    '\r\n \r\nDATA OUTPUT:\r\n' + 'Artist: ' + jsonBody.tracks.items[0].artists[0].name + '\r\nSong: ' + jsonBody.tracks.items[0].name + '\r\nPreview Link: ' +
                    jsonBody.tracks.items[0].preview_url + '\r\nAlbum: ' + jsonBody.tracks.items[0].album.name + '\r\n=============== LOG ENTRY END ===============\r\n \r\n'),
                function(err) {
                    if (err) throw err;
                });
        }
    });
} // end spotify function

// movieThis function
function This(value) {
    if (value == null) {
        value = 'Mr. Nobody';
    }
    request('http://www.omdbapi.com/?t=' + value + '&tomatoes=true&r=json', function(error, response, body) {
        // request ("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

        if (!error && response.statusCode == 200) {
            jsonBody = JSON.parse(body);
            console.log(' ');
            console.log('Title: ' + jsonBody.Title);
            console.log('Year: ' + jsonBody.Year);
            console.log('IMDb Rating: ' + jsonBody.imdbRating);
            console.log('Country: ' + jsonBody.Country);
            console.log('Language: ' + jsonBody.Language);
            console.log('Plot: ' + jsonBody.Plot);
            console.log('Actors: ' + jsonBody.Actors);
            console.log('Rotten Tomatoes Rating: ' + jsonBody.tomatoRating);
            console.log('Rotten Tomatoes URL: ' + jsonBody.tomatoURL);
            console.log(' ');
            fs.appendFile('log.txt', ('=============== LOG ENTRY BEGIN ===============\r\n' + Date() + '\r\n \r\nTERMINAL COMMANDS: ' + process.argv +
                '\r\nDATA OUTPUT:\r\n' + 'Title: ' + jsonBody.Title + '\r\nYear: ' + jsonBody.Year + '\r\nomdb Rating: ' + jsonBody.omdbRating + '\r\nCountry: ' +
                jsonBody.Country + '\r\nLanguage: ' + jsonBody.Language + '\r\nPlot: ' + jsonBody.Plot + '\r\nActors: ' + jsonBody.Actors + '\r\nRotten Tomatoes Rating: ' +
                jsonBody.tomatoRating + '\r\nRotten Tomatoes URL: ' + jsonBody.tomatoURL + '\r\n =============== LOG ENTRY END ===============\r\n \r\n'), function(err) {
                if (err) throw err;
            });
        }
    });
} //end movieThis function

// random function
function random() {
    fs.readFile('random.txt', 'utf8', function(error, data) {
        if (error) {
            console.log(error);
        } else {
            var dataArr = data.split(',');
            if (dataArr[0] === 'spotify') {
                spotifyThisSong(dataArr[1]);
            }
            if (dataArr[0] === 'omdb') {
                movieThis(dataArr[1]);
            }
        }
    });
} // end doWhatItSays function