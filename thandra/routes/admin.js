const router = require("express-promise-router")();
const admin = require('../controllers/admin')

router.route('/addAdmin').post(admin.addAdmin)

router.route('/viewOwner').get(admin.viewAdmins)

router.route('/updateMobile').patch(admin.updateAdminMobile)

module.exports = router;
