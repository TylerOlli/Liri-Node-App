var cmd1 = process.argv[2];
var cmd2 = process.argv[3];

var keys = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var mdb = require('moviedb')('c067d2c803a661fea4a55c14a7f1beee');
var fs = require('fs');

var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

 
function getTwitter(){
	client.get('statuses/user_timeline',{screen_name: 'fullstack_ninja', count: 20},function(error, tweets, response){
		if(error) throw error;
		for(var i = 0; i < tweets.length; i++){
			console.log('');
			console.log('================');
			console.log(tweets[i].text);
			console.log(tweets[i].created_at);
			console.log('================');
			console.log('');

			writeLog('');
			writeLog('================');
			writeLog(tweets[i].text);
			writeLog(tweets[i].created_at);
			writeLog('================');
			writeLog('');
		}
	})	
}

 
spotify.search({ type: 'track', query: 'I Want it That Way' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 
    console.log(data);
    writeLog(data); 
});

mdb.searchMovie({query: 'Mr. Nobody' }, function(err, res){
  console.log(res);
  writeLog(res); 
});


function writeLog(data){
	fs.appendFile('log.txt', data + '\n', 'UTF-8', function(error){
		if (error) throw error;
	})
}

switch(cmd1) {

	case 'my-tweets':
		getTwitter();
		writeLog('my-tweets');
	break;

	case 'spotify-this-song':
		getSpotify(cmd2);
		writeLog('spotify-this-song');
	break;

	case 'movie-this':
		getMovies(cmd2);
		writeLog('movie-this');
	break;

	case 'do-what-it-says':
		fs.readFile("random.txt", "UTF-8", function(error, data){
			if (error) throw error;
			data = data.split(',');

			if(data[0] === 'my-tweets'){
				getTwitter();
				writeLog('my-tweets');
			}else if(data[0] === 'spotify-this-song'){
				getSpotify(data[1]);
				writeLog('spotify-this-song');
			}else if(data[0] === 'movie-this'){
				getMovies(data[1]);
				writeLog('movie-this');
			}
		})
	break;

	default:
		console.log('');
		console.log("You didn\'t input a valid command");
		console.log('');

		writeLog('');
		writeLog("You didn\'t input a valid command");
		writeLog('');

}
