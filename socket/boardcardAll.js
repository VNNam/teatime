var { io } = require('./connect');

function boardcardAll(message) {
  console.log('message', message);
  io.sockets.emit('new_message', { message });
}

module.exports = { boardcardAll };
