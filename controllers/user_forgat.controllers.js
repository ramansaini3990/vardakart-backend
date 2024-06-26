const User = require('../models/user.models');
const randomstring = require('randomstring');
const nodemailer = require('nodemailer');

exports.sendRestPasswordMail = async (firstName, email, token) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            port: 587,
            secureConnection: false,
            secure: true,
            ignoreTLS: false,
            requireTLS: true,
            auth: {
                user: process.env.ADMIN_MAIL,
                pass: process.env.ADMIN_PASS
            },
            tls: {
                ciphers: 'SSLv3'
            }
        });

        const mailOptions = {
            from: process.env.ADMIN_MAIL,
            to: recEmail,
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
        // restatus(400).send({ success: false, msg: error.message })
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