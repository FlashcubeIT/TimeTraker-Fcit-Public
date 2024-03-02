import User from "../models/userModel.js"
import SubAdmin from "../models/subAdmin.js";
import Manager from "../models/managerModel.js";
import Admin from "../models/adminModel.js"
import nodemailer from 'nodemailer'

const varifyEmailForForgotPass = async (req, res) => {
    const { email, name } = req.body
    const otp = req.query.otp
    console.log(otp, email, name)

    //2. import nodemailer
    // chacking admin exist or  not 
    const userExist = await User.findOne({ email })
    const subAdminExist = await SubAdmin.findOne({ email })
    const managerExist = await Manager.findOne({ email })
    const adminExist = await Admin.findOne({ email })

    if (userExist || subAdminExist || managerExist || adminExist) {
        if (userExist) {
            var userData = userExist
        } else if (subAdminExist) {
            var userData = subAdminExist
        } else if (managerExist) {
            var userData = managerExist
        } else {
            var userData = adminExist
        }
        //3. cofigure mail and send it
        async function sendMail() {
            //1. create an email transporter.


            //SMTP (Simple Mail Transfer Protocol)
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'opto3789@gmail.com',
                    pass: 'vevk mwjh zhqu obby'
                }
            })
            // mitr mpks dxfu gnnz

            //2.configure email content.
            const mailOptions = {
                from: 'opto3789@gmail.com',
                to: `${email}`,
                subject: 'Reset your TimeTraker password',
                html: `
                <p style="font-size: 25px; font-weight: 600; color: black; ">Your reset password otp is <span style=" font-weight: 600; color: black; ">${otp}</span> </p> <br/>
                <p>I hope you enjoy using TimeTraker. If you have any questions or feedback, please don't hesitate to reach us at <a href="mailto:contact@flashcubeit.com">contact@flashcubeit.com</a>.</p> <br/>
                <p>You can also reach out to us at: <a href="mailto:admin@flashcubeit.com">admin@flashcubeit.com</a> or you can call on +91 9953156485</p> <br/><br/>
                <p>Thank you,</p>
                <p>TimeTraker</p>
                `
            }

            try {
                const result = await transporter.sendMail(mailOptions);
                res.status(200).json({
                    role: userData.role
                })

            } catch (error) {
                console.log('Email send failed with error:', error)
            }
        }
        sendMail()
    } else {
        res.status(400).json({
            result: "You does not have a account"
        })




    }
}




const AdminForgotPass = async (req, res) => {
    try {

        const { new_pass, email } = req.body


        const filter = { email: email }


        const update = {
            $set: {
                password: new_pass, // Replace with the field you want to update and its new value
            },
        };


        const result = await Admin.updateOne(filter, update);
        if (result) {
            res.status(200).json({
                result: result
            })
            
        } else {
            res.status(400).json({
                result: "invalid pass"
            })
        }
    } catch (error) {
        console.log("error from log in api", error)
    }
}



const userForgotPass = async (req, res) => {
    try {

        const { new_pass, email } = req.body


        const filter = { email: email }


        const update = {
            $set: {
                password: new_pass, // Replace with the field you want to update and its new value
            },
        };


        const result = await User.updateOne(filter, update);
        if (result) {
            res.status(200).json({
                result: result
            })
            
        } else {
            res.status(400).json({
                result: "invalid pass"
            })
        }
    } catch (error) {
        console.log("error from log in api", error)
    }
}

const subAdminForgotPass = async (req, res) => {
    try {


        const { new_pass, email } = req.body


        const filter = { email: email }


        const update = {
            $set: {
                password: new_pass, // Replace with the field you want to update and its new value
            },
        };


        const result = await SubAdmin.updateOne(filter, update);
        if (result) {
            res.status(200).json({
                result: result
            })
            
        } else {
            res.status(400).json({
                result: "invalid pass"
            })
        }
    } catch (error) {
        console.log("error from log in api", error)
    }
}

const managerForgotPass = async (req, res) => {
    try {


        const { new_pass, email } = req.body


        const filter = { email: email }


        const update = {
            $set: {
                password: new_pass, // Replace with the field you want to update and its new value
            },
        };


        const result = await Manager.updateOne(filter, update);
        if (result) {
            res.status(200).json({
                result: result
            })
            
        } else {
            res.status(400).json({
                result: "invalid pass"
            })
        }
    } catch (error) {
        console.log("error from log in api", error)
    }
}



export { varifyEmailForForgotPass, managerForgotPass, subAdminForgotPass, userForgotPass, AdminForgotPass }