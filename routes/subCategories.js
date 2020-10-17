const Router = require('express').Router();
const controller = require('../controllers/subCategoriesController');
const adminTokenValidation = require('../middleware/adminTokenValidation');

//CRUD routes for categories
Router.get('/:categoryName',controller.getSubCategories);
Router.post('/create/:categoryName',adminTokenValidation,controller.createSubCategory);
Router.patch('/update/:subCategoryName',adminTokenValidation,controller.updateSubCategory);
Router.delete('/delete/:subCategoryName',adminTokenValidation,controller.deleteSubCategory);

module.exports = Router;