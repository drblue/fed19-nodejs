const socket = io();

const startEl = document.querySelector('#start');
const chatWrapperEl = document.querySelector('#chat-wrapper');
const usernameForm = document.querySelector('#username-form');
const messageForm = document.querySelector('#message-form');

let roomName = null;
let username = null;

const addNoticeToChat = (notice) => {
	const noticeEl = document.createElement('li');
	noticeEl.classList.add('notice');

	noticeEl.innerHTML = notice;

	document.querySelector('#messages').appendChild(noticeEl);
	noticeEl.scrollIntoView();
}

const addMessageToChat = (msg, ownMsg = false) => {
	console.log("addMessageToChat:", msg);
	const msgEl = document.createElement('li');
	msgEl.classList.add('message');
	if (ownMsg) {
		msgEl.classList.add('you');
	}

	msgEl.innerHTML = ownMsg
		? msg.content
		: `<span class="user">${msg.username}</span>: <span class="content">${msg.content}</span> <span class="time">${moment(msg.time).format('HH:mm:ss')}</span>`;

	document.querySelector('#messages').appendChild(msgEl);
	msgEl.scrollIntoView();
}

const getRoomList = () => {
	console.log("Requesting room list from server...");

	socket.emit('get-room-list', (rooms) => {
		// update list of rooms
		updateRoomList(rooms);
	})
}

const showChat = (roomName) => {
	document.querySelector('#chat-title').innerText = roomName;
	startEl.classList.add('hide');
	chatWrapperEl.classList.remove('hide');
}

const updateOnlineUsers = (users) => {
	document.querySelector('#online-users').innerHTML = users.map(user => `<li class="user"><span class="fas fa-user"></span> ${user}</li>`).join("");
}

const updateRoomList = (rooms) => {
	console.log("Got a list of rooms!", rooms);
	document.querySelector('#room').innerHTML = rooms.map(room => `<option value="${room}">${room}</option>`).join("");
}

// get username from form and emit `register-user`-event to server
usernameForm.addEventListener('submit', e => {
	e.preventDefault();

	roomName = usernameForm.room.value;
	username = usernameForm.username.value;
	socket.emit('register-user', roomName, username, (status) => {
		console.log("Server acknowledged the registration :D", status);

		if (status.joinChat) {
			showChat(roomName);
			updateOnlineUsers(status.onlineUsers);
		}
	});
});

messageForm.addEventListener('submit', e => {
	e.preventDefault();

	const messageEl = document.querySelector('#message');
	if (!messageEl.value) {
		return;
	}

	const msg = {
		content: messageEl.value,
		room: roomName,
	}

	socket.emit('chatmsg', msg);
	addMessageToChat(msg, true);

	messageEl.value = '';
	messageEl.focus();
});

socket.on('reconnect', () => {
	if (username) {
		socket.emit('register-user', roomName, username, () => {
			console.log("The server acknowledged our reconnect.");
		});
	}
});

socket.on('online-users', (users) => {
	updateOnlineUsers(users);
});

socket.on('new-user-connected', (username) => {
	addNoticeToChat(`${username} connected to the chat 🥳!`);
});

socket.on('user-disconnected', (username) => {
	addNoticeToChat(`${username} left the chat 😢...`);
});

socket.on('chatmsg', (msg) => {
	addMessageToChat(msg);
});

window.onload = () => {
	getRoomList();
}
