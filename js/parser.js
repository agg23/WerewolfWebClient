class Parser {
	parseEvent(event, socket) {
		if(event.data != '__pong__') {
			let json = $.parseJSON(event.data);
			this.parseJSON(json, socket);
		}
	}

	parseJSON(json, socket) {
		// TODO: Complete
		console.log(json);

		switch(json.command) {
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
}