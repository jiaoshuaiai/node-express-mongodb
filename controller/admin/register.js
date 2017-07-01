'use strict';

import formidable from 'formidable';
import timeFormater from 'time-formater';
import adminServer from '../../server/admin.js'
import publicJs from '../../prototyoe/public.js'
import Register from '../../modules/admin/register.js'
import AddressComponents  from '../../prototyoe/addressComponents.js'
import userList from '../../modules/admin/userList.js'
class registerController extends AddressComponents{
	constructor() {
	   super()
       this.register = this.register.bind(this);
	}
	async register(req,res,next){
   const form = new formidable.IncomingForm();
       		form.parse(req, async (err, fields, files) => {
			const {username, password , time} = fields;
			try{
				if(!username){
					 throw new Error("用户名参数错误")
				}else if(!password){
                     throw new Error("密码参数错误")
				}

			}catch(error){
				res.send({
					status: 0,
					type: 'ERROR_QUERY',
					message: error.message,
				})
				return
			}	
			
			try{
			   const newpassword = await publicJs.encryption(password);	
               const User = await adminServer.loginDb(username);
               if(!User){
                   // const user_id = await publicJs.getId('user_id');
                   	const user_id = await this.getId('user_id');
                   
					const cityInfo = await this.guessPosition(req);
					// console.log(timeFormater().format('YYYY-MM-DD HH:mm'))
					const registe_time = timeFormater().format('YYYY-MM-DD HH:mm');
                    const newUser = {username, password: newpassword,user_id , time};
                    const newUserInfo = {username, user_id, id: user_id, city: cityInfo.city, registe_time, };
                    await  adminServer.registerDb(newUser);
                    const createUser = new userList(newUserInfo);
					const userinfo = await createUser.save();
                    // console.log(newUserInfo)
                    // console.log(cityInfo)
					// const createUser = new UserList(newUserInfo);
					// const userinfo = await createUser.save();
					console.log(userinfo)
					// UserList.create(newUserInfo)
                
                   req.session.user_id = user_id;
                   res.send({
						status:1,
						message:userinfo
					  })
               }else{
               	    req.session.user_id = user.user_id;
					const userinfo = await Register.findOne({user_id: user.user_id}, '-_id');
					if(userinfo.username){
					   res.send({
						status:0,
						message:"用户名已经注册"
					  })
					}
               }
			}catch(error){
                 res.send({
                 	status :0,
                 	message:"注册失败"
                 })
			}
		})
	}
}

export default new registerController();