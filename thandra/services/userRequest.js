const userRequestRepository = require('../repository/userRequest')
const carRepository = require('../repository/car')

module.exports = {
  postCarRequest: async body => {
    try {
      const pending = await userRequestRepository.getMultiple({ mobile: body.mobile, requestStatus: "pending" }, '-_id -__v')
      console.log(pending, 'pending')
      if (pending.length !== 0) { return { message: "cannot send a booking request until previous booking is confirmed or declined" } }
      const userRequestsData = {
        name: body.name,
        mobile: body.mobile,
        carRequiredFrom: body.carRequiredFrom,
        carRequiredTo: body.carRequiredTo,
        carNumber: body.carNumber
      }
      await userRequestRepository.create(userRequestsData)
      return { message: "Requested car Successfully ! contact owner for confirming your request" };
    } catch (error) {
      //   logger.error(error);
      return { name: error.name, message: error.message };
    }
  },

  viewCarRequests: async body => {
    try {
      console.log(body, 'body')
      const request = await userRequestRepository.getMultiple({ requestStatus: body.requestStatus }, "-__v -_id ");
      return request;
    } catch (error) {
      //   logger.error(error);
      return { name: error.name, message: error.message };
    }
  },

  changeReqStatus: async body => {
    try {
      const update = await userRequestRepository.update(body);
      if (update) {
        return { message: "Updated Successfully !" };
      }
      else {
        return { message: "No pending requests for this mobile" };
      }
    } catch (error) {
      return { name: error.name, message: error.message };
    }
  },


  recentBookings: async body => {
    try {
      const admin = await userRequestRepository.getMultiple({ mobile: body.mobile }, "-__v -_id ");
      return admin;
    } catch (error) {
      return { name: error.name, message: error.message };
    }
  },

  availability: async body => {
    try {
      const ar = [];
      const arr = [];
      const arrs = [];
      const availablecars = [];
      const nonAvailablecar = await userRequestRepository.getMultiple({
        requestStatus: "accepted",
        $and: [{ carRequiredTo: { $gte: body.carRequiredFrom } },
        { carRequiredFrom: { $lte: body.carRequiredTo } }]
      },
        "-_id  carNumber");
      console.log(nonAvailablecar, 'notavailablecars')
      for (var i = 0; i < nonAvailablecar.length; i += 1) {
        arr.push(nonAvailablecar[i].carNumber)
      }
      console.log(arr, 'arr')


      var cars = await carRepository.getMultiple({ carStatus: "true" }, "-__v -_id ")
      for (var a = 0; a < cars.length; a += 1) {
        arrs.push(cars[i].carNumber)
      }
      console.log(arrs, 'arrs')



      for (var b = 0; b < arrs.length; b += 1) {
        var c = 0
        for (var j = 0; j < arr.length; j += 1) {
          if (arrs[i] == arr[j]) {
            c += 1
          }
        }
        if (c == 0) {
          availablecars.push(arrs[i]);
          console.log(availablecars, 'i')
        }
      }
      console.log(availablecars, 'arrs')
      if (availablecars.length === 0) { return (" No cars available at provided dates "); }


      for (var d = 0; d < availablecars.length; d += 1) {
        var result = await carRepository.getMultiple({ carNumber: availablecars[i] }, "-__v -_id ")
        ar.push(result)
      }
      console.log(ar, 'result')
      return ar;
    } catch (error) {
      return { name: error.name, message: error.message };
    }
  }
}