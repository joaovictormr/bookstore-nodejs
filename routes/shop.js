const express               = require('express');
const shopController        = require('../controllers/shop');
const userRoutes            = express.Router();

userRoutes.get('/', shopController.getIndex);
userRoutes.get('/products', shopController.getProducts);
userRoutes.get('/cart', shopController.getCart);
userRoutes.get('/checkout', shopController.getCheckout);

module.exports = userRoutes;