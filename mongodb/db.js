import mongoose from 'mongoose'
import config from 'config-lite'

mongoose.connect(config.url , { server : { auto_reconnect : true } })

mongoose.Promise = global.Promise

const db = mongoose.connection;

db.once('open',function(callback){
	console.log("链接成功")
})
db.on("error",function(err){
	console.error('mongodb connection' + err);
	mongoose.disconnect();
})
db.on("close",function(){
	console.log("数据库关闭，重新链接数据库");
	mongoose.connection(config.url,{ server: { auto_reconnect : true } })
})

export default db