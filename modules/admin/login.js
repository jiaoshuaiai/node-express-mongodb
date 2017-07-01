'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const loginSchema = new Schema({
	username : String,
	password : String,
	user_id :Number
})

const Login = mongoose.model("Login" , loginSchema)

export default  Login