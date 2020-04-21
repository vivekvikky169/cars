const carRepository = require('../repository/car');

module.exports = {
    getCars: async () => {
        try {
            const car = await carRepository.getMultiple({}, "-__v -_id ");
            return car;
        } catch (error) {
            //   logger.error(error);
            return { name: error.name, message: error.message, statusCode: 404 };
        }
    },


    addCar: async body => {
        try {
            const carData = {
                carName: body.carName,
                carNumber: body.carNumber,
                seater: body.seater,
                amenities: body.amenities,
                oneDayCost: body.oneDayCost
            }
            await carRepository.create(carData);
            return { message: "car added Successfully !" };
        } catch (error) {
            //   logger.error(error);
            return { name: error.name, message: error.message };
        }
    },

    getAvailableCars: async () => {
        try {
            const car = await carRepository.getMultiple({ carStatus: "true" }, "-__v -_id ");
            return car;
        } catch (error) {
            //   logger.error(error);
            return { name: error.name, message: error.message };
        }
    },

    changeCarStatus: async body => {
        try {
            const update = await carRepository.updateStatus(body);
            if (update) {
                return { message: "Updated Successfully !" };
            }
        } catch (error) {
            return { name: error.name, message: error.message };
        }
    },

    changeCarCost: async body => {
        try {
            const update = await carRepository.update(body);
            if (update) {
                return { message: "Updated Successfully !" };
            }
        } catch (error) {
            return { name: error.name, message: error.message };
        }
    },

    deleteCar: async body => {
        try {
            const deleted = await carRepository.delete(body);
            if (deleted) {
                return { message: "Deleted Successfully !" };
            }
            else {
                return { message: "Enter correct car number !", statusCode: 304 }
            }
        } catch (error) {
            return { name: error.name, message: error.message, statusCode: 404 };
        }
    },
}