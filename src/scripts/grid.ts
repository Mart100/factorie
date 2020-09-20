import { Vector } from './vector'
import { Building } from './building'

export class Grid {
	tiles: Array<Array<GridTile>>
	constructor() {
		this.tiles = []
	}
}

export class GridTile {
	pos: Vector
	building: Building | undefined

	constructor(pos:Vector) {
		this.pos = pos
	}
}