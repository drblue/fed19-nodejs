import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './styles/app.scss';
import axios from 'axios';
import Navigation from './components/Navigation';
import NotFound from './components/NotFound';

class App extends React.Component {

	state = {
		cafees: [],
	}

	componentDidMount() {
		axios.get('http://localhost:3000/api/cafees')
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
			<BrowserRouter>
				<div id="App">

					<Navigation />

					<div className="container my-5">
						<Switch>
							{/* <Route exact path='/' component={CafeesIndex} />
							<Route path='/cafees/:id' component={CafeesShow} /> */}
							<Route component={NotFound} />
						</Switch>
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
			</BrowserRouter>
		)
	}
}

export default App;
