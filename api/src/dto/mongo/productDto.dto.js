export default class ProdutDTO {
  #id = null;
  constructor({ _id, productName, price, thumbnail }) {
    this.id = _id;
    this.productName = productName;
    this.price = price;
    this.thumbnail = thumbnail;
  }
}
export function productsDTO(products) {
  if (Array.isArray(products)) {
    return products.map((product) => {
      return { ...new ProdutDTO(product) };
    });
  } else {
    return { ...new ProdutDTO(products) };
  }
}
