const Router = require('express').Router();
const controller = require('../controllers/categoriesController');
const adminTokenValidation = require('../middleware/adminTokenValidation');
//CRUD routes for categories
Router.get('/',controller.getCategories);
Router.post('/create',adminTokenValidation,controller.createCategory);
Router.patch('/update/:categoryName',adminTokenValidation,controller.updateCategory);
Router.delete('/delete/:categoryName',adminTokenValidation,controller.deleteCategory);

module.exports = Router;