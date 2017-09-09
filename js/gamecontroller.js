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
	}
}