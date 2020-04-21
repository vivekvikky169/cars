var url = require("url");
const adminService = require('../services/admin')

module.exports = {

  addAdmin: async (request, response) => {
    var queryData = url.parse(request.url, true).query;
    if (!queryData.assetType)
      return response
        .status(422)
        .json({ message: "Please provide All Fields" });
    const result = await adminService.addAdmin(queryData);
    return response.status(result.statusCode).send(result);
  },


  viewAdmins: async (request, response) => {
    const result = await adminService.viewAdmins();
    response.status(result.statusCode).send(result);
  },

  updateAdminMobile: async (request, response) => {
    if (!request.body.name || !request.body.mobile)
      return response.send({
        message: "Please provide admin name and mobile"
      });
    const result = await adminService.updateAdminMobile(request.body);
    return response.send(result);
  }
}