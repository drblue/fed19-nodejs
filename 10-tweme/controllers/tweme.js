/**
 * Tweme Controller
 */

const debug = require('debug')('tweme:tweme_controller');

// Load Twit library
const Twit = require('twit');

// Socket.io server instance
let io = null;

// Init Twit library
const T = new Twit({
	consumer_key:         process.env.TWITTER_CONSUMER_KEY,
	consumer_secret:      process.env.TWITTER_CONSUMER_SECRET,
	access_token:         process.env.TWITTER_ACCESS_TOKEN,
	access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET,
	timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
	strictSSL:            true,     // optional - requires SSL certificates to be valid.
});

const stream = T.stream('statuses/filter', { track: 'ps5' });
debug('Established stream to Twitter');

stream.on('tweet', tweet => {
	debug('New incoming tweet matching our filter!');
	console.log(tweet);
})

module.exports = (_io) => {
	io = _io;
	debug('Socket.io server attached');
}
