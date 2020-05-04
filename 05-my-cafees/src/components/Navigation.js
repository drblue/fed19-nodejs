import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navigation() {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container">
				<Link to="/" className="navbar-brand">
					Fika <span role="img" aria-label="a coffee cup">☕️</span><span role="img" aria-label="a cookie with chocholate pieces">🍪</span>
				</Link>

				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item active">
							<NavLink to="/" className="nav-link">Alla caféer</NavLink>
						</li>
					</ul>
				</div>
			</div>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
		</nav>
	)
}

export default Navigation;
