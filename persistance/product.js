//fetching all products from database
exports.getProducts = async (Product,SubCategory,subCategoryName) =>{
	try{
		let subCategoryResult = await SubCategory.findOne({subCategoryName});
		let result = await Product.find({subCategory:subCategoryResult._id}).populate('subCategory','subCategoryName');
		return Promise.resolve(result);
	}catch(err){
		return Promise.reject(err);
	}
}
//creating new product in database
exports.createProduct = async (Product,SubCategory,subCategoryName,data,imagePath) => {
	let { productName , productDiscription , productPrice , subCategory , productImage , productsInStock , productBrand , productRating , sizesAvailable , colorsAvailable } = data;
	try{
		let subCategoryResult = await SubCategory.findOne({subCategoryName});
		let newProduct = new Product({
			productName,
			productDiscription,
			productPrice,
			productImage : imagePath ,
			productsInStock,
			productBrand,
			productRating,
			sizesAvailable,
			colorsAvailable,
			subCategory : subCategoryResult._id
		})
		let result = await newProduct.save();
		await SubCategory.findOneAndUpdate({_id:subCategoryResult._id},{$push:{products:result._id}},{new:false});
		return Promise.resolve(result);
	}
	catch(err){
		return Promise.reject(err);
	}
}

//updating an existing product in database
exports.updateProduct = async (Product,id,data) =>{
	try {
		let result = await Product.findOneAndUpdate({_id:id},data,{new : true,runValidations:true})
		return Promise.resolve(result);
	} catch(err) {
		return Promise.reject(err);
	}
}

//removing an existing product in database
exports.deleteProduct = async (Product,SubCategory,id) =>{
	try {
		let result = await Product.findOneAndRemove({_id:id})
		await SubCategory.findOneAndUpdate({_id:result.subCategory},{$pull:{products:id}},{new:true});
		return Promise.resolve(result);
	} catch(err) {
		return Promise.reject(err);
	}
}