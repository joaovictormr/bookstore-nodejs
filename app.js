const express           = require('express');
const bodyParser        = require('body-parser');
const path              = require('path');
const adminRoutes       = require('./routes/admin');
const shopRoutes        = require('./routes/shop');
const app               = express();
const errorController   = require('./controllers/error');
const sequelize         = require('./util/database');
const User              = require('./models/user');
const Product           = require('./models/product');
const Cart              = require('./models/cart');
const CartItem          = require('./models/cart-item');


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404Page);

//Relationships definitions

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'}); // Redudant because of the hasMany below. But I will leave here just as educational purpose.
User.hasOne(Cart);
Cart.belongsToMany(Product, {through: CartItem});

sequelize
    // .sync({force: true})
    .sync()
        .then(result => {
            return User.findByPk(1);
        })
        .then(user => {
            if(!user) {
                return User.create({name: 'Victor Martins', email: 'test@test.com'});
            }
            return user;
        })
        .then(user => {
            return user.createCart();
        })
        .then(cart => {
            app.listen(3000);
        })
        .catch(err => console.log(err));