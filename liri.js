var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'u8pkAh9dWmvf5MdR0ORNMVlw4',
  consumer_secret: 'wf9cfG3B16mAdxCf2xHKs3RRQpScIDzYldeXkfwiTkLjubIi7n',
  access_token_key: '832061185235283968-OgiRBGkSramzZLxUtVCmbATr7lrOQrf',
  access_token_secret: '909a5LpQo9cEsL8lla4vWvgQnFI7iIdqf2PAqcJkeeyfZ',
});
 
var params = {screen_name: 'fullstack_ninja'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

var spotify = require('spotify');
 
spotify.search({ type: 'track', query: 'I Want it That Way' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 
    console.log(data); 
});