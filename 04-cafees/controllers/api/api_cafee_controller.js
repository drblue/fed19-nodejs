/**
 * API Café Controller
 */

// Get index of all cafés
const index = (req, res) => {
	res.send([
		{
			name: 'Gustavs Go-fika',
		},
		{
			name: 'Fredriks Ful-fika',
		},
	]);
}

// Create a café
const store = (req, res) => {
	res.send({ message: 'POST /'});
};

// Get a specific café
const show = (req, res) => {
	res.send({ message: 'GET /' + req.params.cafeId });
};

// Update a specific café
const update = (req, res) => {
	res.send({ message: 'PUT /' + req.params.cafeId });
};

// Delete a specific café
const destroy = (req, res) => {
	res.send({ message: 'DELETE /' + req.params.cafeId });
};

module.exports = {
	index,
	store,
	show,
	update,
	destroy,
}
