var socket_io = require('socket.io');
var io = socket_io();
var Events = require('./events');

io.on(Events.SOCKET_CONNECT, function (socket) {
  console.log('A user connected');

  socket.on(Events.GROUP_CONNECT, ({ groupId }) => {
    socket.join(groupId);
  });
});

function boardcardToGroup(groupId, { message, userId }) {
  io.to(groupId).emit(Events.MESSAGE_ADD, { message, userId });
}

function boardcardAll(message) {
  io.sockets.emit(Events.MESSAGE_ADD, { message });
}

module.exports = { io, boardcardAll, boardcardToGroup };
