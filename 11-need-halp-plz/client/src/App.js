import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Login from './components/login/Login';
import Navigation from './components/navigation/Navigation';
import NotFound from './components/notfound/NotFound';
import Room from './components/room/Room';
import RoomList from './components/room/RoomList';
import socket from './modules/socket-client';
import './App.scss';

class App extends React.Component {

	componentDidMount() {
	}

	componentWillUnmount() {
		console.log("Will disconnect from socket-server now...");
		socket.removeAllListeners();
		socket.disconnect();
	}

	render() {
		return (
			<div id="App">
				<BrowserRouter>
					<Navigation />

					<main role="main" className="container my-3">
						<Switch>
							<Route exact path='/' component={Login} />

							<Route path='/room' component={RoomList} />
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
