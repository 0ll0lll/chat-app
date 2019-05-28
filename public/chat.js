// Make connection 
const socket = io.connect('https://bed-chat.herokuapp.com/')

// Query Dom
let output = document.getElementById('output'),
	handle = document.getElementById('handle'),
	message = document.getElementById('message'),
	btn = document.getElementById('send'),
	feedback = document.getElementById('feedback')

handle.value = localStorage.getItem('name')

// Emit socket events
function send() {
	socket.emit('chat', {
		name: handle.value,
		message: message.value
	})
	message.value = ''

	localStorage.setItem('name', handle.value)
}

btn.addEventListener('click', () => {
	send()
})

message.addEventListener('keypress', (e) => {
	if (e.which === 13) {
		send()
	} 
})

message.addEventListener('keyup', (e) => {
	socket.emit('typing', {
		name: handle.value,
		message: message.value
	})
}) 

// Listen for socket events
socket.on('typing', (data) => {
	
	if (data.message === '') {
		feedback.innerHTML = ''
	} else {
		feedback.innerHTML = `<p>${data.name} is typing...</p>`
	}	
})

socket.on('chat', (data) => {
	feedback.innerHTML = ''
	output.innerHTML += `<p class="name">${data.name}</p>`
	output.innerHTML += `<p class="message">${data.message}</p>`
	output.scrollTop = output.scrollHeight
})





