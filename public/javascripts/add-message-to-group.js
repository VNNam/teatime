var formChat = document.getElementById('form-chat');
var inputChat = document.getElementById('message');

var USER_ID = sessionStorage.getItem('userId');
var GROUP_ID = sessionStorage.getItem('groupId');

const CREATE_END_POINT =
  window.location.origin + `/users/${USER_ID}/groups/${GROUP_ID}`;

formChat.addEventListener('submit', async (e) => {
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
});
