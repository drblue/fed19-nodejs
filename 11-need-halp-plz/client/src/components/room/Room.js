import React from 'react';
import socket from '../../modules/socket-client';

class Room extends React.Component {

	state = {
		room: null,
		waitingList: null,
	}

	componentDidMount() {
		socket.emit('get-waiting-list', this.props.match.params.id, response => {
			console.log("Got response for 'get-waiting-list' event from server:", response);

			// update state
			this.setState({
				room: response.room,
				waitingList: response.waitingList,
			});
		});

		// Listen for updated waiting list, then update state
		socket.on('updated-waiting-list', data => {
			console.log("Got updated waiting list from server:", data);

			// update state
			this.setState({
				room: data.room,
				waitingList: data.waitingList,
			});
		})
	}

	componentWillUnmount() {
		// Leave room
		socket.emit('leave-room', this.state.room);

		// Cancel listener for updated waiting list
		socket.off('updated-waiting-list');
	}

	render() {
		return (
			<div className="component-Room">
				{this.state.room ? (
					<>
						<div className="text-center">
							<h1>{this.state.room}</h1>
							<p className="lead">Waiting list</p>
						</div>

						<ol className="list-group">
							{
								this.state.waitingList.map((user, index) => (
									<li className="list-group-item" key={index}>{++index}. {user.name}</li>
								))
							}
						</ol>
					</>
				) : (
					<h1>Loading...</h1>
				)}
			</div>
		)
	}
}

export default Room;
