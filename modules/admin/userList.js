'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
	avatar: {type: String, default: 'data:image/png;base64,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…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'},
	balance: {type: Number, default: 0},
	brand_member_new: {type: Number, default: 0},
	current_address_id: {type: Number, default: 0},
	current_invoice_id: {type: Number, default: 0},
	delivery_card_expire_days: {type: Number, default: 0},
	email: {type: String, default: ''},
	gift_amount: {type: Number, default: 3},
	city: String,
	registe_time: String,
	id: Number,
	user_id: Number,
	is_active: {type: Number, default: 1},
	is_email_valid: {type: Boolean, default: false},
	is_mobile_valid: {type: Boolean, default: true},
	mobile: {type: String, default: ''},
	point: {type: Number, default: 0},
	username: String,
	column_desc: {
		game_desc: {type: String, default: '玩游戏领红包'},
		game_image_hash: {type: String, default: '05f108ca4e0c543488799f0c7c708cb1jpeg'},
		game_is_show: {type: Number, default: 1},
		game_link: {type: String, default: 'https://gamecenter.faas.ele.me'},
		gift_mall_desc: {type: String, default: '0元好物在这里'},
	},
})

userInfoSchema.index({id: 1});


const UserInfo = mongoose.model('UserInfo', userInfoSchema);

export default UserInfo