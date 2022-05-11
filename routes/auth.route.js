const router = require('express').Router();

const authController = require('../controllers/auth.controller');


router.get('/signup', authController.handleSignupGet);
router.post('/signup', authController.handleSignupPost);

router.get('/login', authController.handleLoginGet);
router.post('/login', authController.handleLoginPost);

router.get('/logout', authController.handleLogout);


module.exports = router;

