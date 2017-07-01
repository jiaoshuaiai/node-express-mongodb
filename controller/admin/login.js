import formidable from 'formidable';
import AddressComponent from '../../prototyoe/addressComponents.js'
import timeFormater from 'time-formater';
import adminServer from '../../server/admin.js'
import publicJs from '../../prototyoe/public.js'
import userList from '../../modules/admin/userList.js'
class loginController extends AddressComponent{
    constructor(){
        super()
        this.login = this.login.bind(this);
    }
    async login (req,res,next){
       const form = new formidable.IncomingForm();
       		form.parse(req, async (err, fields, files) => {
			const {username, password} = fields;
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
                 res.send({
			          		status: 0,
			          		message:"用户名或者密码错误",
			           })
               }else if(User.password.toString() !== newpassword.toString()){
                  res.send({
				          	status: 0,
				          	message:"密码错误",
			          	})     	   
               }else if(User.username !== username){
                  res.send({
			           		status: 0,
				           	message:"用户名错误",
			           	})    
               }else{
                req.session.user_id = User.user_id;
               	 res.send({
				           	status: 1,
				           	message:User,
			          	})   
               }
			}catch(error){
                 res.send({
                 	status :0,
                 	message:"登陆失败"
                 })
			}
		})
    }
    async singOut(req,res,next){
    	delete req.session.user_id;
    	res.send({
    		status:1,
    		message:"退出成功"
    	})
    }
}

export default new loginController();





















