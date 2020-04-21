const user = require ('../models/user')

module.exports = {
    get: async (data, fields) => {
      try {
        return await user.findOne(data, fields);
      } catch (error) {
        console.log(error)
        throw error;
      }
    },
  
    getMultiple: async (data, fields) => {
      try {
        return await user.find(data, fields);
      } catch (error) {
        console.log(error)
        throw error;
      }
    },
  
    create: async data => {
      try {
        return await user.create(data);
      } catch (error) {
        console.log(error)
        throw error;
      }
    },
  
    update: async data => {
      try {
        console.log(data.password,'pass')
        return await user.findOneAndUpdate(
          { mobile: data.mobile },
          { $set: { password: data.newPassword } },
          { new: true }
        );
      } catch (error) {
        console.log(error)
        throw error;
      }
    }
  };
  