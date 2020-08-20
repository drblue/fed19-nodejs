import React from 'react';
import axios from 'axios';

class Login extends React.Component {

	state = {
		email: '',
		password: '',
	}

	handleOnChange = e => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	}

	handleOnSubmit = e => {
		e.preventDefault();

		console.log("Authenticating with:", this.state);
		axios.post('http://localhost:3001/login', this.state)
		.then(res => {
			console.log("Got reponse to login:", res.data);
			const access_token = res.data.data.access_token;

			this.props.onLogin(access_token);
		})
		.catch(err => {
			console.error(err);
		});
	}

	render() {
		return (
			<div className="component-Login">
				<div className="text-center">
					<h1 className="">Need Halp Plz</h1>
					<p className="lead mb-5">Please log in.</p>
				</div>

				<form id="login-form" onSubmit={this.handleOnSubmit}>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input type="email" id="email" className="form-control" onChange={this.handleOnChange} placeholder="Enter your email" />
					</div>

					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" className="form-control" onChange={this.handleOnChange} placeholder="Please tell us your password 😉" />
					</div>

					<div className="d-flex justify-content-end">
						<button type="submit" className="btn btn-success">Login</button>
					</div>
				</form>
			</div>
		)
	}
}

export default Login;
