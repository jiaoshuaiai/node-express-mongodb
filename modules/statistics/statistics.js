'sue strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const staticSchema = new Schema({
	data:String,
	id:Number,
	theme:String,
})


staticSchema.index({id : 1})
const statics = mongoose.model("statics" , staticSchema)
export default statics