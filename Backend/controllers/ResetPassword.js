const crypto = require("crypto");
const bcrypt = require('bcrypt')

require("dotenv").config();

const User = require("../models/User");
const sendMail = require("../utils/nodemailer");
const { resetPasswordTemplate } = require("../mail/templates/resetPasswordTemplate");


// ResetPasswordToken -- send email
exports.resetPasswordToken = async (req, res) => {

    try {
        const { email } = req.body;

        // validation 

        if (!email) {
            return res.status(400).json({ success: false, message: "Provide the email!" });
        }

        // verify the email -- user is exits
        const userDoc = await User.findOne({ email });

        if (!userDoc) {
            return res.status(401).json({ success: false, message: "User is not exits!" })
        }

        // generate a token
        const token = crypto.randomBytes(20).toString('hex');

        // update user by adding token and expirastion time
        await User.findOneAndUpdate({ email }, {
            $set:
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000,
            }
        });

        // create UI link on email 
        const resetURL = `http://localhost:${process.env.FRONTEND_PORT}/${userDoc._id}/update-password/${token}`; // id will increase security

        // send mail containg the UI link
        try {
            const receiverMail = userDoc.email;
            const title = "Reset password Link from the Vikas Tech :- ";
            const body = resetPasswordTemplate( resetURL );
            

            await sendMail(receiverMail, title, body);

        } catch (err) {
            console.log(err, 'Error in resetPassword token handler during send mail!')
            return res.status(500).json({
                success: false, message: "Fail to send mail for resetPassword!",
                error: err.message,
            })
        }


        return res.status(200).json({ success: true, message: "Mail sent successfully, please check email." })

    } catch (error) {
        console.log(error, 'error in resetPassword token controller')
        return res.status(500).json({
            success: false,
            message: "couldn't reset the password",
            error: message.error
        })
    }

}

// ResetPassword  --> entry in DB
exports.resetPassword = async (req, res) => {

    try {
        // const { id , token } = req.params
        const { id , token } = req.body // Think --> frontend developer send it
        const {  password , confirmPassword } = req.body;

        // validation
        if( !password || !confirmPassword || !token || !id ){
            return res.status(400).json({ success: false, message: "Provide the all fields information!" });
        }

        // is passwords matched
        if( password !== confirmPassword ){
            return res.status(400).json({ success: false, message: "Passwords are not matched!" });
        }

        // find user and validate by token field
        const userDoc = await User.findOne({ _id : id , token : token });

        if( !userDoc ){
            return res.status(401).json({ success: false, message: "Invalid token or userId!" });
        }

        // validation on token - based on expire time
        if( userDoc.resetPasswordExpires < Date.now() ){
            return res.status(401).json({ success: false, message: "Link  is expired! please generate new reset pasword link." });
        }

        // hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash( password , saltRounds );

        // reset/update the password
        await User.findByIdAndUpdate( id ,{ $set : { password : hashedPassword , token : null } } , { new : true } );

        // return resposne
        return res.status(200).json({ success: true, message: "Password is successfully reset." });


    } catch (error) {
        console.log(error, 'error in resetPassword token controller')
        return res.status(500).json({
            success: false,
            message: "couldn't reset the password",
            error: error.message
        })
    }

}