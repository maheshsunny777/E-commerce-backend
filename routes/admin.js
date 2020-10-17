const Router = require('express').Router();
const controller = require('../controllers/adminController');
//login route
Router.post('/login',controller.login);

module.exports=Router;