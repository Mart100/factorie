let showHomePage:Function

let socket:any
let io:Function = require('socket.io-client')
(<any>window).socket = io();


(<any>window).showHomePage = () => {
	$('#homePage').fadeIn()
	
	$('#homePage .buttons .createnewgame').on('click', () => {
		$('#homePage .buttons').fadeOut(() => {
			$('#homePage .createGame').fadeIn()

			$('#homePage .createGame .confirmCreateGame').on('click', () => {
				let username = $('#homePage .createGame .username').val()
				let gameID = $('#homePage .createGame .gameID').val()
				let privateGame = $('#homePage .createGame .private').val()
				let password = $('#homePage .createGame .password').val()

				socket.emit('createGame', {
					username,
					id: gameID,
					password,
					private: privateGame
				}, (callbackData:any) => {

				})
			})
		})
		
	})
}