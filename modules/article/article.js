'use strict';

import mongoose from 'mongoose';

const Schema  = mongoose.Schema;


const articleSchema = new Schema({
	title:{type:String},
    publishTime: {type: String},
    content:{type:String},
    count : {type:Number,default: 0},
    parents:{type:String},
    id:Number,
    city:{type:String,default:"上海"}
})

const article = mongoose.model("article",articleSchema)
export default article;