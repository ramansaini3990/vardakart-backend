const User = require('../models/user.models');
const randomstring = require('randomstring');
const nodemailer = require('nodemailer');
const config = require('../config/config');

exports.sendRestPasswordMail = async (firstName, email, token) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtpout.secureserver.net',
            port: 465,
            secure: true,
            // requireTLS: true,
            auth: {
                user: config.emailUser,
                pass: config.emailPassword
            }
        });

        const mailOptions = {
            from: config.emailUser,
            to: email,
            subject: 'for reset password',
            html: '<p> Hii ' + firstName + ', Please click here <a href="http://127.0.0.1:4000/users/forgetPassword?token=' + token + '">and reset the password</a>'
        }
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("error------------", error)
            }
            else {
                console.log("mail has been sent---------", info.response)
            }
        })

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message })
    }
}



exports.forgetPassword = async (req, res) => {
    try {
        const email = req.body.email
        const userData = await User.findOne({ email: email })

        if (userData) {
            const randomString = randomstring.generate();
            const data = await User.updateOne({ email: email }, { $set: { token: randomString } });
            this.sendRestPasswordMail(userData.firstName, userData.email, randomString);
            res.status(200).send({ success: true, msg: "Please check your email" })
 
        }
        else {
            res.status(200).send({ success: true, msg: "This email does not exits" })
        }

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message })
    }
}