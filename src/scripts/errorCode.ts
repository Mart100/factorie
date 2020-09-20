export enum ErrorCodes {
	x100 = "Game was not found"
}

export class ErrorCode {
	id: number
	text: string
	constructor(id:number, text:string) {
		this.id = id
		this.text = text
	}
}