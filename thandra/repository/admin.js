const admin = require ('../models/admin')

module.exports = {
    // get: async (data, fields) => {
    //   try {
    //     return await admin.findOne(data, fields);
    //   } catch (error) {
    //     throw error;
    //   }
    // },
  
    getMultiple: async (data, fields) => {
      try {
        return await admin.find(data, fields);
      } catch (error) {
        console.log(error)
        throw error;
      }
    },
  
    create: async data => {
      try {
        return await admin.create(data);
      } catch (error) {
        console.log(error)
        throw error;
      }
    },
  
    update: async data => {
      try {
        return await admin.findOneAndUpdate(
          { name: data.name },
          { $set: { mobile: data.mobile } },
          { new: true }
        );
      } catch (error) {
        console.log(error)
        throw error;
      }
    }
  };
  