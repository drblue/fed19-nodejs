import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Login from './components/login/Login';
import Navigation from './components/navigation/Navigation';
import NotFound from './components/notfound/NotFound';
import Room from './components/room/Room';
import './App.scss';

class App extends React.Component {

	render() {
		return (
			<div id="App">
				<BrowserRouter>
					<Navigation />

					<main role="main" className="container my-5">
						<Switch>
							<Route exact path='/' component={Login} />
							<Route path='/room/:id' component={Room} />
							<Route component={NotFound} />
						</Switch>
					</main>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
