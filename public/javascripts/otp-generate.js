var btnOTP = document.getElementById('generateOTP');
var infoElem = document.getElementById('OTPinfo');
btnOTP.onclick = (event) => {
  event.preventDefault();
  axios
    .get('/users/otp')
    .then((resp) => {
      var { updatedUser, error } = resp.data;
      if (updatedUser) {
        infoElem.textContent = 'OTP has sent to your email';
      }
      if (error) throw error;
    })
    .catch((error) => (infoElem.textContent = error.message));
};
