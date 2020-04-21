const user = require('../models/user')
const nodemailer = require("nodemailer");
const config = require('../config')
const logger = require('../middleware/logger')
const userService = require('../services/user')
const userRepository = require('../repository/user')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ypawan724292@gmail.com',
        pass: config.pass
    }
});


module.exports = {
    signin: async (request, response) => {
        if (!request.body.mobile || !request.body.name || !request.body.email || !request.body.password)
            return response.status(200).send({ message: "please fill all the fields" })
        const result = await userService.signin(request.body)
        return response.status(200).send(result);
    },

    login: async (request, response) => {
        console.log(request.body, 'body')
        if (!request.body.mobile || !request.body.password)
            return response.send({ message: "please fill all the fields", accessToken: "" })
        const users = await userRepository.get({ mobile: request.body.mobile }, "-__v -_id -password");
        if (users == null) return response.status(200).send({ message: `${request.body.mobile} mobile number is not registered with our application please signup`, accessToken: "" })
        const userData = await userRepository.get({ mobile: request.body.mobile, password: request.body.password }, "-__v -_id -password");
        if (userData == null) { return response.status(200).send({ message: 'Please check your password and try again', accessToken: "" }) }
        const result = await userService.login(request.body)
        return response.status(200).send({ message: "Logged in Successfully", accessToken: result });
    },

    viewUsers: async (request, response) => {
        const result = await userService.viewUsers();
        return response.send(result);
    },

    updatePassword: async (request, response) => {
        if (!request.body.password || !request.body.newPassword || !request.body.mobile) { return response.status(400).send("please fill all the fields") }
        const result = await userService.updatePassword(request.body)
        console.log(result, 'res')
        return response.status(200).send(result);
    },


    logout: async (request, response) => {
        const token = request.header("Authorization");
        if (!token) return response.send({ message: "Token not present!" });
        const result = await userService.logout(token);
        return response.send(result);
    },

    forgotPassword: async (request, response) => {
        if (!request.body.mobile) { return response.send({ message: "please enter mobile number" }) }
        user.findOne({ mobile: request.body.mobile }, 'email password name').then((res) => {
            console.log(request.body, 'mobile')
            console.log(res, 'resss')
            if (res == null || res == 'null') {
                return response.status(200).send({ message: `your mobile ${request.body.mobile} is not registered with our application` })
            } else {
                console.log(res.email)
                var mailOptions = {
                    from: 'ypawan724292@gmail.com',
                    to: res.email,
                    subject: 'Password of your thandra account',
                    text: `Hi ${res.name}. The password for your Thandra account is ${res.password}.Recommended: change your passsword in change password section after login.`
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        logger.error({ name: error.name, message: error.message });
                        return response.status(304).send({ message: 'Application is busy.Please Try  Later' })
                    } else {
                        response.status(200).send({ message: `Hi ${res.name} password has been sent to your registered mail address ${res.email}` })
                        console.log('Email sent: ' + info.response);
                    }
                });

            }
        })
            .catch((err) => response.status(400).send({ name: err.name, message: err.message }))
    },
}