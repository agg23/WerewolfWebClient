class Character extends React.Component {
	constructor(props) {
		super(props);

		this.id = this.props.id;

		this.presentingController = this.props.presentingController;

		this.handleClick = this.handleClick.bind(this);
		
	    this.state = {character: props.character, userName: props.userName};
	}

	// Enables updating the component if props changes
	componentWillReceiveProps(nextProps) {
		this.setState({character: nextProps.character, userName: nextProps.userName});  
	}

	render() {
		return (
			<div className="characterContainer">
				<div className="character" onClick={this.handleClick}>
					<div className="characterCard" style={{backgroundImage: "url(img/cards/" + this.state.character + ".png)"}}></div>
					<div className="cardName">{this.state.character}</div>
					{function(character) {
						if(character.state.userName != null) {
							return (<div className="userName">{character.state.userName}</div>);
						} else {
							return "";
						}
					}(this)}
				</div>
			</div>
		);
	}

	handleClick(event) {
		this.props.onClick(this);
	}
}