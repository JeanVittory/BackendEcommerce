const errorContainer = document.querySelector('#errorContainer');
const quantityCart = document.querySelector('#qntyCart');
const cards = document.querySelector('#cards');
const productsTemplate = document.querySelector('#productsTemplate').content;
const fragment = document.createDocumentFragment();
const productCard = document.querySelector('#card');
const { origin } = window.location;

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

document.addEventListener('DOMContentLoaded', async (e) => {
  quantityCart.textContent = 0;
  const responseDataProducts = await fetch(`${origin}/api/v1/productos`);
  const dataProducts = await responseDataProducts.json();
  if (!dataProducts.length) {
    errorContainer.classList.remove('hidden');
    const message = document.createElement('p');
    message.appendChild(
      document.createTextNode(
        'En este momento no tenemos productos en stock, comunicate con un administrador para que actualice la lista de productos.'
      )
    );
    errorContainer.appendChild(message);
  } else {
    errorContainer.classList.add('hidden');
    dataProducts.forEach((product) => {
      productsTemplate.querySelector('img').setAttribute('src', product.thumbnail);
      productsTemplate.querySelector('img').setAttribute('alt', `${product.productName}`);
      productsTemplate.querySelector('figcaption').textContent = product.productName;
      productsTemplate.querySelector('p').textContent = `$${product.price}`;
      productsTemplate.querySelector('.buyButton').setAttribute('data-productid', product.id);
      productsTemplate.querySelector('.deleteButton').setAttribute('data-productid', product.id);
      let clone = document.importNode(productsTemplate, true);
      fragment.appendChild(clone);
    });
    cards.appendChild(fragment);
  }
});

document.addEventListener('click', async (e) => {
  if (e.target.matches('#btnLogout')) {
    try {
      const response = await fetch(`${origin}/api/v1/profile/logout`, {
        method: 'POST',
      });
      if (response.redirected) {
        location.href = response.url;
      }
    } catch (error) {
      toastyAlert(error.message);
    }
  }

  if (e.target.matches('.buyButton')) {
    if (quantityCart.textContent === '0') {
      try {
        const createCartResponse = await fetch(`${origin}/api/v1/carrito/`, {
          method: 'POST',
        });
        const dataCart = await createCartResponse.json();
        sessionStorage.setItem('cartId', dataCart.id);
        const addProductToCartResponse = await fetch(
          `${origin}/api/v1/carrito/${dataCart.id}/productos`,
          {
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            method: 'POST',
            body: JSON.stringify({ id: e.target.dataset.productid }),
          }
        );
        await addProductToCartResponse.json();

        quantityCart.textContent = parseInt(quantityCart.textContent) + 1;
        toastyAlert('You have added a product');
      } catch (error) {
        toastyAlert(error.message);
      }
    } else {
      try {
        const addProductToCartResponse = await fetch(
          `${origin}/api/v1/carrito/${sessionStorage.getItem('cartId')}/productos`,
          {
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            method: 'POST',
            body: JSON.stringify({ id: e.target.dataset.productid }),
          }
        );
        await addProductToCartResponse.json();
        quantityCart.textContent = parseInt(quantityCart.textContent) + 1;
        toastyAlert("You've added a product");
      } catch (error) {
        toastyAlert(error.message);
      }
    }
  }
  if (e.target.matches('.deleteButton')) {
    if (quantityCart.textContent === '0') {
      toastyAlert("there's not products in your cart");
    } else {
      try {
        const responseFromDelete = await fetch(
          `${origin}/api/v1/carrito/${sessionStorage.getItem('cartId')}/productos/${
            e.target.dataset.productid
          }`,
          {
            method: 'DELETE',
          }
        );
        const deleteData = await responseFromDelete.json();
        if (deleteData.code !== 0) {
          toastyAlert("You've deleted a product");
          quantityCart.textContent = parseInt(quantityCart.textContent) - 1;
        } else {
          toastyAlert("The product don't exist in your cart");
        }
      } catch (error) {
        toastyAlert(error.message);
      }
    }
  }

  if (e.target.matches('#btnOrder')) {
    const username = document.querySelector('#username');

    if (quantityCart.textContent <= '0') {
      toastyAlert('Your cart is empty!');
    } else {
      try {
        const responsefromOrder = await fetch(`${origin}/api/v1/order/`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({
            cartId: sessionStorage.getItem('cartId'),
            username: username.dataset.username,
          }),
        });
        if (responsefromOrder.ok) {
          const messageFromOrder = await responsefromOrder.json();
          toastyAlert(messageFromOrder.message);
          quantityCart.textContent = 0;
          sessionStorage.clear();
        }
      } catch (error) {
        toastyAlert(error.message);
      }
    }
  }
});
