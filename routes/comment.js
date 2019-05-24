const {Router} = require('express')
const router = Router()
const auth = require('../controller/auth')
const {addComment, getComment} = require('../controller/comment')

router.post('/', auth, addComment)
router.get('/', getComment)

module.exports = router
