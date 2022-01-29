var password = document.getElementById('password'),
  confirmpassword = document.getElementById('confirmpassword');
function validatePassword() {
  if (password.value != confirmpassword.value) {
    confirmpassword.style = 'border:0.1em solid red';
    confirmpassword.setCustomValidity('Passwords do not match');
  } else {
    confirmpassword.setCustomValidity('');
    confirmpassword.style = '';
  }
}
password.onchange = validatePassword;
confirmpassword.onchange = validatePassword;
