'use strict';
import mongoose from 'mongoose'

const idsSchema = new mongoose.Schema({
	restaurant_id: Number,
	user_id: Number,
	address_id: Number,
	category_id: Number,
	item_id: Number,
	sku_id: Number, 
	admin_id: Number,
	statis_id: Number,
	article_id:Number
});

const Ids = mongoose.model('Ids', idsSchema);

Ids.findOne((err, data) => {
	if (!data) {
		const newIds = new Ids({
			restaurant_id: 0,
			user_id: 0,
			address_id: 0,
			category_id: 0,
			item_id: 0,
			sku_id: 0, 
			admin_id: 0,
			statis_id: 0,
			article_id:0,
		});
		newIds.save();
	}
})
export default Ids