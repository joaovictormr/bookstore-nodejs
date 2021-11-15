const express           = require('express');
const bodyParser        = require('body-parser');
const path              = require('path');
const adminRoutes       = require('./routes/admin');
const shopRoutes        = require('./routes/shop');
const authRoutes        = require('./routes/auth');
const app               = express();
const errorController   = require('./controllers/error');
const mongoConnect      = require('./util/database.js.old').mongoConnect;
const User              = require('./models/user');
const mongoose          = require('mongoose');
require('dotenv').config();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById("61832c7b0afd162cb4d2661b")
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404Page);

mongoose.connect(process.env.MONGODB_URL)
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'Victor',
                    email: 'joaovictormr91@gmail.com',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        })
        app.listen(3000);
    })
// mongoConnect(() => {
//     app.listen(3000);
// });

