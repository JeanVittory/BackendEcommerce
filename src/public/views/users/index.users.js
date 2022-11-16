const btnLogout = document.querySelector('#btnLogout');

btnLogout.addEventListener('click', async (e) => {
  const response = await fetch(`${origin}/api/v1/profile/logout`, {
    method: 'POST',
  });
  if (response.redirected) {
    location.href = response.url;
  }
});
