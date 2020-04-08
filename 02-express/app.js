/**
 * express
 */

const express = require('express');
const app = express();

// respond to GET-requests to `/`
app.get('/', (req, res) => {
	res.send('Hello from the root.');
});

// respond to GET-requests to `/nom`
app.get('/nom', (req, res) => {
	res.send('Halvah powder chupa chups sugar plum carrot cake jelly beans. Topping biscuit chupa chups I love. Sweet roll liquorice sugar plum macaroon sesame snaps sugar plum liquorice cookie topping.');
});

// we can also send objects and Express will stringify them and set
// content-type to application/json automagically
app.get('/api/nom', (req, res) => {
	res.send({ msg: 'Cakes are om-nom-nom.' });
});


// listen on port 3000
app.listen(3000, () => {
	console.log('Server online at http://localhost:3000');
});
