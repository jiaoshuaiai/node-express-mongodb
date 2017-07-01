'use strict';

import express from 'express';
import Login from '../controller/admin/login.js';
import Register from '../controller/admin/register.js';
import UserList from '../controller/admin/userList.js';
import checkAdime from '../middlewares/checkAdmin.js';
import Img from '../controller/admin/updateImg.js';
import Admin from '../controller/admin/admin.js'
const router = express.Router();

router.post("/login",  Login.login);
router.post("/register"  , Register.register);
router.get("/list"   , UserList.getUserList);
router.get("/info" , Admin.getAdminInfo);
router.post("/img" , Img.updateImg);
export default router