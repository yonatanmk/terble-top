import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import * as actions from '../actions';
import Game from './Game';
import { sortGames } from '../lib/game-utils';

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			playerNumber: '',
			bbgUsername: '',
		};
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

	onRefreshClick() {
		this.props.refreshGames();
	}

	get gamesList() {
		const { games } = this.props;
		const { playerNumber } = this.state;
		const filteredGames = games.filter(game => this.checkPlayerNumber(game));
		const sortedGames = sortGames(filteredGames, playerNumber);

		return sortedGames
			.map(game => (
				<Game
					key={game._id}
					game={game}
					getBestPlayers={() => this.getBestPlayers(game._id)}
					isBestPlayers={game.bestPlayers && game.bestPlayers === parseInt(playerNumber, 10)}
				/>
			));
	}

	getBestPlayers(gameId) {
		this.props.getBestPlayers(gameId);
	}

	checkPlayerNumber(game) {
		const { playerNumber } = this.state;
		return playerNumber === 'all' || (!!Number(playerNumber) && game.minPlayers <= Number(playerNumber) && game.maxPlayers >= Number(playerNumber));
	}

	render() {
		const { user, isFetching } = this.props;
		return (
			<div className="dashboard">
				<Modal
					isOpen={!isFetching && !!user && !user.bbgUsername}
					contentLabel="Modal"
					style={modalStyles}
				>
					<h1>Please enter your BoardGameGeek username</h1>
					<form style={{ marginTop: 10 }}>
						<button className="modal-submit" value="Submit" onClick={() => this.onModalSubmit()}>Submit</button>
						<div className="input-container">
							<input
								type="text"
								className="input"
								placeholder="Username"
								value={this.state.bbgUsername}
								onChange={e => this.onBBGUsernameChange(e.target.value)}
								/>
						</div>
					</form>
				</Modal>
				<form style={{ marginTop: 10 }} className="game-box silver search-form">
					<button className="refresh" onClick={() => this.onRefreshClick()}><p className="refresh-text">Refresh Games</p></button>
					<div className="input-container">
						<input
							type="text"
							className="input"
							placeholder="Number of players"
							value={this.state.playerNumber}
							onChange={e => this.onPlayerNumberChange(e.target.value)}
							/>
					</div>
				</form>
				{this.gamesList}
			</div>
		);
	}
}

const modalStyles = {
	content: {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
	}
}

function mapStateToProps({ user, games, isFetching }) {
	return { user, games, isFetching };
}

export default connect(mapStateToProps, actions)(Dashboard);
