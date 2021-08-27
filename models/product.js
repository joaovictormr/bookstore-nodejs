const products = [];

module.exports = class Prouct {
    constructor(title) {
        this.title = title;
    }

    save() {
        products.push(this);
    }

    static fetchAll() {
        return products;
    }
}