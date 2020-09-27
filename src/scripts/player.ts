import { Vector } from './vector'

export interface PlayerOptions {
	username: string
	id: string
}

export class Player {
	position: Vector
	username: string
	id: string

	constructor(playerOptions:PlayerOptions) {
		this.position = new Vector(0, 0);
		this.username = playerOptions.username
		this.id = playerOptions.id
	}
} 