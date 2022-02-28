var pinnedElem = document.getElementById('pinned-message');
var showMessage = document.getElementById('show-message');
const socket = io();

socket.on('new_message', (messageObject) => {
  const p = document.createElement('p');
  p.innerText = messageObject.message;
  showMessage.append(p);
});

socket.on('room1', (value) => {
  pinnedElem.textContent = value.message;
  socket.emit('let', 'get the messaage');
});
