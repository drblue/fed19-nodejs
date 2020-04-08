/**
 * http
 */
const fs = require('fs');
const http = require('http');

const server = http.createServer();
server.on('request', function (req, res) {
	console.log(`Incoming ${req.method} request for: ${req.url}`);

	res.writeHead(200, {
		'Content-Type': 'text/plain',
		'Content-Encoding': 'utf-8',
	});

	const readStream = fs.createReadStream('./data/oneliners.txt', 'utf-8');
	// readStream.on('data', chunk => {
	// 	res.write(chunk);
	// });

	// readStream.on('end', () => {
	// 	res.end();
	// });

	readStream.pipe(res);

	// res.write('Hello, visitor!');
	// res.write(`You have requested ${req.url} using ${req.method} and it's ${Date()} right now.`);
	// res.write(`Byyyye!`);
	// res.end();
});

server.listen(8080);
console.log("Server listening on http://127.0.0.1:8080");
