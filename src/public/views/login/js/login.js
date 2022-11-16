const btnLogin = document.querySelector('#btn-login');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const registerBtn = document.querySelector('#registerBtn');
const role = document.querySelector('#role');
const { origin } = window.location;

document.addEventListener('DOMContentLoaded', () => {
  if (document.cookie === 'redirected=true') {
    Toastify({
      text: 'your session expired!',
      className: 'alert',
      style: {
        background: 'linear-gradient(to right, #efefbb, #d4d3dd)',
        color: '#28282B',
        fontFamily: 'monospace',
      },
    }).showToast();
  }
});

document.addEventListener('click', async (e) => {
  if (e.target.matches('#btn-login')) {
    e.preventDefault();
    const credentialsFromUser = {
      username: username.value,
      password: password.value,
      role: role.value,
    };

    if (credentialsFromUser.username !== '' && credentialsFromUser.password !== '') {
      try {
        const response = await fetch(`${origin}/api/v1/profile`, {
          method: 'POST',
          body: JSON.stringify(credentialsFromUser),
          headers: {
            'Content-type': 'application/json',
          },
        });
        if (response.status === 401) {
          Toastify({
            text: 'invalid password or username, please retry',
            className: 'alert',
            style: {
              background: 'linear-gradient(to right, #eb5757, #000000)',
              color: 'white',
              fontFamily: 'monospace',
            },
          }).showToast();
        }
        if (response.redirected) {
          location.href = response.url;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  if (e.target.matches('#registerBtn')) {
    e.preventDefault();
    location.href = `${origin}/api/v1/register/`;
  }
});
