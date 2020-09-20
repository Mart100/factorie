import { Vector } from './vector'

export class Player {
	position: Vector
	username: String
	constructor(username:String) {
		this.position = new Vector(0, 0);
		this.username = username
	}
}