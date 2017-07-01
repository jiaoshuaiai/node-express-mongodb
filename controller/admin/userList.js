'use strict';

import userList from '../../modules/admin/userList.js';


class messageUser{
	constructor(){

	}
	async getUserList(req,res,next){
		const {limit = 20 , offset = 0 } = req.query;
		try{
          const users = await userList.find({},"-id").sort({user_id : -1}).limit(Number(limit)).skip(Number(offset));
          res.send(users)
		}catch(error){
			res.send({
				status:0,
                type:"GET_ERROR",
                message:"获取浏览列表失败"
			})
		}
	}
}

export default new messageUser();