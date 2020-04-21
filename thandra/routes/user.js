const router = require("express-promise-router")();
const user = require('../controllers/user')
const Auth = require('../middleware/AUTH')

router.route('/signUp').post(user.signin)

router.route('/login').post(user.login)

router.route('/viewUsers').get(user.viewUsers)

router.route('/forgotPassword').post(user.forgotPassword)

router.route('/changePassword').patch(user.updatePassword)

router.route('/logout').post(user.logout)

module.exports = router;
