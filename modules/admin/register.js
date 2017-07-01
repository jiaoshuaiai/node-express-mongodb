'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const registerSchema = new Schema({
		username : String,
	    password : String,
	    user_id :Number,
	    time:Number,
})

const Register = mongoose.model("register" , registerSchema)

export default Register;