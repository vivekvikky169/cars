const userRequest = require ('../models/userRequest')

module.exports = {
    get: async (data, fields) => {
      try {
        return await userRequest.findOne(data, fields);
      } catch (error) {
        console.log(error)
        throw error;
      }
    },
  
    getMultiple: async (data, fields) => {
      try {
        return await userRequest.find(data, fields);
      } catch (error) {
        console.log(error)
        throw error;
      }
    },

    create: async data => {
      try {
        return await userRequest.create(data);
      } catch (error) {
        console.log(error)
        throw error;
      }
    },
  
    update: async data => {
      try {
        return await userRequest.findOneAndUpdate(
          { mobile: data.mobile , requestStatus:"pending" },
          { $set: { requestStatus: data.requestStatus } },
          { new: true }
        );
      } catch (error) {
        console.log(error)
        throw error;
      }
    }
  };
  