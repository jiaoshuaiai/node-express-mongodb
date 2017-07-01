'use strict';

import login from '../modules/admin/login.js';
import register from '../modules/admin/register.js'
import userList from '../modules/admin/userList.js'
class loginServer {
    constructor(){
       
    }
    //登陆
    async loginDb (username){
         return register
                .findOne({username:username})
    }
    //注册
    async registerDb(user){
    	return register
    	       .create(user)
    }
    //用户信息
    async userListIdDb(id){
        return userList
               .findOne({id:id})
    }
    //上传图片
    async userListUpdateImg(id,avatar){
        return userList
               .findOneAndUpdate({id:id} , {$set:avatar})
    }
   
}

export default new loginServer();