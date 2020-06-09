const socket = io();

const addMessageToChat = (msg, ownMsg = false) => {
	const msgEl = document.createElement('li');
	msgEl.classList.add('list-group-item');
	msgEl.classList.add(ownMsg ? 'list-group-item-primary' : 'list-group-item-secondary');
	msgEl.innerHTML = msg;

	document.querySelector('#messages').appendChild(msgEl);
}

document.querySelector('#message-form').addEventListener('submit', e => {
	e.preventDefault();

	const messageEl = document.querySelector('#message');
	socket.emit('chatmsg', messageEl.value);
	addMessageToChat(messageEl.value, true);

	messageEl.value = '';
});

socket.on('chatmsg', (msg) => {
	console.log("Someone said something:", msg);
	addMessageToChat(msg);
});
