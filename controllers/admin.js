const Product = require('../models/product');
const ProductModel = require('../models/product');

exports.getAddProducts = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
}

exports.postAddProducts = (req, res, next) => {
    const title         = req.body.title;
    const imageUrl      = req.body.imageUrl;
    const price         = req.body.price;
    const description   = req.body.description;
    const product       = new Product(title, price, description, imageUrl, null, req.user._id);
    product
        .save()
        .then(result => {
            console.log(result);
            console.log("Product created sucessfully")
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
}

exports.getEditProducts = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    ProductModel.findById(req.params.productId)
    .then(product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    }).catch(err => console.log(err));
}

exports.getProducts = (req, res, next) => {
    ProductModel.fetchAll()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        })
        .catch(err => console.log(err));
}

exports.postEditProduct = (req, res, next) => {
    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updateDesc = req.body.description;

    const product = new ProductModel(updatedTitle, updatedPrice, updateDesc, updatedImageUrl, productId);

    product.save()
    .then(result => {
        console.log("UPDATED PRODUCT!!!");
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}

exports.postDeleteProduct = (req, res, next) => {
    ProductModel.deleteById(req.body.productId)
    .then(result => {
        console.log("PRODUCT DESTROYED");
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}
