import { serviceProductDB } from '../test.js';
import { logger } from '../config/logger/index.js';

const getProducts = async (req, res) => {
  try {
    logger.info(`accessing the route: ${req.baseUrl}`);
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
    logger.error(`Error 500. ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const postProducts = async (req, res) => {
  try {
    logger.info(`accessing the route: ${req.baseUrl}`);
    if (!req.file) {
      logger.error('Error 400. Ingrese una imágen del producto');
      res.status(400).json({ error: 'Ingrese una imágen del producto' });
      throw new Error('Error 400. Debe ingresar una imágen del producto');
    }
    if (!req.body.productName || !req.body.price) {
      logger.error('Debe ingresar el nombre del producto y su respectivo precio');
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
      logger.error(`${responseFromSaveController.status}. ${responseFromSaveController.message}`);
      res.status(404).json({ error: responseFromSaveController.message });
    } else {
      res.status(201).json(responseFromSaveController);
    }
  } catch (error) {
    logger.error(`Error 500. ${error.message}`);
  }
};

const putProductsById = async (req, res) => {
  try {
    logger.info(`accessing the route: ${req.baseUrl}`);
    const { id } = req.params;
    const { productName, price } = req.body;
    if (!id) {
      logger.error('Error 404. Producto no encontrado');
      res.status(404).json({ error: 'Producto no encontrado' });
      throw new Error({ error: 'Producto no encontrado' });
    }

    if (!productName && !price && !req.file) {
      logger.error('Error 500. Por favor ingresa un valor a ser actualizado');
      return res.status(500).json({ error: 'Por favor ingresa un valor a ser actualizado' });
    }
    const product = {
      productName: productName || null,
      price: price || null,
      thumbnail: req.file?.originalname ?? null,
    };
    const responseFromUpdatecontroller = await serviceProductDB.updateById(id, product);
    if (responseFromUpdatecontroller?.message) {
      logger.error(
        `${responseFromUpdatecontroller.status}. ${responseFromUpdatecontroller.message}`
      );
      res.status(404).json({ error: responseFromUpdatecontroller.message });
    } else {
      res.status(200).json(responseFromUpdatecontroller);
    }
  } catch (error) {
    logger.error(`Error 500. ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const deleteProductsById = async (req, res) => {
  try {
    logger.info(`accessing the route: ${req.baseUrl}`);
    const { id } = req.params;
    const responseFromDeleteController = await serviceProductDB.deleteById(id);
    if (responseFromDeleteController?.message) {
      logger.error(
        `${responseFromDeleteController.status}. ${responseFromDeleteController.message}`
      );
      res.status(404).json({ error: responseFromDeleteController.message });
    } else {
      res.status(200).json(responseFromDeleteController);
    }
  } catch (error) {
    logger.error(`Error 500. ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export { getProducts, postProducts, putProductsById, deleteProductsById };
