import { serviceProductDB } from '../test.js';

const getProducts = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      const responseFromGetAll = await serviceProductDB.getAll();
      if (responseFromGetAll instanceof Error) {
        throw new Error('Something went Wrong with server');
      }
      res.status(200).json(responseFromGetAll);
    } else {
      const responseFromGetByIdController = await serviceProductDB.getById(id);
      if (responseFromGetByIdController?.status) {
        res.status(responseFromGetByIdController.status).json({
          status: responseFromGetByIdController.status,
          message: responseFromGetByIdController.message,
        });
      } else {
        res.status(200).json(responseFromGetByIdController);
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postProducts = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'ingrese una imágen del producto' });
      throw new Error('Error 400. Debe ingresar una imágen del producto');
    }
    if (!req.body.productName || !req.body.price) {
      res.status(404).json({
        error: 'Debe ingresar el nombre del producto y su respectivo precio',
      });
      throw new Error({
        error: 'Debe ingresar el nombre del producto y su respectivo precio',
      });
    }
    const newProduct = {
      ...req.body,
      price: req.body.price,
      thumbnail: req.file.originalname,
    };
    const responseFromSaveController = await serviceProductDB.save(newProduct);
    if (responseFromSaveController?.message) {
      res.status(404).json({ error: responseFromSaveController.message });
    } else {
      res.status(201).json(responseFromSaveController);
    }
  } catch (error) {
    console.log('error en controlador postProducts', error);
  }
};

const putProductsById = async (req, res) => {
  const { id } = req.params;
  const { productName, price } = req.body;
  if (!id) {
    res.status(404).json({ error: 'Producto no encontrado' });
    throw new Error({ error: 'Producto no encontrado' });
  }

  if (!productName && !price && !req.file) {
    return res.status(500).json({ error: 'Por favor ingresa un valor a ser actualizado' });
  }
  const product = {
    productName: productName || null,
    price: price || null,
    thumbnail: req.file?.originalname ?? null,
  };
  const responseFromUpdatecontroller = await serviceProductDB.updateById(id, product);
  if (responseFromUpdatecontroller?.message) {
    res.status(404).json({ error: responseFromUpdatecontroller.message });
  } else {
    res.status(200).json(responseFromUpdatecontroller);
  }
};
const deleteProductsById = async (req, res) => {
  const { id } = req.params;
  const responseFromDeleteController = await serviceProductDB.deleteById(id);
  if (responseFromDeleteController?.message) {
    res.status(404).json({ error: responseFromDeleteController.message });
  } else {
    res.status(200).json(responseFromDeleteController);
  }
};

export { getProducts, postProducts, putProductsById, deleteProductsById };
