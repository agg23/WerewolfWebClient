class Board extends React.Component {
	constructor(props) {
		super(props);

		this.presentingController = this.props.presentingController;

		this.handleReady = this.handleReady.bind(this);
		this.handleSelection = this.handleSelection.bind(this);
		this.handleExitLobby = this.handleExitLobby.bind(this);

		this.selectionSuccess = this.selectionSuccess.bind(this);
		this.selectionFailure = this.selectionFailure.bind(this);

		this.state = {name: gameController.gameName, id: gameController.gameId, gameState: gameController.gameState, players: this.sortedPlayers(), charactersInPlay: gameController.charactersInPlay, 
			seenAssignments: gameController.seenAssignments, selectedPlayers: [], readyEnabled: gameController.selectionCount == 0};
	}

	componentDidMount() {
		gameController.socket.parser.registerSuccessResponseObserver("select", this.selectionSuccess);
		gameController.socket.parser.registerFailureResponseObserver("select", this.selectionFailure);
	}

	componentWillUnmount() {
		gameController.socket.parser.removeSuccessResponseObserver("select", this.selectionSuccess);
		gameController.socket.parser.removeFailureResponseObserver("select", this.selectionFailure);
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
					<div className="characters nonhuman">
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

							return (<Character key={player.id} character={character} id={player.id} userName={nickname} onClick={this.handleSelection} />);
						}.bind(this))}
					</div>
					<div className="characters human">
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

							return (<Character key={player.id} character={character} id={player.id} userName={nickname} onClick={this.handleSelection} />);
						}.bind(this))}
					</div>
				</div>
				<div className="selectionText">
					{function(board) {
						// TODO: Clean up code
						if(gameController.gameState == "lobby") {
							return;
						} else if(gameController.gameState == "discussion") {
							return "Ready up to leave discussion phase and see final results. Do not ready until you've voted!";
						}

						if(gameController.selectionCount == 0) {
							return "No selections are required. Ready up to complete your turn.";
						} else {
							var selectionText = "";

							if(gameController.selectionCount == 1) {
								selectionText = "1 selection";
							} else {
								// Must be two selections
								selectionText = "2 selections";
							}

							selectionText += " required.";

							if(gameController.selectionType == "humanOnly") {
								selectionText += " Selections may be made only from other players";
							} else if(gameController.selectionType == "nonHumanOnly") {
								selectionText += " Selections may be made only from the center cards";
							} else {
								selectionText += " Selections may be made from either the center cards or other players";
							}

							if(gameController.canSelectSelf) {
								selectionText += ", including yourself.";
							} else {
								selectionText += ".";
							}

							return selectionText;
						}
					}(this)}
				</div>
				<div>
					{function(board, state) {
						if(state == "lobby") {
							return (<button onClick={board.handleExitLobby}>Exit To Lobby</button>)
						} else {
							return (<button onClick={board.handleReady} disabled={!board.state.readyEnabled}>Ready Up</button>)
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

	handleSelection(character, div) {
		let id = character.id;

		let selectedPlayers = this.state.selectedPlayers;

		let index = selectedPlayers.indexOf(id);

		if(index !== -1) {
			// Player previously selected
			this.setState({selectedPlayers: this.removeFromArray(selectedPlayers, index)});
			div.removeClass("selected");
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
			div.addClass("selected");

			this.setState({selectedPlayers: selectedPlayers});
		}

		this.setState({readyEnabled: selectedPlayers.length == gameController.selectionCount});

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

	/// Notifications

	selectionSuccess(json) {
		console.log("Selection completed successfully");
		this.setState({selectedPlayers: []});

		// Deselect all cards
		$(".selected").removeClass("selected");
	}

	selectionFailure(json) {
		alert("Selection failed");
	}

	/// Convenience

	sortedPlayers() {
		return gameController.players.sort(function(lhs, rhs) {
			return lhs.id - rhs.id;
		});
	}

	removeFromArray(array, index) {
	    if (index !== -1) {
	        array.splice(index, 1);
	    }
	    return array;
	}
}