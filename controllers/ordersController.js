const OrderModel = require('../models/orders');
const CustomerModel = require('../models/customer');
//require persistance layer
const persistance = require('../persistance/order');
//get all orders
exports.getAllOrders= async (req,res)=>{
	try{
		let result = await persistance.getAllOrders(OrderModel);
		res.status(200).json({
			text:'All orders!',
			body:result.map((item)=>{return{
				OrderId:item._id,
				products:item.products,
				totalAmount:item.totalPrice,
				date:item.OrderDate.toString().substring(0,24)
			}})
		})
	}catch(err) {
		console.log(err);
		res.send({
			text:'error',
			err
		})
	}
}
//placing a order
exports.placeOrder = async (req,res)=>{
	try {
		let result = await persistance.createOrder(CustomerModel,OrderModel,req.user._id);
		res.status(200).json({
			text:'placed an order!',
			body:result
		})
	}catch(err){
		console.log(err);
		res.send({
			text:'error',
			err
		})
	}
}
//get all user orders
exports.getUserOrders= async (req,res)=>{
	try{
		let result = await persistance.getAllOrders(OrderModel,req.user._id);
		res.status(200).json({
			text:"This user's orders!",
			body:result.map((item)=>{return{
				OrderId:item._id,
				products:item.products,
				totalAmount:item.totalPrice,
				date:item.OrderDate.toString().substring(0,24)
			}})
		})
	}catch(err) {
		console.log(err);
		res.send({
			text:'error',
			err
		})
	}
}