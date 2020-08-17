import React from 'react';

class Login extends React.Component {

	state = {
		name: '',
		location: '',
		schoolclass: 'FED19',
	}

	handleOnChange = e => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	}

	handleOnSubmit = e => {
		e.preventDefault();

		console.log("Refusing to submit form!");
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
						<label htmlFor="name">Name</label>
						<input type="text" id="name" className="form-control" onChange={this.handleOnChange} placeholder="Enter your name" />
					</div>

					<div className="form-group">
						<label htmlFor="location">Location</label>
						<input type="text" id="location" className="form-control" onChange={this.handleOnChange} placeholder="Please tell us where we can find you" />
					</div>

					<div className="form-group">
						<label htmlFor="schoolclass">Class</label>
						<select id="schoolclass" className="form-control" onChange={this.handleOnChange}>
							<option value="FED19">FED19</option>
							<option value="FED20">FED20</option>
							<option value="WCM19">WCM19</option>
							<option value="WCM20">WCM20</option>
						</select>
					</div>

					<div className="d-flex justify-content-end">
						<button type="submit" className="btn btn-success">Halp plz!</button>
					</div>
				</form>
			</div>
		)
	}
}

export default Login;
