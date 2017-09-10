class MainView extends React.Component {
	constructor(props) {
		super(props);

		this.presentedController = null;

		gameController.view = this;

		this.internalComponent = this.internalComponent.bind(this);
		this.handleGameIdChange = this.handleGameIdChange.bind(this);
		this.handleGamePasswordChange = this.handleGamePasswordChange.bind(this);
	    this.handleJoinGame = this.handleJoinGame.bind(this);

		this.savePresentedReference = this.savePresentedReference.bind(this);

	    this.state = {mode: "login"};
	}

	render() {
		return (
			<div>
				{this.internalComponent()}
			</div>
		);
	}

	internalComponent() {
		switch(this.state.mode) {
			case "login":
				return (<div ref={this.savePresentedReference}>
						<Login presentingController={this} />
						<Register presentingController={this} />
					</div>);
			case "connectGame":
				return (<div ref={this.savePresentedReference}>
						<JoinGame presentingController={this} />
						<HostGame presentingController={this} />
					</div>);
			case "lobby":
				return <Lobby presentingController={this} ref={this.savePresentedReference} />;
			case "board":
				return <Board presentingController={this} ref={this.savePresentedReference} />;
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

	/// Convenience

	savePresentedReference(reference) {
		console.log(reference);
		this.presentedController = reference;
	}

	/// External

	updateMode(mode) {
		console.info("Updating view to " + mode);
		this.setState({mode: mode});
		this.updateGameState();
	}

	updateGameState() {
		if(this.presentedController instanceof Lobby) {
			this.presentedController.updateGameState();
		} else if(this.presentedController instanceof Board) {
			this.presentedController.updateGameState();
		}
	}
}