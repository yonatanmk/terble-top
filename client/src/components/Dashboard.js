import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import * as actions from '../actions';

import Game from './Game';

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			playerNumber: '',
			bbgUsername: '',
		};

		this.onPlayerNumberChange = this.onPlayerNumberChange.bind(this);
	}

	componentDidUpdate() {
		const { fetchGames, user, games } = this.props;
		if (user && user.bbgUsername && games.length === 0) {
			fetchGames();
		}
	}

	onPlayerNumberChange(playerNumber) {
		this.setState({ playerNumber });
	}

	onBBGUsernameChange(bbgUsername) {
		this.setState({ bbgUsername });
	}

	onModalSubmit() {
		if (this.state.bbgUsername.length > 0) {
			this.props.createBBGUsername(this.state.bbgUsername);
		}
	}

	gamesList() {
		const { games } = this.props;

		return games.filter(game => this.checkPlayerNumber(game))
			.map(game => (
			<Game key={game.gameId} game={game} />
		));
	}

	checkPlayerNumber(game) {
		const { playerNumber } = this.state;
		return playerNumber === 'all' || (!!Number(playerNumber) && game.minPlayers <= Number(playerNumber) && game.maxPlayers >= Number(playerNumber));
	}

	render() {
		const { user } = this.props;
		return (
			<div>
			<Modal
				isOpen={!user || !user.bbgUsername}
				contentLabel="Modal"
			>
				<h1>Please enter your BoardGameGeek username</h1>
				<form style={{ marginTop: 10 }}>
					<input
						type="text"
						placeholder="Username"
						value={this.state.bbgUsername}
						onChange={e => this.onBBGUsernameChange(e.target.value)}
					/>
					<button value="Submit" onClick={() => this.onModalSubmit()}>Submit</button>
				</form>
			</Modal>
				<form style={{ marginTop: 10 }}>
					<input
						type="text"
						placeholder="Number of players"
						value={this.state.playerNumber}
						onChange={e => this.onPlayerNumberChange(e.target.value)}
					/>
				</form>
				{this.gamesList()}
			</div>
		);
	}
}

function mapStateToProps({ user, games }) {
	return { user, games };
}

export default connect(mapStateToProps, actions)(Dashboard);