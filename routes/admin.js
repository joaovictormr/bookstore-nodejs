const express               = require('express');
const products              = [];
const router                = express.Router();
const adminController    = require('../controllers/admin');

router.get('/add-product', adminController.getAddProducts);

router.get('/products', adminController.getProducts);

router.post('/add-product', adminController.postAddProducts);

router.get('/edit-product/:productId', adminController.getEditProducts);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;