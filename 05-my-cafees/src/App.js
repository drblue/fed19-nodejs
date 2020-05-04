import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './styles/app.scss';
import CafeesIndex from './components/Cafees/CafeeIndex';
import Navigation from './components/Navigation';
import NotFound from './components/NotFound';

class App extends React.Component {

	render() {
		return (
			<BrowserRouter>
				<div id="App">

					<Navigation />

					<div className="container my-3">
						<Switch>
							<Route exact path='/' component={CafeesIndex} />
							{/* <Route path='/cafees/:id' component={CafeesShow} /> */}
							<Route component={NotFound} />
						</Switch>
					</div>
				</div>
			</BrowserRouter>
		)
	}
}

export default App;
