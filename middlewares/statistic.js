'use strict';

import statis from '../modules/statis/statis.js';
import timeFormater from 'time-formater';
import publicJs from '../prototyoe/public.js'
class Statistic {
	 constructor(){
	 	// super()
	 	this.apiRecord = this.apiRecord.bind(this)
	 }
	 async apiRecord(req,res,next){
	 	try{
	 		const statis_id = await publicJs.getId('statis_id');
	 		const apiInfo = {
	 			date:timeFormater().format('YYYY-MM-DD'),
	 			origin : req.headers.origin,
	 			id:statis_id
	 		}
	 		statis.create(apiInfo)
	 	}catch(err){
             
	 	}
	 	next()
	 }
}

export default new Statistic()