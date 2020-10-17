//fetching all categories from database
exports.getSubCategories = async (SubCategory,Category,categoryName) =>{
	try{
		let categoryResult = await Category.findOne({categoryName})
		let result = await SubCategory.find({category:categoryResult._id}).populate('category','categoryName');
		return Promise.resolve(result);
	}catch(err){
		return Promise.reject(err);
	}
}
//creating new category in database
exports.createSubCategory = async (SubCategory,Category,categoryName,data) => {
	let { subCategoryName , products } = data;
	try{
		let categoryResult = await Category.findOne({categoryName})
		let newSubCategory = new SubCategory({
			subCategoryName,
			category : categoryResult._id
		})
		let result = await newSubCategory.save();
		await Category.findOneAndUpdate({_id:categoryResult._id},{$push:{subCategories:result._id}},{new:false});
		return Promise.resolve(result);
	}
	catch(err){
		return Promise.reject(err);
	}
}

//updating an existing category in database
exports.updateSubCategory = async (SubCategory,subCategoryName,data) =>{
	try {
		let result = await SubCategory.findOneAndUpdate({subCategoryName},data,{new : true,runValidations:true})
		return Promise.resolve(result);
	} catch(err) {
		return Promise.reject(err);
	}
}

//removing an existing category in database
exports.deleteSubCategory = async (SubCategory,Category,subCategoryName) =>{
	try {
		let result = await SubCategory.findOneAndRemove({subCategoryName})
		await Category.findOneAndUpdate({_id:result.category},{$pull:{subCategories:result._id}})
		return Promise.resolve(result);
	} catch(err) {
		return Promise.reject(err);
	}
}