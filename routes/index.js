const Router = require('express').Router();
//initial routes
Router.use('/categories',require('./categories'));
Router.use('/subcategories',require('./subCategories'));
Router.use('/products',require('./products'));
Router.use('/customers',require('./customers'));
Router.use('/admin',require('./admin'));
Router.use('/orders',require('./orders'));

module.exports = Router;
