import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

const Navigation = props => {
	return (
		<nav className="navbar navbar-expand-md navbar-dark bg-dark">
			<div className="container">
				<Link to='/' className="navbar-brand">I need help!</Link>

				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMain" aria-controls="navbarMain" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarMain">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							<NavLink exact to="/" className="nav-link">Login</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/room/fed19" className="nav-link">Room: FED19</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default withRouter(Navigation);
