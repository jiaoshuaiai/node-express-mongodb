'use strict';
import ids from '../modules/allIds.js';
import crypto from 'crypto'
import article from '../modules/article/article.js'

class publicIndex {
	constructor(props) {

	}
	// async getId(type){
	//   try{
	// 	const idData = await ids.findOne();
	// 		idData[type] ++ ;
	// 		// await idData.save();
	// 		console.log(idData)
	// 		console.log(idData[type])
	// 		// return idData[type];
	// 	}catch(err){
	// 		console.log('获取ID数据失败');
	// 		throw new Error(err)
	// 	}
	// }
    async articleId(){
      try{
		// const idData = await article.find();
		// console.log(idData)
		// if(idData.article_id){
		// 	idData[article_id] ++;
		// 	console.log(idData[article_id])
		// 	return idData[article_id];
		// }else{
		// 	idData.article_id = 0;
  //          return idData.article_id;
		// }
			// idData[type] ++ ;
			// await idData.save();
			
			// console.log(idData[type])
			// return idData[type];
		}catch(err){
			console.log('获取ID数据失败');
			throw new Error(err)
		}
    }
	 encryption(password){
		const newpassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password));
		return newpassword
	}
	 Md5(password){
		const md5 = crypto.createHash('md5');
		return md5.update(password).digest('base64');
	}
}


export default new publicIndex()
