//require necessary models
const ProductModel = require('../models/product');
const SubCategoryModel = require('../models/subCategory');
//require persistance layer
const persistance = require('../persistance/product');
const unlinkAsync = require('util').promisify(require('fs').unlink);
const redis = require('redis');
const client = redis.createClient();
//product controller
// get a product
exports.getProducts = async (req,res) => {
	try {
		client.get('productsInfo',async (err,productsInfo)=>{
			if(err) throw err;
			else{
				if(productsInfo){
					client.get('productsInfo',(err,productsInfo)=>{
						return res.status(200).json(JSON.parse(productsInfo))
					})
				}else{
					let result = await persistance.getProducts(ProductModel,SubCategoryModel,req.params.subCategoryName);
					result={
						text: result.length?`all Products of ${result[0].subCategory.subCategoryName}!.`:'no products exist for this subcategory!.',
						body:result.map(item=>{return{
							id:item._id,
							subCategory:item.subCategory.subCategoryName,
							productName:item.productName,
							productDiscription:item.productDiscription,
							productPrice:item.productPrice,
							productImage:item.productImage,
							productInStock:item.productInStock,
							productBrand:item.productBrand,
							productRating:item.productRating,
							sizesAvailable:item.sizesAvailable.length?item.sizesAvailable:undefined,
							colorsAvailable:item.colorsAvailable.length?item.colorsAvailable:undefined
						}})
					}
					client.set('productInfo',JSON.stringify(result))
					client.expire('productsInfo',30*60);
					res.status(200).json(result);
				}
			}
		})	
	}catch(err) {
		console.log(err);
		res.json({
			text:"error",
			err,
		})
	}	
}
//create a product
exports.createProduct = async (req,res) => {
	try{
		let result = await persistance.createProduct(ProductModel,SubCategoryModel,req.params.subCategoryName,req.body,req.file.path);
		res.status(200).json({
			text : `created a new ${result.productName} product!.`,
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
//update a product
exports.updateProduct = async (req,res) => {
	try{
		let result = await persistance.updateProduct(ProductModel,req.params.id,req.body);
		res.status(200).json({
			text:`updated ${result.productName} product!.`,
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
//delete a product
exports.deleteProduct = async (req,res) => {
	try{
		let result = await persistance.deleteProduct(ProductModel,SubCategoryModel,req.params.id);
		if(result.productImage){
			await unlinkAsync(result.productImage);
		}
		res.status(200).json({
			text:`deleted ${result.productName} product!.`,
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
