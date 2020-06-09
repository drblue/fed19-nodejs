const socket = io();

const startEl = document.querySelector('#start');
const chatWrapperEl = document.querySelector('#chat-wrapper');
const usernameForm = document.querySelector('#username-form');
const messageForm = document.querySelector('#message-form');

let username = null;

const addNoticeToChat = (notice) => {
	const noticeEl = document.createElement('li');
	noticeEl.classList.add('list-group-item', 'list-group-item-light', 'notice');

	noticeEl.innerHTML = notice;

	document.querySelector('#messages').appendChild(noticeEl);
}

const addMessageToChat = (msg, ownMsg = false) => {
	const msgEl = document.createElement('li');
	msgEl.classList.add('list-group-item', 'message');
	msgEl.classList.add(ownMsg ? 'list-group-item-primary' : 'list-group-item-secondary');

	const username = ownMsg ? 'You' : msg.username;
	msgEl.innerHTML = `<span class="user">${username}</span>: ${msg.content}`;

	document.querySelector('#messages').appendChild(msgEl);
}

// get username from form and emit `user-connected`-event to server
usernameForm.addEventListener('submit', e => {
	e.preventDefault();

	username = document.querySelector('#username').value;
	socket.emit('user-connected', username);

	startEl.classList.add('hide');
	chatWrapperEl.classList.remove('hide');
});

messageForm.addEventListener('submit', e => {
	e.preventDefault();

	const messageEl = document.querySelector('#message');
	const msg = {
		content: messageEl.value,
		username: document.querySelector('#username').value,
	}

	socket.emit('chatmsg', msg);
	addMessageToChat(msg, true);

	messageEl.value = '';
});

socket.on('user-connected', (username) => {
	addNoticeToChat(`${username} connected to the chat 🥳!`);
});

socket.on('user-disconnected', (username) => {
	addNoticeToChat(`${username} left the chat 😢...`);
});

socket.on('chatmsg', (msg) => {
	addMessageToChat(msg);
});
