import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Game from './Game';

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			playerNumber: '',
		};

		this.onPlayerNumberChange = this.onPlayerNumberChange.bind(this);
	}

	componentDidMount() {
		this.props.fetchGames();
	}

	onPlayerNumberChange(playerNumber) {
		this.setState({ playerNumber });
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
		return !!Number(playerNumber) && game.minPlayers <= Number(playerNumber) && game.maxPlayers >= Number(playerNumber);
	}

	render() {
		console.log(this.props.games);
		return (
			<div>
				<form style={{ marginTop: 10 }}>
					<input
						type="text"
						name="firstname"
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

function mapStateToProps({ games }) {
	return { games };
}

export default connect(mapStateToProps, actions)(Dashboard);
