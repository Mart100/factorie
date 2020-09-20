import express from 'express'
import Socket from 'socket.io'
import { AddressInfo } from 'net'

import { Factorie } from './scripts/factorie'
import { Game } from './scripts/game'
import { ErrorCode, ErrorCodes } from './scripts/errorCode'

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
	interface joinGameRequest {
		gameID: String
		password?: String
		username: String
	}

	socket.on('joinGame', async (joinGameData:joinGameRequest, callback) => {

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


})

