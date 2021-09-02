const ProductModel = require('../models/product');

exports.getAddProducts = (req, res, next) => {
    res.render('admin/products', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
}

exports.postAddProducts = (req, res, next) => {
    const product = new ProductModel(req.body.title);
    product.save();
    // products.push({ title: req.body.title });
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    ProductModel.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });
  }