import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import winston from 'winston';
import expressWinston from 'express-winston';
import path from 'path';
import history from 'connect-history-api-fallback';
import db from './mongodb/db.js';
import config from 'config-lite';
import router from './routes/index.js';
// import Statistic from './middlewares/statistic.js';
import bodyParser from 'body-parser';

const app = express();

app.all('*', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:8080");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  	res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("X-Powered-By", '3.2.1')
	if (req.method == 'OPTIONS') {
	  	res.send(200);
	} else {
	    next();
	}
});
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1');
//     res.header("Access-Control-Allow-Credentials", true); //可以带cookies
//     // res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });
// app.use(Statistic.apiRecord);
const MongoStore = connectMongo(session);
app.use(cookieParser());
/*session 中间件 */ 
app.use(session({
	name : config.session.name,
	secret : config.session.secret,
	resave : true,
	saveUninitialized : false,
	cookie : config.session.cookie,
	store : new MongoStore({
		url:config.url
	})
}))
/*成功的日志*/

app.use(expressWinston.logger({
	transports: [
        new (winston.transports.Console)({
        	json:true,
        	colorize:true
        }),
        new winston.transports.File({
        	filename:'logs/success.log'
        })
	]
}));

/*路由*/
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
router(app);
/*错误日志*/
app.use(expressWinston.errorLogger({
	transports:[
        new winston.transports.Console({
        	json: true,
        	colorize : true
        }),
        new winston.transports.File({
        	filename : 'logs/error.log'
        })
	]
}));

app.use(history());
app.use(express.static("./public"));
app.use((err,req,res,next) => {
	res.status(404).send("未找到当前页面")
});
app.listen(config.port);