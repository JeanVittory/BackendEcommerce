const btnLogin = document.querySelector('#btn-login');
const username = document.querySelector('#username');
const password = document.querySelector('#password');

document.addEventListener('click', async (e) => {
  if (e.target.matches('#btn-login')) {
    e.preventDefault();
    const credentialsFromUser = {
      username: username.value,
      password: password.value,
    };

    if (credentialsFromUser.username !== '' && credentialsFromUser.password !== '') {
      await fetch('api/v1/auth', {
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        method: 'POST',
        body: credentialsFromUser,
      });
    }
  }
});
