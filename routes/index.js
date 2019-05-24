const express = require('express');
const router = express.Router();
const bookRoutes = require('./book')
const titleRoutes = require('./title')
const articleRouters = require('./article')
const categoryRoutes = require('./category')
const swiperRoutes = require('./swiper')
const userRoutes = require('./user')
const smsCodeRoutes = require('./smsCode')
const uploadRoutes = require('./upload')
const collectionRoutes = require('./collection')
const commentRoutes = require('./comment')
const readListRoutes = require('./readList')

router.use('/book', bookRoutes)
router.use('/titles', titleRoutes)
router.use('/article', articleRouters)
router.use('/category', categoryRoutes)
router.use('/swiper', swiperRoutes)
router.use('/user', userRoutes)
router.use('/smsCode', smsCodeRoutes)
router.use('/uploadToken', uploadRoutes)
router.use('/collection', collectionRoutes)
router.use('./comment', commentRoutes)
router.use('/readList', readListRoutes)

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
