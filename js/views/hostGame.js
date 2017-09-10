class HostGame extends React.Component {
	constructor(props) {
		super(props);

		this.presentingController = this.props.presentingController;
		
		this.handleGameNameChange = this.handleGameNameChange.bind(this);
		this.handleGamePasswordChange = this.handleGamePasswordChange.bind(this);
		this.handleCharacterSelect = this.handleCharacterSelect.bind(this);
	    this.handleHostGame = this.handleHostGame.bind(this);
	    this.state = {name: "", password: "", charactersInPlayIndexes: []};
	}

	render() {
		return (
			<div className="hostGame halfBlock">
				<h3>Host Game</h3>
				Game Name: <input onChange={this.handleGameNameChange}/>
				Game Password: <input onChange={this.handleGamePasswordChange} type="password"/>
				<button onClick={this.handleHostGame}>Host Game</button>
				<div className="characterDisplay">
					{gameController.availableCharacters.map(function(item, index) {
						return <Character character={item} id={index} key={index} onClick={this.handleCharacterSelect} />
					}.bind(this))}
				</div>
			</div>
		);
	}

	handleGameNameChange(event) {
		this.setState({name: event.target.value});
	}

	handleGamePasswordChange(event) {
		this.setState({password: event.target.value});
	}

	handleCharacterSelect(character) {
		let charactersInPlayIndexes = this.state.charactersInPlayIndexes;
		let id = character.id;

		let index = charactersInPlayIndexes.indexOf(id);

		if(index !== -1) {
			// Remove character
			this.state.charactersInPlayIndexes = this.removeFromArray(charactersInPlayIndexes, index);
		} else {
			// Add character
			this.state.charactersInPlayIndexes.push(id);
		}

		console.log("Selected character " + id);
		console.log(this.state.charactersInPlayIndexes);
	}

	handleHostGame(event) {
		// Convert indices into character names
		var characters = this.state.charactersInPlayIndexes.map(function(index) {
			return gameController.availableCharacters[index];
		});
		// TODO: Finish
		gameController.hostGame(this.state.name, this.state.password, characters);
	}

	/// Convenience

	removeFromArray(array, index) {
	    if (index !== -1) {
	        array.splice(index, 1);
	    }
	    return array;
	}
}