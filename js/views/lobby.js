class Lobby extends React.Component {
	constructor(props) {
		super(props);

		this.handleJoinGame = this.handleJoinGame.bind(this);

		this.state = {showPopup: false, popup: null};
	}

	render() {
		return (
			<div>
				<div>
					<button onClick={this.handleJoinGame}>Join Game</button>
					<button onClick={this.handleHostGame}>Host Game</button>
				</div>
				{this.state.showPopup ? 
					<Popup
						text="Close Me"
						// closePopup={this.togglePopup.bind(this)}
						popup={this.state.popup}
					/>
					: null
				}
			</div>
		);
	}

	handleJoinGame(event) {
		// TODO: Call displayPopup() with join game component
		// let joinGame = new JoinGame({gameController: this.gameController});
		let joinGame = <JoinGame />
		this.displayPopup(joinGame);
	}

	handleHostGame(event) {
		// TODO: Call displayPopup() with host game component
	}

	displayPopup(popup) {
		this.setState({showPopup: true, popup: popup});
	}
}