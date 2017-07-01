'use strict';

import statics from '../modules/statistics/statistics.js';
import admin from '../modules/admin/userList.js'
class staticsCount{
	constructor(){

	}
	//注册总数
    async adminDb(){
    	return admin.count()
    }
	//请求的总量
	async staticsDb(){
       return article.count()
	}
	
}

export default new staticsCount();