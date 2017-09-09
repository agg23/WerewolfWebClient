class MainView extends React.Component {
	constructor(props) {
		super(props);

		gameController.view = this;

		this.internalComponent = this.internalComponent.bind(this);
		this.handleGameIdChange = this.handleGameIdChange.bind(this);
		this.handleGamePasswordChange = this.handleGamePasswordChange.bind(this);
	    this.handleJoinGame = this.handleJoinGame.bind(this);
	    this.state = {mode: "login"};
	}

	render() {
		return (
			// TODO: Add game list
			<div>
				{this.internalComponent()}
			</div>
		);
	}

	internalComponent() {
		switch(this.state.mode) {
			case "login":
				return <Login presentingController={this} />
				break;
			case "connectGame":
				return (<div>
						<JoinGame presentingController={this} />
						<HostGame presentingController={this} />
					</div>);
				break;
		}
	}

	handleGameIdChange(event) {
		let gameId = parseInt(event.target.value);

		if(gameId != null && gameId != NaN) {
			this.setState({gameId: gameId});
		} else {
			// TODO: Show user facing error
			this.setState({gameId: -1});
		}
	}

	handleGamePasswordChange(event) {
		this.setState({password: event.target.value});
	}

	handleJoinGame(event) {
		gameController.joinGame(this.state.gameId, this.state.password);
	}

	// External

	updateMode(mode) {
		this.setState({mode: mode});
	}
}