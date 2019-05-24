const {Router} = require('express')
const router = Router()
const auth = require('../controller/auth')
const {register,
      login,
      getUserById,
      updateUserAvatarById,
      updateUserNmById,
      updateSignById,
      updateUserPwdById} = require('../controller/user')

router.post('/register', register)
router.post('/login', login)
router.get('/', auth, getUserById)
router.post('/userAvatar', auth, updateUserAvatarById)
router.post('/userNikename', auth, updateUserNmById)
router.post('/userSign', auth, updateSignById)
router.post('/userPassword', auth, updateUserPwdById)


module.exports = router 
