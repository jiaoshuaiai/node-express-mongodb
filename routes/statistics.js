import express from 'express'

import Statistics from '../controller/statistics/statistics.js'

const router = express.Router();

router.get("/countList" , Statistics.apiCount)

export default router;