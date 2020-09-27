import { Vector } from './vector'
import { Game } from './game'

export class Factorie {
	games: Array<Game> = []

	constructor() {

	}

	addNewGame(newGame:Game) {
		this.games.push(newGame)
	}
}