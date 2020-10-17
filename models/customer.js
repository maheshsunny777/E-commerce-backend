const mongoose = require('mongoose');
const validator = require('validator');

const customerSchema = new mongoose.Schema({
	userName : {
		type : String,
		required : [true,"This field is required!."]
	},
	password:{
		type : String,
		required : [true,"This field is required!."]
	},
	adderss:{
		type : String,
	},
	city:{
		type : String,
	},
	state:{
		type : String,
	},
	postalCode:{
		type : String,
	},
	country:{
		type : String,
	},
	email:{
		type : String,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: {
        	validator : val => validator.isEmail(val),
        	message : 'Please fill a valid email address'
        }
	},
	cart : [],
	orders:[{
		type : mongoose.Schema.Types.ObjectId,
		ref:"Order"
	}]
})

const Customer = mongoose.model('Customer',customerSchema);

module.exports = Customer;