const adminRepository = require('../repository/admin')

module.exports = {
  addAdmin: async queryData => {
    try {
      const adminData = {
        name: body.name,
        email: body.email,
        mobile: body.mobile,
        password: body.password
        // liscence:request.body.liscence
      }
      await adminRepository.create(adminData);
      return { message: "Admin saved Successfully !", statusCode: 200 };
    } catch (error) {
      //   logger.error(error);
      return { name: error.name, message: error.message, statusCode: 404 };
    }
  },

  viewAdmins: async () => {
    try {
      const admin = await adminRepository.getMultiple({}, "-__v -_id -password");
      if (!admin)
        return {
          message: `No asset found. Please add new asset to inventory to issue to employee`,
          statusCode: 204
        };
      return { admin, statusCode: 200 };
    } catch (error) {
      //   logger.error(error);
      return { name: error.name, message: error.message, statusCode: 404 };
    }
  },

  updateAdminMobile: async body => {
    try {
      const update = await adminRepository.update(body);
      if (update) {
        return { message: "Updated Successfully !" };
      }
    } catch (error) {
      return { name: error.name, message: error.message };
    }
  },
}