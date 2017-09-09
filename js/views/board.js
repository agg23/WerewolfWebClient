class Board extends React.Component {
	constructor(props) {
		super(props);

		this.handleReady = this.handleReady.bind(this);
		this.handleClearSelection = this.handleClearSelection.bind(this);
		this.handleSelection = this.handleSelection.bind(this);

		this.state = {name: gameController.gameName, id: gameController.gameId, players: this.sortedPlayers(), charactersInPlay: gameController.charactersInPlay, selectedPlayers: []};
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

							return (<div key={player.id}>
									<Character name="unknown" id={player.id} onClick={this.handleSelection} />
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
								character = gameController.character;
							}

							return (<div key={player.id}>
									<Character name={character} id={player.id} onClick={this.handleSelection} />
									{nickname}
								</div>);
						}.bind(this))}
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
		gameController.submitSelections(this.state.selectedPlayers);
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
			this.setState({selectedPlayers: removeFromArray(selectedPlayers, index)});
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

	/// Convenience

	removeFromArray(array, index) {
	    if (index !== -1) {
	        array.splice(index, 1);
	    }
	    return array;
	}
}