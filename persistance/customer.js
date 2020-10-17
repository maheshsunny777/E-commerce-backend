//fetching all customers from database
exports.getCustomers = async (Customer) =>{
	try{
		let result = await Customer.find();
		return Promise.resolve(result);
	}catch(err){
		return Promise.reject(err);
	}
}
//get a coustomer
exports.getCustomer = async (Customer,email) =>{
	try{
		let result = await Customer.findOne({email});
		if (!result) throw ('invalid email id!.')
		return Promise.resolve(result);
	}catch(err){
		return Promise.reject(err);
	}
}
//creating new customer in database
exports.createCustomer = async (Customer,data,encryptedPassword) => {
	let {userName,address,city,state,postalCode,country,email} = data;
	try{
		let newCustomer = new Customer({
			userName,
			password:encryptedPassword,
			address,
			city,
			state,
			postalCode,
			country,
			email
		})
		let result = await newCustomer.save();
		return Promise.resolve(result);
	}
	catch(err){
		return Promise.reject(err);
	}
}
//updating an existing customer in database
exports.updateCustomer = async (Customer,id,data) =>{
	try {
		if(req.user._id!==id) throw 'You are not authorized!'
		let result = await Customer.findOneAndUpdate(
			{
				_id : id
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
//removing an existing customer in database
exports.deleteCustomer = async (Customer,id) =>{
	try {
		if(req.user._id!==id) throw 'You are not authorized!'
		let result = await Customer.findOneAndRemove(
			{
				_id : id
			}
		)
		return Promise.resolve(result);
	} catch(err) {
		return Promise.reject(err);
	}
}
// adding a product to customers cart
exports.addToCart = async (Product,Customer,productId,userId) =>{
	try {
		let product = await Product.findOne({_id:productId});
		let result = await Customer.findOneAndUpdate(
			{
				_id:userId
			},
			{
				$push:{cart:{
						id:product._id,
						productName:product.productName,
						productDiscription:product.productDiscription,
						productPrice:product.productPrice,
						productImage : product.productImage,
						productsInStock: product.productsInStock,
						productBrand: product.productBrand,
						productRating: product.productRating,
						sizesAvailable: product.sizesAvailable,
						colorsAvailable:product.colorsAvailable,
				}}
			},
			{
				new:true,
				runValidations:true
			}
		)
		return Promise.resolve(result);
	} catch(err) {
		return Promise.reject(err);
	}
}
//getting only the cart details of a customer
exports.getCart = async (Customer,id) => {
	try {
		let result = await Customer.findOne({_id:id});
		if(result) return Promise.resolve(result.cart);	
		else throw 'user not found!';
	}catch(err) {
		return Promise.reject(err);
	}
}