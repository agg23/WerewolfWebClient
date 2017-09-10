class JoinGame extends React.Component {
	constructor(props) {
		super(props);

		this.presentingController = this.props.presentingController;
		
		this.handleGameIdChange = this.handleGameIdChange.bind(this);
		this.handleGamePasswordChange = this.handleGamePasswordChange.bind(this);
		this.handleJoinGame = this.handleJoinGame.bind(this);
		this.handleJoinListGame = this.handleJoinListGame.bind(this);
		this.fetchGameList = this.fetchGameList.bind(this);
		this.gameForId = this.gameForId.bind(this);
		this.state = {gameId: -1, password: "", games: []};

		this.fetchGameList();
	}

	render() {
		return (
			<div className="joinGame halfBlock">
				<h3>Join Game</h3>
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Users</th>
							<th>Stage</th>
							<th>Password</th>
							<th><button onClick={this.fetchGameList}>Reload Games</button></th>
						</tr>
					</thead>
					<tbody>
						{this.state.games.map(function(game, index) {
							return (<tr key={index}>
									<td>{game.id}</td>
									<td>{game.name}</td>
									<td>{game.userCount}</td>
									<td>{function(state) {
										switch(state) {
											case "starting":
												return "Starting";
											case "lobby":
												return "Lobby";
											case "night":
												return "Night";
											case "discussion":
												return "Discussion";
										}
									}(game.state)}</td>
									<td>{game.passwordProtected ? "True" : "False"}</td>
									<td><button id={game.id} onClick={this.handleJoinListGame}>Join</button></td>
								</tr>)
						}.bind(this))}
					</tbody>
				</table>
				<h4>Manual Game Entry:</h4>
				Game ID: <input onChange={this.handleGameIdChange}/>
				Game Password: <input onChange={this.handleGamePasswordChange} type="password"/><button onClick={this.handleJoinGame}>Join Game</button>
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

	handleJoinListGame(event) {
		let id = event.target.id;

		var password = null;
		let game = this.gameForId(id);
		if(game != null && game.passwordProtected) {
			password = prompt("Enter the password for game " + id);

			if(password == "" || password == null) {
				alert("Cannot connect to game. No password provided");
				return;
			}
		}

		gameController.joinGame(id, password);
	}

	fetchGameList() {
		let url = "https://" + gameController.server + "/availableGames";
		$.get(url, function(data, status) {
			if(status == "success") {
				this.setState({games: data});
			} else {
				console.warn("Failed to load game list");
			}
		}.bind(this))
	}

	/// Convenience

	gameForId(id) {
		for(var i = 0; i < this.state.games.length; i++) {
			let game = this.state.games[i];

			if(id == game.id) {
				return game;
			}
		}

		return null;
	}
}