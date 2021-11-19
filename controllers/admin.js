const Product = require('../models/product');
const ProductModel = require('../models/product');

exports.getAddProducts = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
        isAuthenticated: req.isLoggedIn
    });
}

exports.postAddProducts = (req, res, next) => {
    const title         = req.body.title;
    const imageUrl      = req.body.imageUrl;
    const price         = req.body.price;
    const description   = req.body.description;
    const product       = new ProductModel({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
        userId: req.user //You could do like this: req.user._id but by default when you use the short sentence (req.user) Mongoose will look for the ObjectId property;
    });

    product
        .save()
        .then(result => {
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
            product: product,
            isAuthenticated: req.isLoggedIn
        });
    }).catch(err => console.log(err));
}

exports.getProducts = (req, res, next) => {
    ProductModel.find()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products',
                isAuthenticated: req.isLoggedIn
            });
        })
        .catch(err => console.log(err));
}

exports.postEditProduct = (req, res, next) => {
    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;

    ProductModel.findById(productId).then(product => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.description = updatedDesc;
        product.imageUrl = updatedImageUrl;
        return product.save();
    })
    .then(result => {
        console.log("UPDATED PRODUCT!!!");
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}

exports.postDeleteProduct = (req, res, next) => {
    ProductModel.findByIdAndRemove(req.body.productId)
    .then(result => {
        console.log("PRODUCT DESTROYED");
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}
