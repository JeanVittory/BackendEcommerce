import { generateProducts } from '../tools/productsByFaker.tools.js';

const getProducts = (req, res) => {
  try {
    const { quantity } = req.params;
    const quantityValidation = quantity === undefined ? 5 : +quantity;
    let products = [];
    for (
      let quantityIterated = 0;
      quantityIterated < quantityValidation;
      ++quantityIterated
    ) {
      let objProduct = generateProducts();
      products.push(objProduct);
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'something went wrong faking data' });
  }
};

export { getProducts };
