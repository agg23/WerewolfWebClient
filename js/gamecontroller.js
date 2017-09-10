class GameController {
	constructor(socket, server) {
		this.socket = socket;
		this.server = server;

		this.availableCharacters = [];
		this.charactersInPlay = [];
		this.players = [];

		this.gameId = -1;
		this.gameName = "Unnammed Game";
		this.gameState = "lobby";

		this.userId = -1;
		this.character = "unknown";
		this.lastKnownCharacter = null;

		this.selectionType = "none";
		this.selectionCount = 0;
		this.canSelectSelf = false;

		this.seenAssignments = [];
		this.finalAssignments = [];

		this.authenticationCompleted = this.authenticationCompleted.bind(this);
		this.connectedGame = this.connectedGame.bind(this);

		// Register observers
		socket.parser.registerSuccessResponseObserver("login", this.authenticationCompleted);
		socket.parser.registerSuccessResponseObserver("register", this.authenticationCompleted);

		socket.parser.registerSuccessResponseObserver("hostGame", this.connectedGame);
		socket.parser.registerSuccessResponseObserver("joinGame", this.connectedGame);
	}

	/// User Functions

	login(username, password) {
		if(username.length == 0) {
			console.log("WARNING: Attempting to log in with empty username");
			return;
		}

		this.socket.send({"command": "login", "username": username, "password": password});
	}

	register(username, password) {
		// TODO: Finish
	}

	hostGame(name, password, charactersInPlay) {
		// TODO: Finish
		if(name == null || name == "") {
			console.warn("Attempted to host game without name");
			return;
		}

		console.log("Creating game with name: " + name + ", password: " + password + ", characters: " + charactersInPlay);

		this.socket.send({"command": "hostGame", "name": name, "password": password, "inPlay" : charactersInPlay});
	}

	joinGame(id, password) {
		if(id == null || id < 0) {
			console.warn("Attempted to join game with invalid id");
			return;
		}

		if(password == "") {
			password = null;
		}

		console.log("Attempting to join game with id " + id);

		this.socket.send({"command": "joinGame", "id": id, "password": password});
	}

	readyUp() {
		this.socket.send({"command": "ready"});
	}

	submitSelections(selections) {
		var selectionType = "";
		if(selections.length == 1) {
			selectionType = "singleSelection";
		} else if (selections.length == 2) {
			selectionType = "doubleSelection";
		}

	   	this.socket.send({"command": "select", "type": selectionType, "selections": selections, "rotation": null});
	}

	/// Game State

	gameUpdate(id, state, inPlay, players) {
		this.charactersInPlay = inPlay.map(function(character) {
			return character.name;
		});
		this.players = players;

		console.log("Entering " + state);

		switch(state) {
			case "lobby":
				if(this.gameState == "discussion") {
					// Just left discussion, so don't update mode
					break;
				}
				this.view.updateMode("lobby");
				break;
			case "night":
			case "discussion":
				this.finalAssignments = [];
				this.view.updateMode("board");
				break;
		}

		this.gameState = state;

		this.view.updateGameState();

		// Explicitly don't update id until after view has been updated
		// This prevents users from seeing the wrong id at the end of a game
		this.gameId = id;
	}

	gameResults(assignments) {
		this.seenAssignments = [];

		for(var i = 0; i < assignments.length; i++) {
			let assignment = assignments[i];

			if(assignment.id == this.userId) {
				this.character = assignment.character;
				break;
			}
		}
		this.lastKnownCharacter = null;

		this.finalAssignments = assignments;

		this.view.updateGameState();
	}

	/// Player State

	characterUpdate(character, seenAssignments) {
		this.character = character.name;
		this.lastKnownCharacter = character.lastKnownName;

		this.selectionType = character.allowedActions.selectionType;
		this.selectionCount = character.allowedActions.selectionCount;
		this.canSelectSelf = character.allowedActions.canSelectSelf;

		this.seenAssignments = seenAssignments;

		this.view.updateGameState();
	}

	seenCharacterForPlayerId(id) {
		for(var i = 0; i < this.seenAssignments.length; i++) {
			let assignment = this.seenAssignments[i];

			if(assignment.id == id) {
				return assignment.character;
			}
		}

		return null;
	}

	finalCharacterForPlayerId(id) {
		for(var i = 0; i < this.finalAssignments.length; i++) {
			let assignment = this.finalAssignments[i];

			if(assignment.id == id) {
				return assignment.character;
			}
		}

		return null;
	}

	/// Notifications

	authenticationCompleted(json) {
		console.info("Completed authentication");

		this.availableCharacters = json.data.availableCharacters;
		this.userId = json.data.id;

		// Update view state
		this.view.updateMode("connectGame");
	}

	connectedGame(json) {
		console.info("Game successfully connected");

		this.gameId = json.data.id;

		this.view.updateGameState();
	}

	/// Convenience

	playerForId(id) {
		for(var i = 0; i < this.players.length; i++) {
			let player = this.players[i];

			if(player.id == id) {
				return player;
			}
		}

		return null;
	}
}