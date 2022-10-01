const tbody = document.querySelector('#tableBody');
document.addEventListener('DOMContentLoaded', async (e) => {
  const datafetched = await fetch('http://localhost:8080/api/v1/test/productos-test/5');
  const products = await datafetched.json();

  products.forEach((product) => {
    tbody.innerHTML += `<tr class = "trData">
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td class = "imgContainer"><img src = '${product.thumbnail}'</td>
    </tr>`;
  });
});
