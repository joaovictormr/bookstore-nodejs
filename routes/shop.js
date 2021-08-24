const express   = require('express');
const path      = require('path');
const rootDir   = require('../helpers/path');
const adminData = require('./admin');

const userRoutes = express.Router();

userRoutes.get('/', (req, res, next) => {
    console.log(adminData.products);
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = userRoutes;