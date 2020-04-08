/**
 * http
 */
const http = require('http');

const server = http.createServer();
server.on('request', function (req, res) {
	console.log("Hey, someone is requesting something from us! Yayyyy!");

	res.writeHead(200, {
		'Content-Type': 'text/html',
	});

	res.end(`Hello, browser! It's ${Date()} right now.`);
});

server.listen(8080);
console.log("Server listening on http://127.0.0.1:8080");
