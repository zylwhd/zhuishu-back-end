const {Router} = require('express')
const router = Router()
const {addCategory,
      getCategory,
      addBookToCategory,
      getBookByCategory,
      getBookByCategoryId} = require('../controller/category')

router.post('/', addCategory)
router.get('/', getCategory)
router.post('/book', addBookToCategory)
router.get('/book', getBookByCategory)
router.get('/:id', getBookByCategoryId)

module.exports = router
