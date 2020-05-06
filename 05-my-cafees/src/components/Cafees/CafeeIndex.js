import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CafeeIndex extends React.Component {

	state = {
		cafees: [],
		error: false,
	}

	componentDidMount() {
		axios.get('http://localhost:3000/api/cafees')
		.then(response => {
			if (response.data.status !== "success") {
				this.setState({
					error: response.data.message || 'An unknown error occurred.',
				});
				return;
			}

			this.setState({
				cafees: response.data.data.cafees,
				error: false,
			});
		})
		.catch(err => {
			console.error("Error when fetching all cafees.", err);
			this.setState({
				error: err.message
			});
		});
	}

	render() {
		return this.state.error
			? (
				<div className="alert alert-warning">
					{this.state.error}
				</div>
			)
			: (
				<div id="cafee-index">
					<h1>Alla caféer</h1>

					<ul className="cafees">
						{this.state.cafees.map((cafee, index) =>
							(<li key={index}>
								<Link to={'/cafees/' + cafee.id}>{cafee.name}</Link>
							</li>)
						)}
					</ul>
				</div>
			);
	}
}

export default CafeeIndex;
