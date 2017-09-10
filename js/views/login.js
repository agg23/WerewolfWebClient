class Login extends React.Component {
	constructor(props) {
		super(props);

		this.presentingController = this.props.presentingController;

		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.state = {username: "", passsword: ""};
	}

	render() {
		return (
			<div className="login">
				<h3>Login</h3>
				<form onSubmit={this.handleSubmit}>
					Username: <input onChange={this.handleUsernameChange}/>
					<p>Password: <input onChange={this.handlePasswordChange}/></p>
					<button>Login</button>
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

	handleSubmit(event) {
		event.preventDefault();
		gameController.login(this.state.username, this.state.password);
	}
}