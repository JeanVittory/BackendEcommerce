import { serviceCartDB } from '../test.js';
import { serviceProductDB } from '../test.js';

const postCart = async (req, res) => {
  try {
    const responseFromCreateCart = await serviceCartDB.createCart();
    if (responseFromCreateCart instanceof Error)
      throw Error('Something went wrong in server');
    return res.status(201).json(responseFromCreateCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    const responseFromDeleteCart = await serviceCartDB.deleteById(id);
    if (responseFromDeleteCart?.status) {
      return res.status(responseFromDeleteCart.status).json({
        status: responseFromDeleteCart.status,
        message: responseFromDeleteCart.message,
      });
    }
    res.status(202).json({ message: 'Cart deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductsFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const responseFromGetProductsFromCart = await serviceCartDB.getById(id);
    if (responseFromGetProductsFromCart?.status) {
      return res.status(responseFromGetProductsFromCart.status).json({
        status: responseFromGetProductsFromCart.status,
        message: responseFromGetProductsFromCart.message,
      });
    }
    return res.status(200).json(responseFromGetProductsFromCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postProductToCart = async (req, res) => {
  try {
    const { id: idCart } = req.params;
    const { id: idProduct } = req.body;
    const productFromDatabaseProducts = await serviceProductDB.getById(
      idProduct
    );
    if (productFromDatabaseProducts.status) {
      return res.status(productFromDatabaseProducts.status).json({
        status: productFromDatabaseProducts.status,
        message: productFromDatabaseProducts.message,
      });
    }
    const responseFromPostProductsOnCart =
      await serviceCartDB.saveProductOnCart(
        idCart,
        productFromDatabaseProducts
      );
    if (responseFromPostProductsOnCart?.status) {
      return res.status(responseFromPostProductsOnCart.status).json({
        status: responseFromPostProductsOnCart.status,
        message: responseFromPostProductsOnCart.message,
      });
    }
    return res.status(201).json({ message: 'Product added' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteProductFromCart = async (req, res) => {
  try {
    const { id, id_prod } = req.params;
    const isProductInDb = await serviceProductDB.getById(id_prod);
    if (isProductInDb?.status) {
      return res.status(isProductInDb.status).json({
        status: isProductInDb.status,
        message: isProductInDb.message,
      });
    }
    const isCartInDb = await serviceCartDB.getById(id);
    if (isCartInDb?.status) {
      return res.status(isCartInDb.status).json({
        status: isCartInDb.status,
        message: isCartInDb.message,
      });
    }
    const resposeFromDeleteProductFromCart =
      await serviceCartDB.deleteProductFromCart(id, id_prod);
    if (resposeFromDeleteProductFromCart?.status) {
      return res.status(resposeFromDeleteProductFromCart.status).json({
        status: resposeFromDeleteProductFromCart.status,
        message: resposeFromDeleteProductFromCart.message,
      });
    }
    res.status(200).json({ message: 'product deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  postCart,
  deleteCart,
  getProductsFromCart,
  postProductToCart,
  deleteProductFromCart,
};
