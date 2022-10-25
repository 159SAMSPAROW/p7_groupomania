const router = require('express').Router()
const passwordValidator = require('../middleware/password.validator')
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')
const uploadController = require('../controllers/upload.controller')
const multer = require('multer')
const upload = multer()
const rateLimit = require('../middleware/rate-limit')
// auth
router.post('/signup', rateLimit, passwordValidator, authController.signUp)
router.post('/login', rateLimit, authController.signIn)
router.get('/logout', authController.logout)
// user DB
router.get('/', userController.getAllUsers)
router.get('/:id', userController.userInfo)
router.put('/:id', rateLimit, userController.updateUser)
router.delete('/:id', userController.deleteUser)

// upload
router.post('/upload', upload.single('file'), uploadController.uploadProfil)

module.exports = router
