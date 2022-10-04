const btnLogin = document.querySelector('#btn-login');
const username = document.querySelector('#username');
const password = document.querySelector('#password');

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
    };

    if (credentialsFromUser.username !== '' && credentialsFromUser.password !== '') {
      try {
        const response = await fetch('http://localhost:8080/api/v1/profile', {
          method: 'POST',
          body: JSON.stringify(credentialsFromUser),
          headers: {
            'Content-type': 'application/json',
          },
        });

        if (!response.ok) {
          Toastify({
            text: 'invalid password or username, please retry',
            className: 'alert',
            style: {
              background: 'linear-gradient(to right, #efefbb, #d4d3dd)',
              color: '#28282B',
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
});
