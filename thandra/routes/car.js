const router = require("express-promise-router")();
const car = require('../controllers/car')

router.route('/addCar').post(car.addCar)
router.route('/getCar').get(car.getCars)
router.route('/availableCars').get(car.getAvailableCars)
router.route('/carStatus').patch(car.changeCarStatus)
router.route('/carCost').patch(car.changeCarCost)
router.route('/deleteCar').delete(car.deleteCar)

module.exports = router;
