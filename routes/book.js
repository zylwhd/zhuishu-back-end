const {Router} = require('express')
const router = Router()
const {getBook, getBookById, allBook} = require('../controller/book')

router.post('/', getBook)
router.get('/allBook',allBook)
router.get('/:id', getBookById)

module.exports = router
