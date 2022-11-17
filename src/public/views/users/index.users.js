const btnLogout = document.querySelector('#btnLogout');
const errorContainer = document.querySelector('#errorContainer');
const { origin } = window.location;

document.addEventListener('DOMContentLoaded', async (e) => {
  const response = await fetch(`${origin}/api/v1/productos`);
  const data = await response.json();

  if (!data.length) {
    errorContainer.classList.remove('hidden');
    const message = document.createElement('p');
    message.appendChild(
      document.createTextNode(
        'En este momento no tenemos productos en stock, comunicate con un administrador para que actualice la lista de productos.'
      )
    );
    errorContainer.appendChild(message);
  } else {
    console.log(data);
  }
});

btnLogout.addEventListener('click', async (e) => {
  const response = await fetch(`${origin}/api/v1/profile/logout`, {
    method: 'POST',
  });
  if (response.redirected) {
    location.href = response.url;
  }
});
