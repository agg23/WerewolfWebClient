class Parser {
	constructor() {
		this.successResponseObservers = {};
		this.failureResponseObservers = {};
		this.gameController = null;
	}

	parseEvent(event, socket) {
		if(event.data != '__pong__') {
			let json = $.parseJSON(event.data);
			this.parseJSON(json, socket);
		}
	}

	parseJSON(json, socket) {
		// TODO: Complete
		console.log(json);

		let command = json.command;

		switch(command) {
			case "response":
				this.parseResponse(json, socket);
				break;

			case "gameStarted":
				this.parseGameStarted(json, socket);
				break;
			case "gameUpdate":
				this.parseGameUpdate(json, socket);
				break;
			case "gameResults":
				this.parseGameResults(json, socket);
				break;
			case "characterUpdate":
				this.parseCharacterUpdate(json, socket);
				break;
		}
	}

	parseResponse(json, socket) {
		// TODO: Parse response
		let success = json.status == "success";
		this.notifyResponseObservers(success, json.task, json);
	}

	/// Game functionality

	parseGameStarted(json, socket) {

	}

	parseGameUpdate(json, socket) {
		this.gameController.gameUpdate(json.state, json.inPlay, json.players);
	}

	parseGameResults(json, socket) {

	}

	parseCharacterUpdate(json, socket) {
		this.gameController.characterUpdate(json.character, json.seenAssignments);
	}

	/// Notifications

	registerSuccessResponseObserver(command, observer) {
		var observers = this.successResponseObservers[command];
		if(observers == null) {
			observers = [observer];
		} else {
			observers.push(observer);
		}

		this.successResponseObservers[command] = observers;
	}

	registerFailureResponseObserver(command, observer) {
		var observers = this.failureResponseObservers[command];
		if(observers == null) {
			observers = [observer];
		} else {
			observers.push(observer);
		}

		this.failureResponseObservers[command] = observers;
	}

	notifyResponseObservers(success, command, json) {
		var responseObservers;
		if(success) {
			responseObservers = this.successResponseObservers;
		} else {
			responseObservers = this.failureResponseObservers;
		}

		let commandObservers = responseObservers[command];

		if(commandObservers != null && Array.isArray(commandObservers)) {
			for(var i = 0; i < commandObservers.length; i++) {
				commandObservers[i](json);
			}
		}
	}
}