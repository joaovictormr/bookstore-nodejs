const mongodb   = require('mongodb');
const getDb     = require('../util/database').getDb;


class User {
    constructor(username, email, cart, id) {
        this.username = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    addToCart(product) {
        // const cartProducts = this.cart.items.findIndex(cp => {
        //     return cp._id === product._id;
        // });

        const updatedCart = {items: [{...product, quantity: 1}]};
        const db = getDb();
        return db
            .collection('users')
            .updateOne(
                { _id: mongodb.ObjectId(this._id) },
                { $set: { cart: updatedCart } } 
            );

    }

    static findById(userId) {
        const db = getDb();
        return db.collection('users').findOne({_id: mongodb.ObjectId(userId)});
    }
}
module.exports = User;
