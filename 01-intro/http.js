/**
 * http
 */
const fs = require('fs');
const http = require('http');

const urls = [
	{
		url: '/',
		file: './pages/index.html',
		type: 'text/html',
	},
	{
		url: '/about',
		file: './pages/about.html',
		type: 'text/html',
	},
	{
		url: '/memes',
		file: './pages/memes.html',
		type: 'text/html',
	},
	{
		url: '/style.css',
		file: './pages/style.css',
		type: 'text/css',
	},
];

const server = http.createServer();
server.on('request', function (req, res) {
	console.log(`Incoming ${req.method} request for: ${req.url}`);

	const route = urls.find(route => route.url === req.url);
	if (!route) {
		res.writeHead(404);
		res.end();
		return;
	}

	res.writeHead(200, {
		'Content-Type': route.type,
	});
	fs.createReadStream(route.file, 'utf-8').pipe(res);
});

server.listen(8080);
console.log("Server listening on http://127.0.0.1:8080");
