const btnLogout = document.querySelector('#btnLogout');
const errorContainer = document.querySelector('#errorContainer');
const cards = document.querySelector('#cards');
const productsTemplate = document.querySelector('#productsTemplate').content;
const fragment = document.createDocumentFragment();

const productCard = document.querySelector('#card');
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
    errorContainer.classList.add('hidden');
    data.forEach((product) => {
      productsTemplate
        .querySelector('img')
        .setAttribute('src', `/mainApp/images/${product.thumbnail}`);
      productsTemplate.querySelector('img').setAttribute('alt', `${product.productName}`);
      productsTemplate.querySelector('figcaption').textContent = product.productName;
      productsTemplate.querySelector('p').textContent = `$${product.price}`;
      let clone = document.importNode(productsTemplate, true);
      fragment.appendChild(clone);
    });
    cards.appendChild(fragment);
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
