const car = require('../models/car')
const logger = require('../middleware/logger')

module.exports = {
    get: async (data, fields) => {
      try {
        return await car.findOne(data, fields);
      } catch (error) {
        logger.error(error)
        throw error;
      }
    },

    getMultiple: async (data, fields) => {
        try {
            return await car.find(data, fields);
        } catch (error) {
            console.log(error)
            throw error;
        }
    },

    create: async data => {
        try {
            return await car.create(data);
        } catch (error) {
            console.log(error)
            throw error;
        }
    },

    update: async data => {
        try {
            return await car.findOneAndUpdate(
                { carNumber: data.carNumber },
                { $set: { oneDayCost: data.oneDayCost } },
                { new: true }
            );
        } catch (error) {
            console.log(error)
            throw error;
        }
    },

    updateStatus: async data => {
        try {
            return await car.findOneAndUpdate(
                { carNumber: data.carNumber },
                { $set: { carStatus: data.carStatus } },
                { new: true }
            );
        } catch (error) {
            console.log(error)
            throw error;
        }
    },

    delete: async data => {
        try {
            return await car.findOneAndRemove(
                { carNumber: data.carNumber },
                { new: true }
            );
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
};
