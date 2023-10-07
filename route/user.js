const express = require('express');
const { updateUser, getUserById } = require('../controllers/User');
const jwtVerify = require('../middlewares/jwtVerify');
const ownerVerify = require('../middlewares/ownerVerify');
const imageUploader = require('../middlewares/imageUploader');
const router = express.Router();


router.route('/update/:id').put(jwtVerify,ownerVerify,imageUploader('profilePic'),updateUser);
router.route('/getuser/:id').get(getUserById);

module.exports = router;