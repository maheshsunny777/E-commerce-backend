require('dotenv').config();
const jwt = require('jsonwebtoken');
//admin login router
exports.login = async (req,res) => {
	try{
		//validation
		const {userName,password} = req.body;
		if(userName!==process.env.ADMIN_USERNAME) throw 'invalid user name!.';
		if(password!==process.env.ADMIN_PASSWORD) throw 'invalid password!.';
		//generate token
		const token = jwt.sign({
			userName
		},process.env.SIGNIN_SECRET);
		res.status(200).json({
			text:'Admin signed in successfully!.',
			token
		})
	}catch(err){
		res.json({
			text:"error",
			err
		})
	}
}