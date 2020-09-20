import { Vector } from './vector'
import { Grid, GridTile} from './grid'

export class Building {
	pos: GridTile
	name: string
	constructor(name:string, pos:GridTile) {
		this.name = name
		this.pos = pos

	}
}