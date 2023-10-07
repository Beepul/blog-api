const express = require('express');
const { createPost, deletePost, getAllPost, getPostById, updatePost } = require('../controllers/Post');
const jwtVerify = require('../middlewares/jwtVerify');
const ownerPostVerify = require('../middlewares/ownerPostVerify');
const imageUploader = require('../middlewares/imageUploader');
const router = express.Router();


router.route('/').get(getAllPost);
router.route('/:id').get(getPostById);
router.route('/create').post(jwtVerify,imageUploader('thumbnail'),createPost);
router.route('/delete/:id').delete(jwtVerify,ownerPostVerify,deletePost);
router.route('/update/:id').put(jwtVerify,ownerPostVerify,updatePost);




module.exports = router;