import React from 'react';
import Navigation from './components/navigation/Navigation';
import './App.scss';

function App() {
	return (
		<div id="App">
			<Navigation />

			<main role="main" className="container">

				<div className="">
					<h1>Need Halp Plz</h1>
					<p className="lead">Please log in.</p>
				</div>

			</main>
		</div>
	);
}

export default App;
