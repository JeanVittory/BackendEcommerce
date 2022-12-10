import { ProductService } from '../services/product.services.js';
import { logger } from '../config/logger/index.js';
import mongoose from 'mongoose';

const getProducts = async (req, res) => {
  try {
    logger.info(`accessing the route: ${req.baseUrl}`);
    const { id } = req.params;
    if (!id) {
      const responseFromGetAll = await ProductService.getAll();
      if (responseFromGetAll instanceof Error) {
        throw new Error('Something went Wrong with server');
      }
      res.status(200).json(responseFromGetAll);
    } else {
      if (!mongoose.isObjectIdOrHexString(id)) {
        return res.status(400).json({
          message:
            'Invalid ID product, mongo only accept 12 bytes, a string of 24 hex characters or an integer id value',
        });
      }
      const responseFromGetByIdController = await ProductService.getById(id);

      if (responseFromGetByIdController?.message) {
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
      logger.error('Error 400. Enter a product image');
      return res.status(400).json({ error: 'Enter a product image' });
    }
    if (!req.body.productName || !req.body.price) {
      logger.error('You must enter the name of the product and its respective price');
      return res.status(400).json({
        error: 'You must enter the name of the product and its respective price',
      });
    }
    const newProduct = {
      ...req.body,
      price: req.body.price,
      thumbnail: req.file.originalname,
    };
    const responseFromSaveController = await ProductService.save(newProduct);

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
    const responseFromUpdatecontroller = await ProductService.updateById(id, product);
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
    const responseFromDeleteController = await ProductService.deleteById(id);
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
