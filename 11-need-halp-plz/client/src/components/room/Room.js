import React from 'react';
import socket from '../../modules/socket-client';

class Room extends React.Component {

	state = {
		room: null,
		waitingList: null,
	}

	componentDidMount() {
		socket.emit('get-waiting-list', response => {
			// update state
		});

		// Listen for updated waiting list, then update state
	}

	componentWillUnmount() {
		// Cancel listener for updated waiting list
	}

	render() {
		return (
			<div className="component-Room">
				<h1>This is a room</h1>
				<p className="lead">Very roomy.</p>

				{/* Iterate over waiting list and output a list group */}
			</div>
		)
	}
}

const Room = props => {




}

export default Room;
