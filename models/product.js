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
    constructor(title) {
        this.title = title;
    }

    save() {
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
}