import express from 'express'
import Socket from 'socket.io'
import { AddressInfo } from 'net'

import { Factorie } from './scripts/factorie'
import { Game } from './scripts/game'
import { ErrorCode, ErrorCodes } from './scripts/errorCode'
import { Player } from './scripts/player'

const app = express()

const defaultPort:Number = 3000

const factorie = new Factorie()


// redirect all trafic to /public directory
app.use('/', express.static(__dirname + '/public'))
app.use('/:id', express.static(__dirname + '/public'))

// listen for requests on port
const server = app.listen(process.env.PORT || defaultPort, () => {


	let addressInfo = server.address() as AddressInfo
	let port:Number = addressInfo.port

  console.log('Factorie is running on port: ' + port)
});

// initialize io
const io = Socket(server);




// on user connection
io.on('connection', async (socket) => {


	// object the user sends to the server whenever they try to join a game
	interface JoinGameRequestData {
		gameID: string
		password?: string
		username: string
	}

	socket.on('joinGame', async (joinGameData:JoinGameRequestData, callback) => {

		let game:Game|undefined = factorie.games.find((g) => g.id == joinGameData.gameID)

		// if game with given gameID was not found, return
		if(game == undefined) return callback(new ErrorCode(100, ErrorCodes.x100))

		// if game is set to private
		if(game.private) {
			let allowAccess:boolean = false

			// if password on game and joinRequest are defined, and are the same. -> allowAccess
			if(
				game.password 
				&& joinGameData.password 
				&& game.password == joinGameData.password
				) allowAccess = true
		}


	})

	// object the user sends to the server whenver they try to create a new game
	interface createGameRequestData {
		gameID: string
		private: boolean
		password?: string
		username: string
	}

	socket.on('createGame', async(createGameData:createGameRequestData, callback) => {

		// try to find if game already exists
		let game:Game|undefined = factorie.games.find((g) => g.id == createGameData.gameID)
		if(game != undefined) return callback(new ErrorCode(101, ErrorCodes.x101))

		game = new Game({
			id: createGameData.gameID,
			private: createGameData.private,
			password: createGameData.password,
		})

		factorie.addNewGame(game)

		let player = new Player({
			id: socket.id,
			username: createGameData.username
		})
		
		game.addPlayer(player)

		console.log('Yo this just kinda fired::createGame')


	})


})
