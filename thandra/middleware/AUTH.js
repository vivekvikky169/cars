// const redis = require('redis');

// const client = redis.createClient();

// function AUTH(req, res, next) {
//     var t=0;
//     const token = req.header('Authorization');
//     if (!token) {
//       //  logger.info('No token, Unauthorized!');       
//        return res.status(401).send({ message: 'No token, Unauthorized!' });
//       }
//     client.keys('*', function (_err, keys) {
//         for (var i = 0; i < keys.length; i++) {
//           if (keys[i] == token) {
//             t = 1;
//             break;
//           }
//         }
  
//         if (t == 1) {
//             t = 0
//           next();
//         }
//         else{
//           return res.status(401).send({message:"Unauthorized access or Session Timeout, login required again"})
          
//         }
          
//      });
//    }
//   module.exports = AUTH;