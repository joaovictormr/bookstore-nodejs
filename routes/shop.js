const express = require('express');
const path = require('path');
const rootDir = require('../helpers/path');


const userRoutes = express.Router();

userRoutes.get('/', (req, res, next) => {
    // res.send('<h1>Hello from Express!</h1>');
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = userRoutes;