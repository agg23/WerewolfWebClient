class Parser {
	constructor() {
		this.successResponseObservers = {};
		this.failureResponseObservers = {};
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

	}

	parseGameResults(json, socket) {

	}

	parseCharacterUpdate(json, socket) {

	}

	/// Notifications

	registerSuccessResponseObserver(command, observer) {
		var observers = this.successResponseObservers[command];
		if(observers == null) {
			observers = [];
		} else {
			observers.push(observer);
		}

		this.successResponseObservers[command] = observers;
	}

	registerFailureResponseObserver(command, observer) {
		var observers = this.failureResponseObservers[command];
		if(observers == null) {
			observers = [];
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
			for(observer in commandObservers) {
				observer.notify(json);
			}
		}
	}
}