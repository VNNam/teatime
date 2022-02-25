var socket_io = require('socket.io');
var io = socket_io();

io.on('connection', function (socket) {
  console.log('A user connected');
});

module.exports = { io };
