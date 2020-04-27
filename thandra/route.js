const express = require("express");
const carRoute = require('./routes/car')
const userRoute = require('./routes/user')
const userRequestRoute = require('./routes/userRequest')
const adminRoute = require('./routes/admin')
// const rateLimiterRedisMiddleware = require('./middleware/rateLimiterRedis');


module.exports = function(app) {
    app.use(express.json());
    // app.use(rateLimiterRedisMiddleware);
    app.use("/car", carRoute); 
    app.use("/user", userRoute);
    app.use("/userReq", userRequestRoute);
    app.use("/admin", adminRoute);
};
