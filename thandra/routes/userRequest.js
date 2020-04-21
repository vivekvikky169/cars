const router = require("express-promise-router")();
const userRequest = require('../controllers/userRequest')

router.route('/request').post(userRequest.postCarRequest)

router.route('/carRequests').get(userRequest.viewCarRequests)

router.route('/recentBookings').get(userRequest.recentBookings)

router.route('/changeReqStatus').patch(userRequest.changeReqStatus)

router.route('/availability').get(userRequest.availability)

module.exports = router;