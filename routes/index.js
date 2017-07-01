'use strict';

import Admin from './admin';
import Article from './article';
import statistics from './statistics'
export default app => {
	app.use('/admin', Admin);
	app.use('/article', Article);
	app.use('/statistics', statistics);
}	