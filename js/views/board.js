class Board extends React.Component {
	constructor(props) {
		super(props);

		this.presentingController = this.props.presentingController;

		this.handleReady = this.handleReady.bind(this);
		this.handleClearSelection = this.handleClearSelection.bind(this);
		this.handleSelection = this.handleSelection.bind(this);
		this.handleExitLobby = this.handleExitLobby.bind(this);

		this.state = {name: gameController.gameName, id: gameController.gameId, gameState: gameController.gameState, players: this.sortedPlayers(), charactersInPlay: gameController.charactersInPlay, 
			seenAssignments: gameController.seenAssignments, selectedPlayers: []};
	}

	render() {
		return (
			<div>
				<div>
					<p>Game Name: {this.state.name}</p>
					<p>Game ID: {this.state.id}</p>
					<p>Characters In Play: {this.state.charactersInPlay.toString()}</p>
					<p>{function(gameState) {
						switch(gameState) {
							case "night":
								return "Night";
							case "discussion":
								return "Discussion";
							case "lobby":
								return "Final Results";
						}}(this.state.gameState)}</p>
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

							let character = this.state.gameState == "lobby" ? gameController.finalCharacterForPlayerId(player.id) : gameController.seenCharacterForPlayerId(player.id);

							if(character == null) {
								character = "unknown";
							}

							return (<div key={player.id}>
									<Character name={character} id={player.id} onClick={this.handleSelection} />
									{nickname}
								</div>);
						}.bind(this))}
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
								if(gameController.lastKnownCharacter != null) {
									character = gameController.lastKnownCharacter;
								} else {
									character = gameController.character;
								}
							} else {
								let seenCharacter = this.state.gameState == "lobby" ? gameController.finalCharacterForPlayerId(player.id) : gameController.seenCharacterForPlayerId(player.id);

								if(seenCharacter != null) {
									character = seenCharacter;
								}
							}

							return (<div key={player.id}>
									<Character name={character} id={player.id} onClick={this.handleSelection} />
									{nickname}
								</div>);
						}.bind(this))}
					</div>
				</div>
				<div>
					{function(board, state) {
						if(state == "lobby") {
							return (<button onClick={board.handleExitLobby}>Exit To Lobby</button>)
						} else {
							return (<div>
									<button onClick={board.handleReady}>Ready Up</button>
									<button onClick={board.handleClearSelection}>Clear Selections</button>
								</div>)
						}
					}(this, this.state.gameState)}
				</div>
			</div>
		);
	}

	handleReady(event) {
		if(this.state.gameState == "night") {
			gameController.submitSelections(this.state.selectedPlayers);
		} else {
			gameController.readyUp();
		}
	}

	handleClearSelection(event) {
		// TODO: Finish
	}

	handleSelection(character) {
		let id = character.id;

		let selectedPlayers = this.state.selectedPlayers;

		let index = selectedPlayers.indexOf(id);

		if(index !== -1) {
			// Player previously selected
			this.setState({selectedPlayers: this.removeFromArray(selectedPlayers, index)});
		} else {
			// Add player to selection (if allowed)
			let player = gameController.playerForId(id);

			if(player == null ||
				this.state.selectedPlayers.length + 1 > gameController.selectionCount ||
				gameController.selectionType == "none" ||
				(gameController.selectionType == "humanOnly" && !player.isHuman) ||
				(gameController.selectionType == "nonHumanOnly" && player.isHuman) ||
				(!gameController.canSelectSelf && id == gameController.userId)) {
					// Do nothing
					return;
			}

			selectedPlayers.push(id);

			if(selectedPlayers.length == gameController.selectionCount) {
				// TODO: Enable ready button
			} else {
				// TODO: Disable ready button
			}

			this.setState({selectedPlayers: selectedPlayers});
		}

		console.log("Selected player " + id);
		console.log(this.state.selectedPlayers);
	}

	handleExitLobby(event) {
		this.presentingController.updateMode("lobby");
	}

	updateGameState() {
		this.setState({name: gameController.gameName, id: gameController.gameId, gameState: gameController.gameState, players: this.sortedPlayers(), charactersInPlay: gameController.charactersInPlay,
			seenAssignments: gameController.seenAssignments});
	}

	/// Convenience

	sortedPlayers() {
		return gameController.players.sort(function(lhs, rhs) {
			return lhs.id - rhs.id;
		});
	}

	/// Convenience

	removeFromArray(array, index) {
	    if (index !== -1) {
	        array.splice(index, 1);
	    }
	    return array;
	}
}