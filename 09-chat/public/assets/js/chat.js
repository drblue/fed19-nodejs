const socket = io();

document.querySelector('#message-form').addEventListener('submit', e => {
	e.preventDefault();

	const messageEl = document.querySelector('#message');
	socket.emit('chatmsg', message.value);
	messageEl.value = '';

	return false;
});

socket.on('chatmsg', (msg) => {
	console.log("Someone said something:", msg);
	document.querySelector('#messages').innerHTML += `<li class="list-group-item">${msg}</li>`;
});
