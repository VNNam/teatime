var pinnedElem = document.getElementById('pinned-message');
const socket = io();

socket.on('room1', (value) => {
  pinnedElem.textContent = value.message;
  socket.emit('let', 'get the messaage');
});
