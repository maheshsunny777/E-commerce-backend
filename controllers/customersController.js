const CustomerModel = require('../models/customer');
const ProductModel = require('../models/product');
const persistance = require('../persistance/customer');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
//customer logic
//getting all customers
exports.getCustomers = async (req,res) => {
	try {
		let result = await persistance.getCustomers(CustomerModel);
		res.status(200).json({
			text:'all customers!',
			body:result
		});	
	}catch(err) {
		console.log(err);
		res.json({
			text:"error",
			err,
		})
	}	
}
//registering a customer
exports.registerCustomer = async (req,res) => {
	try{
		let {userName,password,email} = req.body;
		//validation
		let err=[];
		if(userName<6) err.push('Username should be greater than 6 letters');
		if(password<6) err.push('Password should be greater than 6 letters');
		if(err.length) throw err;
		//encrypting password
		const salt = await bcryptjs.genSalt(10);
		password = await bcryptjs.hash(password,salt);

		let result = await persistance.createCustomer(CustomerModel,req.body,password);
		res.status(200).json({
			text : 'created a customer!',
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

exports.updateCustomer = async (req,res) => {
	try{
		let result = await persistance.updateCustomer(CustomerModel,req.params.id,req.body);
		res.status(200).json({
			text:`updated ${result.userName} profile`,
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

exports.deleteCustomer = async (req,res) => {
	try{
		let result = await persistance.deleteCustomer(CustomerModel,req.params.id);
		res.status(200).json({
			text:`deleted ${result.userName}`,
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

exports.signin = async (req,res) => {
	try{
		//validation
		const {email,password} = req.body;
		const customer = await persistance.getCustomer(CustomerModel,email);
		const isValidPass = await bcryptjs.compare(password,customer.password);
		if(!isValidPass) throw 'invalid password!.';
		//genrating token
		const {email_customer,userName,_id} = customer;
		const token = jwt.sign({
			_id,
			email:email_customer,
			userName
		},process.env.SIGNIN_SECRET);
		res.status(200).json({
			text:'login successful!.',
			token,
		})
	}catch(err){
		console.log(err);
		res.json({
			text:'error',
			err,
		})
	}
}

exports.addToCart = async (req,res) =>{
	try{
		let result = await persistance.addToCart(ProductModel,CustomerModel,req.params.productId,req.user._id);
		res.status(200).json({
			text:`added to cart!.`,
			body:result.cart
		})
	}catch(err){
		console.log(err);
		res.json({
			text:"error",
			err,
		})
	}
}

exports.getCart = async (req,res) =>{
	try{
		let result = await persistance.getCart(CustomerModel,req.user._id);
		res.status(200).json({
			text:`${result.length?'users cart!':'cart is empty!'}`,
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