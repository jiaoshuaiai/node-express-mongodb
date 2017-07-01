'use strict';

import express from 'express';
import Article from '../controller/article/article.js';
// import checkAdmin from '../middlewares/checkAdmin.js'
const router = express.Router();

router.post("/content", Article.newArticle)
router.post("/search",Article.searchArticle)
router.post("/delete",Article.deleteArticle)
router.post("/update",Article.updateArticle)
export default router