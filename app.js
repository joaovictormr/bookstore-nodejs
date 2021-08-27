const express     = require('express');
const bodyParser  = require('body-parser');
const path        = require('path');
const adminRoutes = require('./routes/admin');
const shopRoutes  = require('./routes/shop');
const app         = express();
const errorController = require('./controllers/error');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);

app.listen(3000);
