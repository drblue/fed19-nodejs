import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../modules/config';

class RoomList extends React.Component {

	state = {
		loading: true,
		roomlist: [],
	}

	componentDidMount() {
		axios.get(config.API_HOST + '/rooms', {
			headers: {
				'Authorization': 'Bearer ' + config.getToken()
			}
		})
		.then(res => {
			console.log("Got response!", res);
			if (res.data.status === "success") {
				const rooms = res.data.data.rooms;
				this.setState({
					loading: false,
					roomlist: rooms,
				});
			}
		})
	}

	componentWillUnmount() {
	}

	render() {
		return (
			<div className="component-Roomlist">
				{this.state.loading ? (
					<h1>Loading...</h1>
				) : (
					<>
						<div className="text-center">
							<h1>Room List</h1>
							<p className="lead">Choose which school-class you belong to</p>
						</div>

						<ol className="list-group">
							{
								this.state.roomlist.map((room, index) => (
									<li className="list-group-item" key={index}>
										<Link to={'/room/' + room.name}>
											{room.name}
										</Link>
									</li>
								))
							}
						</ol>
					</>
				)}
			</div>
		)
	}
}

export default RoomList;
