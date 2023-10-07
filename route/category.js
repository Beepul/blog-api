const express = require('express');
const { createCat, getAllCat } = require('../controllers/Category');
const jwtVerify = require('../middlewares/jwtVerify');
const router = express.Router();

router.route('/create').post(jwtVerify,createCat)
router.route('/').get(getAllCat)


module.exports = router;