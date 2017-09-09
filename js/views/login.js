class Login extends React.Component {
	constructor(props) {
		super(props);
		this.gameController = props.gameController;

		if(this.gameController == null) {
			console.log("ERROR: Created Login component without required game controller");
		}

		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.state = {username: "", passsword: ""};
	}

	render() {
		return (
			<div>
				<h3>Login</h3>
				<form onSubmit={this.handleSubmit}>
					<input onChange={this.handleUsernameChange}/>
					<input onChange={this.handlePasswordChange}/>
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
		this.gameController.login(this.state.username, this.state.password);
	}
}