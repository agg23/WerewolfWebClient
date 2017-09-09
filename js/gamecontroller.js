class GameController {
	constructor(socket) {
		this.socket = socket;

		this.availableCharacters = [];
		this.charactersInPlay = [];
		this.users = [];

		this.userId = -1;

		// Register observers
		socket.parser.registerSuccessResponseObserver("login", this.authenticationCompleted.bind(this));
		socket.parser.registerSuccessResponseObserver("register", this.authenticationCompleted.bind(this));
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

		console.log("Attempting to join game with id " + id);

		this.socket.send({"command": "joinGame", "id": id, "password": password});
	}

	/// Game State

	gameStarted() {

	}

	gameUpdate() {

	}

	/// Notifications

	authenticationCompleted(json) {
		console.info("Completed authentication");

		this.availableCharacters = json.data.availableCharacters;
		this.userId = json.data.id;

		// Update view state
		this.view.updateMode("connectGame");
	}
}