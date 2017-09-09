class Board extends React.Component {
	constructor(props) {
		super(props);

		this.handleReady = this.handleReady.bind(this);
		this.handleClearSelection = this.handleClearSelection.bind(this);

		this.state = {name: gameController.gameName, id: gameController.gameId, players: this.sortedPlayers(), charactersInPlay: gameController.charactersInPlay};
	}

	render() {
		return (
			<div>
				<div>
					<p>Game Name: {this.state.name}</p>
					<p>Game ID: {this.state.id}</p>
					<p>Characters In Play: {this.state.charactersInPlay.toString()}</p>
					<div>
						{this.state.players.map(function(player) {
							if(player.isHuman) {
								// Ignore human cards
								return;
							}

							var nickname = player.nickname;

							if(nickname == null || nickname == "") {
								nickname = "Nonhuman " + player.id;
							}

							return (<div>
									<Character name="unknown" />
									{nickname}
								</div>);
						})}
					</div>
					<div>
						{this.state.players.map(function(player) {
							if(!player.isHuman) {
								// Ignore nonhuman cards
								return;
							}

							var nickname = player.nickname;
							var character = "unknown";

							if(nickname == null || nickname == "") {
								nickname = "Player " + player.id;
							}

							if(player.id == gameController.userId) {
								// This card is me
								nickname += " (Me)";
								character = gameController.character;
							}

							return (<div>
									<Character name={character} />
									{nickname}
								</div>);
						})}
					</div>
				</div>
				<div>
					<button onClick={this.handleReady}>Ready Up</button>
					<button onClick={this.handleClearSelection}>Clear Selections</button>
				</div>
			</div>
		);
	}

	handleReady(event) {
		// TODO: Finish
		gameController.readyUp();
	}

	handleClearSelection(event) {
		// TODO: Finish
	}

	displayPopup(popup) {
		this.setState({showPopup: true, popup: popup});
	}

	updateGameState() {
		this.setState({name: gameController.gameName, id: gameController.gameId, players: this.sortedPlayers(), charactersInPlay: gameController.charactersInPlay});
	}

	/// Convenience

	sortedPlayers() {
		return gameController.players.sort(function(lhs, rhs) {
			return lhs.id - rhs.id;
		});
	}
}