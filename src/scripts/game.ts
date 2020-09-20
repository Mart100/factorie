import { Vector } from './vector'
import { Grid, GridTile} from './grid'
import { Player } from './player'

export interface GameOptions {
	id:string
	private:boolean
	password?:string
}

export class Game {
	grid: Grid
	id: string
	private: boolean
	password: string|undefined
	players: Array<Player> = []
	constructor(options:GameOptions) {

		this.id = options.id
		this.private = options.private
		this.password = options.password || undefined

		this.grid = new Grid()

	}
}