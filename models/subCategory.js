const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
	subCategoryName : {
		type : String,
		required : [true,"This field is required!."],
		unique : true
	},
	category : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'Category'
	},
	products : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref : 'Product'
		}
	]
})

const SubCategory = mongoose.model('SubCategory',SubCategorySchema);

module.exports = SubCategory;