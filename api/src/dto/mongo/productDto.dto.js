import env from '../../config/env.config.js';

export default class ProdutDTO {
  constructor({ _id, productName, price, thumbnail }) {
    this.id = _id;
    this.productName = productName;
    this.price = price;
    this.thumbnail = `${env.APP_HOST}:${env.PORT}/mainApp/images/${thumbnail}`;
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
