class JoinGame extends React.Component {
	constructor(props) {
		super(props);

		this.presentingController = this.props.presentingController;
		
		this.handleGameIdChange = this.handleGameIdChange.bind(this);
		this.handleGamePasswordChange = this.handleGamePasswordChange.bind(this);
	    this.handleJoinGame = this.handleJoinGame.bind(this);
	    this.state = {gameId: -1, password: ""};
	}

	render() {
		return (
			// TODO: Add game list
			<div>
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Users</th>
							<th>Date</th>
							<th>Requires Password</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>0</td>
							<td>Fake Game</td>
							<td>2</td>
							<td>Today</td>
							<td>True</td>
						</tr>
					</tbody>
				</table>
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