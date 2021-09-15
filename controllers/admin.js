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
    ProductModel.create({
            title: title,
            imageUrl: imageUrl,
            price: price,
            description: description
        })
        .then(result => {
            console.log("Product created sucessfully")
        })
        .catch(err => console.log(err));
}

exports.getEditProducts = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    ProductModel.findById(req.params.productId, product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    });
}

exports.getProducts = (req, res, next) => {
    ProductModel.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    });
}

exports.postEditProduct = (req, res, next) => {
    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updateDesc = req.body.description;
    const updatedProduct = new ProductModel(productId, updatedTitle, updatedImageUrl, updateDesc, updatedPrice);

    updatedProduct.save();
    res.redirect('/admin/products');
}

exports.postDeleteProduct = (req, res, next) => {
    ProductModel.deleteById(req.body.productId);
    res.redirect('/admin/products');
}
