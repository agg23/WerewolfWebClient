var express = require('express'),
	app = express(),
	server = require('http').createServer(app)
	io = require('socket.io').listen(server);

server.listen(3000);

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/index.html')
});

io.sockets.on('connection', function(socket) {
	socket.on('createAccount', function(data) {
		io.sockets.emit('accountCreated', data);
	});

	socket.on('signIn', function(data) {
		io.sockets.emit('userSignedIn', data);
	});

	socket.on('setNickname', function(data) {
		io.sockets.emit('gotNickname', data);
	});

	socket.on('joinGame', function(data) {
		io.sockets.emit('joinedGame', data);
	});

	socket.on('hostGame', function(data) {
		io.sockets.emit('hostedGame', data);
	});
})