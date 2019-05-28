const express = require('express')
const socket = require('socket.io')

// App setup
const app = express()
const server = app.listen(process.env.PORT, () => {
	console.log('listening to ' + process.env.PORT)
})

// Static files
app.use(express.static('public'))

// Socket setup
const io = socket(server)

io.on('connection', (socket) => {
	console.log('made socket connection')

	socket.on('chat', (data) => {
		io.sockets.emit('chat', data)
	})

	socket.on('typing', (data) => {
		console.log(data)
		socket.broadcast.emit('typing', data)
	})
})
