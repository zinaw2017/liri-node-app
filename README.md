
# liri-node-app
#LIRI - Language Interpretation and Recognition Interface

## Introduction
LIRI is like SIRI (from iOS).  It is a command line node app that takes in parameters and outputs data.

## Setup
#### 0. Clone the repo

#### 1. Run npm install, and the following packages should be installed:
   * [Twitter](https://www.npmjs.com/package/twitter)
   
   * [Spotify](https://www.npmjs.com/package/node-spotify-api)
   
   * [Request](https://www.npmjs.com/package/request)
     
     * You'll use Request to grab data from the [OMDB API](http://www.omdbapi.com).


#### 2. Get your Twitter API credentials by following these steps (you must have a Twitter account and be logged in):

* Step One: go to https://apps.twitter.com/app/new and fill out and submit the form
* Step Two: go to Keys and Access Tokens to get your consumer key and consumer secret
* Step Three: then click the button below on that page to create an access token and access token secret

#### 3. Create a file named keys.js and store it somewhere safe (you will need to reference it):

* Inside keys.js insert the following code:

```JavaScript
console.log('this is loaded');

var twitterKeys = {
  consumer_key: '<input here>',
  consumer_secret: '<input here>',
  access_token_key: '<input here>',
  access_token_secret: '<input here>',
}

module.exports = twitterKeys;

#### 4. Inside liri.js, enter your Twitter username in the params object to retrieve your last 20 tweets

``` JavaScript

var params = {
    screen_name: 'yourTwitterUsername'
} && {
    count: 20
};

```

## Run the application
* To install globally:
```
npm install -g
```


```8. Make it so liri.js can take in one of the following commands:

   * `my-tweets`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`
liri mytweets
```
* will log your last 20 tweets and when they were created

```
liri spotify 'song name'
```

* log the following information about the song:

	* artist(s)
	* song name
	* preview link of the song from spotify
	* album that the song is a part of
	* song name

* if no song is provided then the program will output information for the song "The Sign" by Ace of Base. by default

```
liri omdb <movie name>
```

* this would log the following information about the movie:

	* Title
	* Year
	* IMDB Rating
	* Country
	* Language
	* Plot
	* Actors
	* Rotten Tomatoes Rating
	* Rotten Tomatoes URL

* if no movie is provided then the program will output information for the movie  'Mr. Nobody.'

```
liri do-what-it-says
```

* The program will take the text inside of random.txt and use it to call the first command with the second part as it's parameter

* Currently in random.txt, the following text is there:

```
spotify-this-song,"I Want it That Way"

* All commands and output are logged in terminal.log.


