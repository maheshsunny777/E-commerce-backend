const Router = require('express').Router();
//importing necessary controllers and middleware
const controller = require('../controllers/ordersController');
const adminTokenValidation = require('../middleware/adminTokenValidation');
const customerTokenValidation = require('../middleware/customerTokenValidation');
// order routes
Router.get('/',adminTokenValidation,controller.getAllOrders);
Router.post('/placeorder',customerTokenValidation,controller.placeOrder);
Router.get('/customer',customerTokenValidation,controller.getUserOrders);

module.exports=Router;