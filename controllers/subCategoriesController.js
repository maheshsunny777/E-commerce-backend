//require necessary models
const SubCategoryModel = require('../models/subCategory');
const CategoryModel = require('../models/category');
//require persistance layer
const persistance = require('../persistance/subCategory');

//subcategory controller
//get all sub categories of a category
exports.getSubCategories = async (req,res) => {
	try {
		let result = await persistance.getSubCategories(SubCategoryModel,CategoryModel,req.params.categoryName);
		res.status(200).json({
			text: result.length?`all subcategories of ${result[0].category.categoryName}!.`:'no sub categories for this category!.',
			body:result.map(item=>{return{
				id:item._id,
				subCategoryName:item.subCategoryName,
				category:item.category.categoryName,
				products:item.products
			}})
		});	
	}catch(err) {
		console.log(err);
		res.json({
			text:"error",
			err,
		})
	}	
}
//create a subcategory under a category
exports.createSubCategory = async (req,res) => {
	try{
		let result = await persistance.createSubCategory(SubCategoryModel,CategoryModel,req.params.categoryName,req.body);
		res.status(200).json({
			text : `created a ${result.subCategoryName} subcategory!.`,
			body : result
		})
	}catch(err){
		console.log(err);
		res.json({
			text:"error",
			err,
		})
	}
}
//update a sub category
exports.updateSubCategory = async (req,res) => {
	try{
		let result = await persistance.updateSubCategory(SubCategoryModel,req.params.subCategoryName,req.body);
		res.status(200).json({
			text:`updated ${result.subCategoryName} subCategory!.`,
			body:result
		})
	}catch(err){
		console.log(err);
		res.json({
			text:"error",
			err,
		})
	}
}
//delete a subcategory
exports.deleteSubCategory = async (req,res) => {
	try{
		let result = await persistance.deleteSubCategory(SubCategoryModel,CategoryModel,req.params.subCategoryName);
		res.status(200).json({
			text:`deleted ${result.subCategoryName} subCategory!.`,
			body:result
		})
	}catch(err){
		console.log(err);
		res.json({
			text:"error",
			err,
		})
	}
}
