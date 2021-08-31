const fs        = require('fs');
const dirPath   = require('../helpers/path');
const path      = require('path');

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        const p = path.join(dirPath, 'data', 'products.json');
        fs.readFile(p, (err, fileContent) => {
            let products = [];

            if(!err) {
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
            });
        });
    }

    static fetchAll(callback) {
        const p = path.join(dirPath, 'data', 'products.json');
        fs.readFile(p, (error, fileContent) => {
            if (error) {
                return callback([]);
            }
            callback(JSON.parse(fileContent));
        });
    }
}