class Popup extends React.Component {
	render() {
		console.log(this.props.popup);
		return (
			<div className="popup">
				<h1>{this.props.text}</h1>
				<button onClick={this.props.closePopup}>close me</button>
				{this.props.popup}
			</div>
		);
	}
}