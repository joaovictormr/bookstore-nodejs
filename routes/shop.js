const express   = require('express');
const path      = require('path');
const rootDir   = require('../helpers/path');
const adminData = require('./admin');

const userRoutes = express.Router();

userRoutes.get('/', (req, res, next) => {
    const products = adminData.products;
    res.render('shop', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
  
module.exports = userRoutes;