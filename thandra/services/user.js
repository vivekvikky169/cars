const redis = require("redis");
const logger = require('../middleware/logger');
const client = redis.createClient();
const userRepository = require('../repository/user')
const jwt = require("jsonwebtoken");

module.exports = {
  logout: async token => {
    return new Promise((resolve, reject) => {
      var temp = 0;
      client.keys("*", (err, keys) => {
        if (err) {
          console.log(err, 'err')
          reject({ name: err.name, message: err.message })

        }
        for (var i = 0; i < keys.length; i++) {
          if (keys[i] == token) {
            temp = 1;
            console.log(keys[i], 'i')
            break;
          }
        }
        if (temp == 1) {
          client.del(token);
          temp = 0;
          resolve({ message: "Successfully LOGGED OUT !" });
        } else {
          resolve({ message: "Session Timed Out !" });
        }
      });
    });
  },

  updatePassword: async body => {
    try {
      const user = await userRepository.get({ mobile: body.mobile, password: body.password }, "-__v -_id ");
      console.log(user, 'aa')
      if (user != null) {
        const update = await userRepository.update(body)
        if (update) {
          return { message: "Updated Successfully !" };
        }
        else {
          console.log('asasasasas')
        }
      }
      else {
        console.log('b')
        return { message: "please enter correct password " }
      }
    } catch (error) {
      logger.error({ name: error.name, message: error.message });
      return { name: error.name, message: error.message };
    }
  },

  login: async body => {
    try {
      const user = await userRepository.get({ mobile: body.mobile, password: body.password }, "-__v -_id -password");
      if (user != null) {
        const token = jwt.sign(
          { mobile: body.mobile, password: body.password },
          't1h2a3mnjjsci',
          { expiresIn: 5000 }
        );
        client.set(token, body.mobile, "EX", 3600);
        return token;
      } else {
        return { message: 'Please check your password and try again', accessToken: "" }
      }
    } catch (error) {
      logger.error({ name: error.name, message: error.message });
      return { name: error.name, message: error.message };
    }
  },

  signin: async body => {
    try {
      const user = await userRepository.get({ mobile: body.mobile }, "-__v -_id ");
      if (user == null || user == "null") {
        const userData = {
          name: body.name,
          email: body.email,
          mobile: body.mobile,
          password: body.password
        }
        await userRepository.create(userData);
        return ({ message: "signed up Successfully, Login to continue !" });
      }
      else {
        return ({ message: `${body.mobile} is already present Login to continue !` })
      }
    } catch (error) {
      logger.error({ name: error.name, message: error.message });
      return { name: error.name, message: error.message };
    }
  },

  viewUsers: async () => {
    try {
      const user = await userRepository.getMultiple({}, "-__v -_id -password");
      return user;
    } catch (error) {
      logger.error({ name: error.name, message: error.message });
      return { name: error.name, message: error.message };
    }
  },
}