import express from 'express'
import Socket from 'socket.io'
import { AddressInfo } from 'net'

import { Factorie } from './scripts/factorie'
import { Game } from './scripts/game'
import { ErrorCode, ErrorCodes } from './scripts/errorCode'

const app = express()

const defaultPort:Number = 3000


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

	 

})

