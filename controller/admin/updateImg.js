'use strict';

// import userList from '../../modules/admin/userList.js';
// import AddressComponent from '../../prototyoe/addressComponents.js'
import adminServer from '../../server/admin.js'
import formidable from 'formidable';
class imgUpdate {
	  constructor(){
		  // super();
		  this.updateImg = this.updateImg.bind(this);
	  }
    async updateImg(req,res,next){
      const form = new formidable.IncomingForm();
    	const user_id = req.session.user_id; 
      console.log(!user_id);
      form.parse(req, async (err, fields, files) => {
      const { path } = fields;
    	if(!user_id || !Number(user_id)){
    		res.send({
    			status:0,
    			type:"ERROR_IMG",
    			message:"参数错误",
    		})
    		return;
    	}
    	try{ 
          // const imagePath = await this.qiniu(req);
          // await userList.findOneAndUpdate({id: admin_id}, {$set: {avatar: image_path}});
          
          const avatar = path;
      
          const imagePath = await adminServer.userListUpdateImg(user_id ,  { avatar: avatar } );

          res.send({
          	status:1,
          	imagePath
          })
    	}catch(error){
    		res.send({
    			status:0,
    			type:"ERROR_UPDATE",
    			message:"上传图片失败"
    		})
    	}
    })
  }
}

export default new imgUpdate();