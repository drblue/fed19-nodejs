import React from 'react';
import './styles/app.scss';
import axios from 'axios';

class App extends React.Component {

	state = {
		cafees: [],
	}

	componentDidMount() {
		axios.get('http://localhost:3001/api/cafees')
		.then(response => {
			this.setState({
				cafees: response.data,
			});
		})
		.catch(err => {
			console.error("Error when fetching all cafees.", err);
		});
	}

	render() {
		return (
			<div id="App">

				<nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
					<div className="container">
						<a className="navbar-brand" href="/">Fika <span role="img" aria-label="a coffee cup">☕️</span><span role="img" aria-label="a cookie with chocholate pieces">🍪</span></a>
						<div className="collapse navbar-collapse" id="navbarNav">
							<ul className="navbar-nav">
								<li className="nav-item active">
									<a className="nav-link" href="/">Alla caféer</a>
								</li>
							</ul>
						</div>
					</div>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
				</nav>

				<div className="container">
					<h1>Alla caféer</h1>

					<ul>
						{this.state.cafees.map((cafee, index) =>
							(<li className="" key={index}>
								<a className="" href="/">{cafee.name} ({cafee.id})</a>
							</li>)
						)}
					</ul>
				</div>
			</div>
		)
	}
}

export default App;
