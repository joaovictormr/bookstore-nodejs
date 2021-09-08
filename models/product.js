const fs        = require('fs');
const dirPath   = require('../helpers/path');
const path      = require('path');

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
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        this.id = Math.random().toString();
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), error => {
                console.log("ERRO AO CADASTRAR PRODUTO");
            });
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
}