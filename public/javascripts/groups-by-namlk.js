var pinnedElem = document.getElementById('pinned-message');
var showMessage = document.getElementById('show-message');
var formChat = document.getElementById('form-chat');
var inputChat = document.getElementById('message');
var addGroupMemberButton = document.getElementById('add-group-member-button');
var invitedEmail = document.getElementById('invited-email');
var serverMessage = document.getElementById('server-message');
var userTypingEle = document.getElementById('user-typing');

const USER_ID = sessionStorage.getItem('USER_ID');
const GROUP_ID = sessionStorage.getItem('GROUP_ID');
const USER_NAME = sessionStorage.getItem('USER_NAME');

const EVENTS = {
  SOCKET_CONNECT: 'connect',
  GROUP_CONNECT: 'group:connect',
  MESSAGE_ADD: 'message:add',
  USER_IS_TYPING: 'user:typing',
};

formChat.addEventListener('submit', submitNewMessage);
addGroupMemberButton.addEventListener('click', handleAddGroupMemberButton);
inputChat.addEventListener('input', _.throttle(detectUserIsTyping, 2000));

const socket = io();
socket.on(EVENTS.SOCKET_CONNECT, socketConnect);
socket.on(EVENTS.MESSAGE_ADD, aMessageIsCreated);
socket.on(EVENTS.USER_IS_TYPING, typingNotify);

async function submitNewMessage(e) {
  try {
    e.preventDefault();
    const CREATE_END_POINT =
      window.location.origin + `/users/${USER_ID}/groups/${GROUP_ID}`;
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

async function handleAddGroupMemberButton(e) {
  try {
    const END_POINT =
      window.location.origin + `/groups/be-member-of-group-by-email`;
    const res = await axios({
      method: 'post',
      url: END_POINT,
      data: {
        groupId: GROUP_ID,
        email: invitedEmail.value,
      },
    });

    console.log(res);
    if (res.data.error) throw new Error(res.data.message);

    const message = res.data.message;
    serverMessage.innerText = message;
  } catch (error) {
    const message = error.message;
    serverMessage.innerText = message;
    serverMessage.style.color = 'red';
  }
}

function detectUserIsTyping(e) {
  socket.emit(EVENTS.USER_IS_TYPING, {
    groupId: GROUP_ID,
    username: USER_NAME,
  });
}

function typingNotify({ username }) {
  if (!userTypingEle.innerText) {
    const message = `${username} is typing...`;
    userTypingEle.innerText = message;
    setTimeout(() => {
      userTypingEle.innerText = null;
    }, 2000);
  }
}
