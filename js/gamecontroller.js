class GameController {
	constructor(socket) {
		this.socket = socket;
	}

	login(username, password) {
		if(username.length == 0) {
			console.log("WARNING: Attempting to log in with empty username");
			return;
		}
		
		this.socket.send({"command": "login", "username": username, "password": password});
	}
}