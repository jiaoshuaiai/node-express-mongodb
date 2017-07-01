'use strict';

module.exports = {
    port :9046,
    url: 'mongodb://localhost:27017/zhanglong',
    session: {
    	name: 'zl',
    	secret: 'zl',
    	cookie: {
    		httpOnly: true,
    		secure: false,
    		maxAge: 365 * 24 * 60 * 60 * 1000, 
    	}
    }
}