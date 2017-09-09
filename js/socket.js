class SocketController {
	constructor(parser) {
		this.parser = parser;
	}

	connect(url) {
		console.log("Connect");
		this.url = url;
		this.socket = new WebSocket(url);

		this.open();
	}

	open() {
		var socket = this.socket;
		console.log(socket);
		if(socket == null) {
			console.log("Attempted to open non-existent socket. Call connect() first");
			return;
		}

		socket.onopen = function(event) {
			console.log("Connected to server");
			// Set up ping
			setInterval(function() {
				socket.send("__ping__");
			}, 5000);
		};

		var parser = this.parser;

		socket.onmessage = function(event) {
			if(parser == null) {
				console.log("WARNING: Received message without parser")
				return;
			}

			parser.parseEvent(event, socket);
		};

		socket.onclose = function(event) {
			// TODO: Handle more thoroughly
			console.log("Client notified socket has closed", event);
		};
	}

	send(json) {
		this.socket.send(JSON.stringify(json));
	}
}