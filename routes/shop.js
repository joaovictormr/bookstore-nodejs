const express               = require('express');
const shopController        = require('../controllers/shop');
const userRoutes            = express.Router();

userRoutes.get('/', shopController.getIndex);

userRoutes.get('/products', shopController.getProducts);

userRoutes.get('/products/:productId', shopController.getProduct);

userRoutes.get('/cart', shopController.getCart);

userRoutes.post('/cart', shopController.postCart);

userRoutes.post('/cart-delete-item', shopController.postCartDeleteProduct);

userRoutes.get('/orders', shopController.getOrders);

userRoutes.get('/checkout', shopController.getCheckout);

module.exports = userRoutes;