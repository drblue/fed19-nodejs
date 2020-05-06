import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CafeeShow extends React.Component {
	constructor(props) {
		super(props);
		this.cafeeId = this.props.match.params.id;
	}

	state = {
		cafee: false,
		error: false,
	}

	componentDidMount() {
		axios.get(`http://localhost:3000/api/cafees/${this.cafeeId}`)
		.then(response => {
			if (response.data.status !== 'success') {
				this.setState({
					error: response.data.message || 'An unknown error occurred.'
				});
				return;
			}

			this.setState({
				cafee: response.data.data.cafee,
				error: false,
			});
		})
		.catch(err => {
			console.error(`Error when fetching cafee with ID ${this.cafeeId}.`, err);
			this.setState({
				error: err.message
			});
		});
	}

	render() {
		const cafee = this.state.cafee;
		return this.state.error
			? (
				<div className="alert alert-warning">
					{this.state.error}
				</div>
			)
			: (
				<div id="cafee-index">
					{cafee ? (
						<div>
							<h1>{cafee.name}</h1>
							<h2>
								{
									cafee.address
										? `${cafee.address}, ${cafee.city}`
										: cafee.city
								}
							</h2>

							<hr />

							<h2>Ägare</h2>
							{cafee.owner ? (
								<p>{cafee.owner.first_name} {cafee.owner.last_name}</p>
							) : (
								<p>Caféet saknar ägare.</p>
							)}

							<hr />

							<h2>Kategorier</h2>
							<ul className="cafee-categories">
								{cafee.categories.map((category, index) => (
									<li key={index}>{category.name}</li>
								))}
							</ul>

						</div>
					) : (
						<h1>Laddar...</h1>
					)}
				</div>
			);
	}
}

export default CafeeShow;
