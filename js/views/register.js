class Register extends React.Component {
	constructor(props) {
		super(props);

		this.presentingController = this.props.presentingController;

		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
		this.handleNicknameChange = this.handleNicknameChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.state = {username: "", passsword: "", confirmPassword: "", nickname: ""};
	}

	render() {
		return (
			<div className="register halfBlock">
				<h3>Register</h3>
				<form onSubmit={this.handleSubmit}>
					Username: <input onChange={this.handleUsernameChange}/>
					<p>Password: <input onChange={this.handlePasswordChange} type="password"/></p>
					<p>Confirm Password: <input onChange={this.handleConfirmPasswordChange} type="password"/></p>
					<p>Nickname: <input onChange={this.handleNicknameChange}/>
						<button>Register</button></p>
		        </form>
			</div>
		);
	}

	handleUsernameChange(event) {
		this.setState({username: event.target.value});
	}

	handlePasswordChange(event) {
		this.setState({password: event.target.value});
	}

	handleConfirmPasswordChange(event) {
		this.setState({confirmPassword: event.target.value});
	}

	handleNicknameChange(event) {
		this.setState({nickname: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		if(this.state.password != this.state.confirmPassword) {
			alert("Passwords do not match. Please try again");
			return;
		}

		gameController.register(this.state.username, this.state.password, this.state.nickname);
	}
}