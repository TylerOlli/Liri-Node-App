var cmd1 = process.argv[2];
var cmd2 = process.argv[3];

var keys = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var movieDB = require('moviedb')('c067d2c803a661fea4a55c14a7f1beee');
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

 
function getSpotify(query){
	if(cmd2){
		spotify.search({type: 'track', query: query}, function(error, data){
			if(error) throw error;
			console.log('');
			console.log(data.tracks.items[0].album.artists[0].name);
			console.log('=============');	
			console.log(data.tracks.items[0].name);	
			console.log('=============')
			console.log(data.tracks.items[0].preview_url);
			console.log('=============');
			console.log(data.tracks.items[0].album.name);
			console.log('');

			writeLog('');
			writeLog(data.tracks.items[0].album.artists[0].name);
			writeLog('=============')
			writeLog(data.tracks.items[0].name);
			writeLog('=============');
			writeLog(data.tracks.items[0].preview_url);
			writeLog('=============');
			writeLog(data.tracks.items[0].album.name);
			writeLog('');
		})
	}

	else {
		spotify.lookup({type: 'track', id: '0hrBpAOgrt8RXigk83LLNE'}, function(error, data){
			if(error) throw error;
			console.log('');
			console.log('You didn\'t put a song title in, so here you go:');
			console.log('');
			console.log(`Artist: ${data.album.artists[0].name}`);
			console.log('=============');	
			console.log(`Song title: ${data.name}`);	
			console.log('=============')
			console.log(`Preview URL: ${data.preview_url}`);
			console.log('=============');
			console.log(`Album: ${data.album.name}`);
			console.log('');

			writeLog('');
			writeLog('You didn\'t put a song title in, so here you go:');
			writeLog('');
			writeLog(`Artist: ${data.album.artists[0].name}`);
			writeLog('=============');	
			writeLog(`Song title: ${data.name}`);	
			writeLog('=============')
			writeLog(`Preview URL: ${data.preview_url}`);
			writeLog('=============');
			writeLog(`Album: ${data.album.name}`);
			writeLog('');
		})
	}	
}

function getMovies(movie){
	if(cmd2){
		movieDB.searchMovie({query: movie }, function(error, data){
			if(error) throw error;
			console.log('');
		  	console.log(`Title: ${data.results[0].title}`);
		  	console.log('=============');
		  	console.log(`Year: ${data.results[0].release_date}`);
		  	console.log('=============');
			console.log(`Rating: ${data.results[0].vote_average}`)
			console.log('=============');  	
			console.log(`Language: ${data.results[0].original_language}`);
		  	console.log('=============');
			console.log(`Plot: ${data.results[0].overview}`);
			console.log('');

			writeLog('');
		  	writeLog(`Title: ${data.results[0].title}`);
		  	writeLog('=============');
		  	writeLog(`Year: ${data.results[0].release_date}`);
		  	writeLog('=============');
			writeLog(`Rating: ${data.results[0].vote_average}`)
			writeLog('=============');  	
			writeLog(`Language: ${data.results[0].original_language}`);
		  	writeLog('=============');
			writeLog(`Plot: ${data.results[0].overview}`);
			writeLog('');						
		});			
	}

	else {
		movieDB.searchTv({query: 'Southpark' }, function(error, data){
			if(error) throw error;
			console.log('');
			console.log('You didn\'t put a movie in, so here you go: ');
			console.log('');
		  	console.log(`Title: ${data.results[0].original_name}`);
		  	console.log('=============');
		  	console.log(`Year: ${data.results[0].first_air_date}`);
		  	console.log('=============');
			console.log(`Rating: ${data.results[0].vote_average}`)
			console.log('=============');  	
			console.log(`Language: ${data.results[0].original_language}`);
		  	console.log('=============');
			console.log(`Plot: ${data.results[0].overview}`);
			console.log('');	

			writeLog('');
			writeLog('You didn\'t put a movie in, so here you go: ');
			writeLog('');
		  	writeLog(`Title: ${data.results[0].original_name}`);
		  	writeLog('=============');
		  	writeLog(`Year: ${data.results[0].first_air_date}`);
		  	writeLog('=============');
			writeLog(`Rating: ${data.results[0].vote_average}`)
			writeLog('=============');  	
			writeLog(`Language: ${data.results[0].original_language}`);
		  	writeLog('=============');
			writeLog(`Plot: ${data.results[0].overview}`);
			writeLog('');				
		});
	}
}


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
