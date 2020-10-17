//fetching all categories from database
exports.getCategories = async (Category) =>{
	try{
		let result = await Category.find().populate('subCategories','subCategoryName');
		return Promise.resolve(result);
	}catch(err){
		return Promise.reject(err);
	}
}
//creating new category in database
exports.createCategory = async (Category,data) => {
	let { categoryName , subcategories } = data;
	try{
		let newCategory = new Category({
			categoryName
		})
		let result = await newCategory.save();
		return Promise.resolve(result);
	}
	catch(err){
		return Promise.reject(err);
	}
}
//updating an existing category in database
exports.updateCategory = async (Category,categoryName,data) =>{
	try {
		let result = await Category.findOneAndUpdate(
			{
				categoryName : categoryName
			},
			data,
			{
				new : true,
				runValidations:true
			}
		)
		return Promise.resolve(result);
	} catch(err) {
		return Promise.reject(err);
	}
}
//removing an existing category in database
exports.deleteCategory = async (Category,categoryName) =>{
	try {
		let result = await Category.findOneAndRemove(
			{
				categoryName:categoryName
			}
		)
		return Promise.resolve(result);
	} catch(err) {
		return Promise.reject(err);
	}
}