import { generateProducts } from '../tools/productsByFaker.tools.js';
import { randomNumbers } from '../tools/functions.tools.js';
import { fork } from 'child_process';

const getProducts = (req, res) => {
  try {
    const { quantity } = req.params;
    const quantityValidation = quantity === undefined ? 5 : +quantity;
    let products = [];
    for (let quantityIterated = 0; quantityIterated < quantityValidation; ++quantityIterated) {
      let objProduct = generateProducts();
      products.push(objProduct);
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'something went wrong faking data' });
  }
};

const getTechInfo = (req, res) => {
  return res.status(200).json({
    entranceArguments: null,
    exec: process.execPath,
    platform: process.platform,
    processId: process.pid,
    nodeVersion: process.version,
    directory: process.cwd(),
    memoryUsage: `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`,
  });
};

const getRandomNumbers = (req, res) => {
  const { quantity } = req.query;
  const maxNumbers = +quantity || 20000;
  if (maxNumbers) {
    const forkProcess = fork('./src/tools/functions.tools.js');
    forkProcess.send({ action: 'go', value: maxNumbers });
    forkProcess.on('message', (data) => {
      return res.json({ data });
    });
  }
};

const getDataTest = (req, res) => {
  return res.json('helloworld');
};

export { getProducts, getTechInfo, getRandomNumbers, getDataTest };
