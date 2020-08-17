import React from 'react';
import './App.scss';

function App() {
	return (
		<div id="App">
			<nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
				<div className="container">
					<a className="navbar-brand" href="#">Halp! 😨</a>
						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMain" aria-controls="navbarMain" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>

					<div className="collapse navbar-collapse" id="navbarMain">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item active">
								<a className="nav-link" href="#">Register</a>
							</li>
							<li className="nav-item active">
								<a className="nav-link" href="#">Login</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>

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
