'use strict';


class checkAdime{
	constructor(){

	}
	async checkLogin(res,req,next){
        const user_id = req.session.user_id;
        if(!user_id || !Number(user_id)){
        	res.send({
        		status:0,
        		type:"ERROR_SESSION",
        		message:"还没登陆"
        	})
        	return
        }else{

        }
        next();
	}
	// async checkNoLogin(req,res,next){
	// 	 if(!req.session.user){
 //            return res.send({
 //            	status:1,
 //            	message:"用户已登录"
 //            })
 //            next()
 //         }
	// }
}
export default new checkAdime();