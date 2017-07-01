'use strict';

import statisServer from '../../server/statiCount.js';

class Statis {
	constructor(){

	}
	async apiCount(req,res,next){
    console.log("aaaaaaaaa")
        try{
           const count  = await statisServer.adminDb();
           res.send({
           	   status : 1,
           	   count
           })
        }catch(error){
            res.send({
            	status :0,
            	type:"ERROR_COUNT",
            	message:"注册用户失败"
            })
        }
	}
}

export default new Statis();