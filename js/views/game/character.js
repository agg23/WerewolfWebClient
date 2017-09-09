class Character extends React.Component {
	constructor(props) {
		super(props);

		this.id = this.props.id;

		this.presentingController = this.props.presentingController;

		this.handleClick = this.handleClick.bind(this);
		
	    this.state = {name: props.name};
	}

	render() {
		return (
			<div onClick={this.handleClick}>
				{this.state.name}
			</div>
		);
	}

	handleClick(event) {
		this.props.onClick(this);
	}
}