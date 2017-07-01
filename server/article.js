'use strict';

import article from '../modules/article/article.js';

class articleContent{
	constructor(){

	}
	async articleDb(content){
       return article.create(content)
	}
	async updateDb(content){
		return article.update({author:author,_id:postId},{$set:data})
	}
	async searchDb(publishTime){
		return article.find({publishTime:eval('/^' + publishTime + '/gi')}).count()
	}
	async deleteDb(id){
		return article.remove({id:id})
	}
	async updataDb(title){
		return article.findOneAndUpdate({id:id} , {$set:title})
	}
}

export default new articleContent();