class Lobby extends React.Component {
	constructor(props) {
		super(props);

		this.presentingController = this.props.presentingController;

		this.handleReady = this.handleReady.bind(this);
		this.handleLeaveGame = this.handleLeaveGame.bind(this);

		this.state = {showPopup: false, popup: null, name: gameController.gameName, id: gameController.gameId, players: this.sortedPlayers()};
	}

	render() {
		return (
			<div>
				<div>
					<p>Game Name: {this.state.name}</p>
					<p>Game ID: {this.state.id}</p>
					<p>Connected Players:</p>
					<ul>
						{this.state.players.map(function(player) {
							var nickname = player.nickname;

							if(nickname == null || nickname == "") {
								nickname = (player.isHuman ? "Player " : "Nonhuman ") + player.id;
							}

							return (<li key={player.id}>{nickname} - {player.ready ? "Ready" : "Not ready"}</li>);
						})}
					</ul>
				</div>
				<div>
					<button onClick={this.handleReady}>Ready Up</button>
					<button onClick={this.handleLeaveGame}>Leave Game</button>
				</div>
				{this.state.showPopup ? 
					<Popup
						text="Close Me"
						// closePopup={this.togglePopup.bind(this)}
						popup={this.state.popup}
					/>
					: null
				}
			</div>
		);
	}

	handleReady(event) {
		gameController.readyUp();
	}

	handleLeaveGame(event) {
		gameController.leaveGame();
	}

	updateGameState() {
		this.setState({name: gameController.gameName, id: gameController.gameId, players: this.sortedPlayers()});
	}

	/// Convenience

	sortedPlayers() {
		return gameController.players.sort(function(lhs, rhs) {
			return lhs.id - rhs.id;
		});
	}
}