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

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404Page);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'}); // Redudant because of the hasMany below. But I will leave here just as educational purpose.
User.hasMany(Product);

sequelize.sync({force: true}) //Do not use this force:true in production. Bad practice;
    .then(result => {
        app.listen(3000);
    })
    .catch(err => console.log(err));