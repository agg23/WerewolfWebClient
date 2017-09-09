class JoinGame extends React.Component {
	constructor(props) {
		super(props);
		this.gameController = props.gameController;

		if(this.gameController == null) {
			console.log("ERROR: Created Login component without required game controller");
		}

		this.handleGameIdChange = this.handleGameIdChange.bind(this);
		this.handleGamePasswordChange = this.handleGamePasswordChange.bind(this);
	    this.handleJoinGame = this.handleJoinGame.bind(this);
	    this.state = {gameId: -1, password: ""};
	}

	render() {
		return (
			// TODO: Add game list
			<div>
				<input onChange={this.handleGameIdChange}/>
				<input onChange={this.handleGamePasswordChange}/>
				<button onClick={this.handleJoinGame}>Join Game</button>
			</div>
		);
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
}