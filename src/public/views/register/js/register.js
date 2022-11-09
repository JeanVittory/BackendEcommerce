const signinBtn = document.querySelector('#signin-btn');
const signupBtn = document.querySelector('#signupBtn');
const email = document.querySelector('#emailInput');
const username = document.querySelector('#usernameInput');
const password = document.querySelector('#passwordInput');
const passwordConfirm = document.querySelector('#passwordConfirmInput');

const toastyAlert = (message) => {
  return Toastify({
    text: message,
    className: 'alert',
    style: {
      background: 'linear-gradient(to right, #eb5757, #000000)',
      color: 'wheat',
      fontFamily: 'monospace',
    },
  }).showToast();
};

const resetsInputs = [email, password, username, passwordConfirm];
const { origin } = window.location;

document.addEventListener('click', async (e) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (e.target.matches('#signin-btn')) {
    e.preventDefault();
    location.href = `${origin}/`;
  }

  if (e.target.matches('#signupBtn')) {
    e.preventDefault();
    if (
      email.value === '' ||
      password.value === '' ||
      username.value === '' ||
      passwordConfirm.value === ''
    ) {
      toastyAlert('please fill all the fields');
      return resetsInputs.forEach((item) => (item.value = ''));
    }

    if (!email.value.match(emailRegex)) {
      toastyAlert('Invalid email');
      return resetsInputs.forEach((item) => (item.value = ''));
    }

    if (password.value !== passwordConfirm.value) {
      toastyAlert("Your passwords don't match ");
      return resetsInputs.forEach((item) => (item.value = ''));
    }

    const userData = {
      email: email.value,
      username: username.value,
      password: password.value,
    };

    const response = await fetch(`${origin}/api/v1/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.status === 409) {
      toastyAlert('The user or the email already exist');
      return resetsInputs.forEach((item) => (item.value = ''));
    }
    location.href = `${origin}/`;
  }
});
