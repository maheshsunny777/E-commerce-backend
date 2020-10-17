//get all orders
exports.getAllOrders = async (Order) =>{
	try{
		let result = await Order.find();
		return Promise.resolve(result);
	}catch(err){
		return Promise.reject(err);
	}
}
//create a order
exports.createOrder = async (Customer,Order,userId) => {
	try {
		let userResult = await Customer.findOne({_id:userId})
		if (!userResult.cart.length) throw 'User cart is empty! add items to order!.'
		let newOrder = new Order({
			products:userResult.cart.map(each=>each.id),
			customer:userId,
			totalPrice:((cart)=>{
				let sum=0;
				for(let i=0;i<cart.length;i++){
					sum+=parseInt(cart[i].productPrice);
				} 
				return sum;
			})(userResult.cart)
		})
		let result = await newOrder.save();
		await Customer.findOneAndUpdate({_id:userId},{cart:[]});
		return Promise.resolve(result);	
	}catch(err){
		return Promise.reject(err);
	}
}
//get a users orders
exports.getUserOrders = async (Order,userId) =>{
	try {
		let result = await Order.find({customer:userId})
		return Promise.resolve(result);
	}catch(err){
		return Promise.reject(err);
	}
} 