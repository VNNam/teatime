const chatbox = document.getElementById('show-message');

var links = document.getElementById('showed-list').getElementsByTagName('a');
var formChat = document.getElementById('form-chat');
var inputChat = document.getElementById('message');
var showMembers = document.getElementById('list-members');
function addLinks() {
  for (let a of links) {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const src = a.getAttribute('src');
      formChat.setAttribute('action', src);
      getMessage(src);
      getListMembers(src.split('/')[4]);
    });
  }
}
function getListMembers(groupId) {
  axios.get(`/groups/${groupId}`).then(({ data }) => {
    const { members, error } = data;

    if (members.length) {
      showMembers.textContent = '';
      for (let m of members) {
        let p = document.createElement('p');
        p.textContent = m.user.fullName;
        showMembers.appendChild(p);
      }
    }
  });
}
function getMessage(href) {
  axios
    .get(href)
    .then(({ data }) => {
      const { messages, error } = data;
      const even = (i) => i % 2 === 0;
      if (messages) {
        const reverseList = ((arr) => {
          return Array.from(arr).reverse();
        })(messages);
        chatbox.textContent = '';

        var userId = formChat.getAttribute('action').split('/')[2];
        console.log(userId);
        for (let m of messages) {
          var className = 'text-left';
          console.log('user', m.user._id);
          var p = document.createElement('p');
          if (m.user._id == userId) {
            className = 'text-end';
            p.textContent = 'you: ' + m.messageContent;
          } else {
            p.textContent = m.user.fullName + ': ' + m.messageContent;
          }
          p.setAttribute('class', className);
          chatbox.appendChild(p);
        }
      }
    })
    .catch((error) => console.log(error));
}
addLinks();
formChat.addEventListener('submit', (e) => {
  e.preventDefault();
  axios
    .post(formChat.getAttribute('action'), { message: inputChat.value })
    .then((data) => {
      var p = document.createElement('p');
      p.setAttribute('class', 'text-end');
      p.textContent = 'You: ' + inputChat.value;
      chatbox.appendChild(p);
      inputChat.value = '';
      chatbox.scrollTo(0, chatbox.scrollHeight);
    });
});
