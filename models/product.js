const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	productName : {
		type : String,
		required : [true,"Product name is required!."],
		unique : true
	},
	subCategory : {
		type : mongoose.Schema.Types.ObjectId,
		ref:"SubCategory"
	},
	productDiscription : {
		type : String
	},
	productPrice : {
		type : Number,
		require : [true,"Product price is required!."]
	},
	productImage : {
		type : String
	},
	productsInStock : {
		type : Number,
		required : [true,"Stock number is required!."]
	},
	productBrand :{
		type : String,
		required : true,
	},
	productRating : {
		type : String
	},
	sizesAvailable : [{
		type : String,
	}],
	colorsAvailable : [{
		type : String
	}]
})

const Product = mongoose.model('Product',productSchema);

module.exports = Product;
