var pinnedElem = document.getElementById('pinned-message');
var showMessage = document.getElementById('show-message');
var formChat = document.getElementById('form-chat');
var inputChat = document.getElementById('message');

const USER_ID = sessionStorage.getItem('USER_ID');
const GROUP_ID = sessionStorage.getItem('GROUP_ID');

const CREATE_END_POINT =
  window.location.origin + `/users/${USER_ID}/groups/${GROUP_ID}`;

const EVENTS = {
  SOCKET_CONNECT: 'connect',
  GROUP_CONNECT: 'group:connect',
  MESSAGE_ADD: 'message:add',
};

formChat.addEventListener('submit', submitNewMessage);

const socket = io();
socket.on(EVENTS.SOCKET_CONNECT, socketConnect);
socket.on(EVENTS.MESSAGE_ADD, aMessageIsCreated);

async function submitNewMessage(e) {
  try {
    e.preventDefault();

    await axios({
      method: 'post',
      url: CREATE_END_POINT,
      data: {
        message: inputChat.value,
      },
    });
  } catch (error) {
    alert(error.message);
  }
}

function socketConnect() {
  socket.emit(EVENTS.GROUP_CONNECT, {
    groupId: GROUP_ID,
  });
}

function aMessageIsCreated({ message, userId }) {
  const p = document.createElement('p');
  p.innerText = message.messageContent;
  showMessage.append(p);
}
