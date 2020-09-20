class Grid {
	tiles: Array<Array<GridTile>>
	constructor() {
		this.tiles = []
	}
}

class GridTile {
	pos: Vector
	building: Building | undefined

	constructor(pos:Vector) {
		this.pos = pos
	}
}