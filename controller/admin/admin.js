'use strict'
import adminServer from '../../server/admin.js'
class Admin {
	constructor(props) {

	}
	async getAdminInfo(req, res, next){
		 const user_id =  req.session.user_id;
         console.log(user_id)
         if(!user_id || !Number(user_id)){
		 	res.send({
		 		status : 0 ,
		 		type : "ERROR_ADMIN_ID",
		 		message : "获取管理员信息失败"
		 	})
		 }
		 try{
            const admin = await adminServer.userListIdDb(user_id);
           
            if(!admin){
            	res.send({
            		status:0,
            		type:'ERROR_ADMIN',
            		message:"未找到当前管理员"
            	})
            }else{
                res.send({
                	status:1,
                	message:admin
                })
            }
		 }catch(error){
            res.send({
            	status:0,
            	type:"ERROR_ADMIN_MESSAGE",
            	message:"获取管理员信息失败"
            })
		 }
	}
}


export default new Admin()