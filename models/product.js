const fs        = require('fs');
const dirPath   = require('../helpers/path');
const path      = require('path');
const Cart      = require('./cart');

const p = path.join(dirPath, 'data', 'products.json');

const getProductsFromFile = (callback) => {
    fs.readFile(p, (error, fileContent) => {
        let products = [];
        if (error) {
            return callback([]);
        }
        callback(JSON.parse(fileContent));
    })
}

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(
                    prod => prod.id === this.id
                );
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), error => {
                    console.log(error);
                });
            }
            else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), error => {
                    console.log(error);
                });
            }
        });
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        })
    }

    static deleteById(productId) {
        // tem que colocar a funçaõ de remover do carrinho;
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === productId);
            const updateProducts = products.filter(val => {
                return val.id !== productId;
            });
            fs.writeFile(p, JSON.stringify(updateProducts), err => {
                if (!err) {
                    Cart.deleteProduct(productId, product.price);
                }
            });
        })
    }
}