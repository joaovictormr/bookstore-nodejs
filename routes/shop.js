const express             = require('express');
const productsController  = require('../controllers/products');
const userRoutes          = express.Router();

userRoutes.get('/', productsController.getProducts);
  
module.exports = userRoutes;