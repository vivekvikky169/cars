const userRequestService = require('../services/userRequest')

module.exports = {
    postCarRequest: async (request, response) => {
        if (
            !request.body.name ||
            !request.body.mobile ||
            !request.body.carRequiredFrom ||
            !request.body.carRequiredTo ||
            !request.body.carNumber
        )
            return response.send({ message: "Error. Please provide all Details" });
        const result = await userRequestService.postCarRequest(request.body);
        return response.send(result);
    },

    // need to review
    // viewPendingCarRequest: async (request, response) => {
    //     userRequest.find({ requestStatus: "pending" }, '-_id -__v').then((res) => {
    //         response.status(200).send(res);
    //     })
    //         .catch((err) => response.send({ name: err.name, message: err.message }))
    // },

    viewCarRequests: async (request, response) => {
        if (!request.body.requestStatus)
            return response.send({
                message: "Please provide request status"
            });
        const result = await userRequestService.viewCarRequests(request.body);
        return response.send(result);
    },

    changeReqStatus: async (request, response) => {
        if (!request.body.mobile || !request.body.requestStatus)
            return response.send({
                message: "Please provide mobile number and status"
            });
        const result = await userRequestService.changeReqStatus(request.body);
        return response.send(result);
    },

    recentBookings: async (request, response) => {
        if (!request.body.mobile)
            return response.send({
                message: "Please provide mobile number"
            });
        const result = await userRequestService.recentBookings(request.body);
        return response.send(result);
    },

    availability: async (request, response) => {
        if(!request.body.carRequiredFrom || !request.body.carRequiredTo) {
        return response.send({
            message: "Please provide from and to details"
        });
        }
        const result = await userRequestService.availability(request.body);
        return response.send(result);
    }

}