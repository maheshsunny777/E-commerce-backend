const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	products : [{
		type : mongoose.Schema.Types.ObjectId,
		ref:"Product"
	}],
	customer:{
		type : mongoose.Schema.Types.ObjectId,
		ref:"Customer"
	},
	totalPrice:{
		type:Number,
		required: true
	},
	OrderDate:{
		type:Date,
		default:new Date
	}
})

const Order = mongoose.model('Order',orderSchema);

module.exports = Order;