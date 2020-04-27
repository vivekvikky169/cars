// const redis = require('redis');
// const {RateLimiterRedis} = require('rate-limiter-flexible');

// const redisClient = redis.createClient({
//   host: 'localhost',
//   port: 6379,
//   enable_offline_queue: false,
// });

// const rateLimiter = new RateLimiterRedis({
//   redis: redisClient,
//   keyPrefix: 'middleware',
//   points: 5, // 10 requests
//   duration: 10, // per 1 second by IP
// });

// const rateLimiterMiddleware = (req, res, next) => {
//   rateLimiter.consume(req.ip)
//     .then(() => {
//       next();
//     })
//     .catch(() => {
//       res.status(429).send({ message:'Too Many Requests. Please try after sometime'});
//     });
// };

// module.exports = rateLimiterMiddleware;