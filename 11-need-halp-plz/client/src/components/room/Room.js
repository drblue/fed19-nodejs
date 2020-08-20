import React from 'react';
import Moment from 'react-moment';
import config from '../../modules/config';
import socket from '../../modules/socket-client';

class Room extends React.Component {

	state = {
		joined: false,
		room: this.props.match.params.id,
		waitingList: null,
	}

	componentDidMount() {
		socket.emit('join-room', {
			room: this.state.room,
			access_token: config.getToken()
		}, response => {
			if (!response.joined) {
				this.props.history.push('/');
			}

			// update state with waitingList
			this.setState({
				joined: true,
				waitingList: response.waitingList,
			});
		});

		// Listen for updated waiting list, then update state
		socket.on('updated-waiting-list', data => {
			console.log("Got updated waiting list from server:", data);

			// update state
			this.setState({
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
				{this.state.joined ? (
					<>
						<div className="text-center">
							<h1>{this.state.room}</h1>
							<p className="lead">Waiting list</p>
						</div>

						<ol className="list-group">
							{
								this.state.waitingList.map((user, index) => (
									<li className="list-group-item" title={user.location} key={index}>
										{++index}. {user.name}
										<Moment
											date={user.waitingSince}
											format="HH:mm"
											unix
										/>
										<Moment
											date={user.waitingSince}
											fromNow
											unix
										/>
									</li>
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
