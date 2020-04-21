const carService = require('../services/car');

module.exports = {
    getCars: async (request, response) => {
        const result = await carService.getCars();
        return response.status(result.statusCode).send(result);
    },

    addCar: async (request, response) => {
        if (
            !request.body.carName ||
            !request.body.carNumber ||
            !request.body.seater ||
            !request.body.amenities ||
            !request.body.oneDayCost
        )
            return response.send({ message: "Error. Please provide all Details" });
        const result = await carService.addCar(request.body);
        return response.send(result);
    },

    getAvailableCars: async (request, response) => {
        const result = await carService.getAvailableCars();
        return response.send(result);
    },

    changeCarStatus: async (request, response) => {
        if (!request.body.carNumber || !request.body.carStatus){
            return response.send({
                message: "Please provide car number and status"
            });
        }
        const result = await carService.changeCarStatus(request.body);
        return response.send(result);
    },

    changeCarCost: async (request, response) => {
        if (!request.body.carNumber || !request.body.oneDayCost)
            return response.send({
                message: "Please provide car number and updated cost"
            });
        const result = await carService.changeCarCost(request.body);
        return response.send(result);
    },

    deleteCar: async (request, response) => {
        if (!request.body.carNumber)
            return response.send({
                message: "Please provide car number"
            });
        const result = await carService.deleteCar(request.body);
        return response.send(result);
    }
}