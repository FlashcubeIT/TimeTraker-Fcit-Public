import User from "../models/userModel.js"
import SubAdmin from "../models/subAdmin.js";
import Manager from "../models/managerModel.js";
import Admin from "../models/adminModel.js"
// const nodemailer = require('nodemailer');
import nodemailer from 'nodemailer'

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, companyID, phone } = req.body;

        // chacking user exist or  not 
        const userExist = await User.findOne({ email })
        const subAdminExist = await SubAdmin.findOne({ email })
        const managerExist = await Manager.findOne({ email })
        const adminExist = await Admin.findOne({ email })
        const userExistByName = await User.findOne({ name, companyID })
        const subAdminExistByName = await SubAdmin.findOne({ name, companyID })
        const managerExistByName = await Manager.findOne({ name, companyID })
        const adminExistByName = await Admin.findOne({ name: name, _id: companyID })

        if (userExist || subAdminExist || managerExist || adminExist) {
            res.status(210).json({
                message: "email exist"
            })
        } else {
            if (userExistByName || subAdminExistByName || adminExistByName || managerExistByName) {
                res.status(211).json({
                    message: "name exist"
                })
            } else {


                const user = await User.create({
                    name: name,
                    email: email,
                    password: password,
                    role: role,
                    companyID: companyID,
                    phone: phone,
                })

                if (user) {

                    res.status(201).json({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        companyID: user.companyID,
                        phone: user.phone,
                        message: "user created"
                    })
                    //2. import nodemailer


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
                            to: `${user.email}`,
                            subject: 'Welcome to TimeTraker',
                            html: `
    <p style="font-size: 25px; font-weight: 600; color: black; ">Welcome ${user.name}!</p> <br/>
    <p>Here is your login details</p> <br/>
    <p>Your email id :- ${user.email},</p> 
    <p>& Your password :- ${user.password}.</p> <br/>
    <p>Unlock the door to your account—simply <a href="http://timetraker.com/login">click here</a> to access the login page.<p/><br/>
    <p>I hope you enjoy using TimeTraker. If you have any questions or feedback, please don't hesitate to reach us at <a href="mailto:contact@flashcubeit.com">contact@flashcubeit.com</a>.</p> <br/>
    <p>You can also reach out to us at: <a href="mailto:admin@flashcubeit.com">admin@flashcubeit.com</a> or you can call on +91 9953156485</p> <br/><br/>
    <p>Thank you,</p>
    <p>TimeTraker</p>`
                        }

                        //3. send email
                        try {
                            const result = await transporter.sendMail(mailOptions);
                            console.log('Eamil sent successfully')
                        } catch (error) {
                            console.log('Email send failed with error:', error)
                        }
                    }

                    sendMail()



                  
                }
                // email starts here 


                //1. install nodemailer libararay














                // email ends here 

            }

        }


    } catch (error) {
        console.log("error from register api", error)
    }
}




const createPassAndRegisterUserForQB = (req, res) => {
    const { name, email, role, companyID, phone } = req.body;
    const generateRandomPassword = (length) => {
        let password = "";
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset.charAt(randomIndex);
        }
        registerUserForQB(name, email, role, companyID, phone, password, req, res)
    };

    generateRandomPassword(8)
}


const registerUserForQB = async (name, email, role, companyID, phone, password, req, res) => {
    try {


        // chacking user exist or  not 
        const userExist = await User.findOne({ email })
        const subAdminExist = await SubAdmin.findOne({ email })
        const managerExist = await Manager.findOne({ email })
        const adminExist = await Admin.findOne({ email })
        const userExistByName = await User.findOne({ name, companyID })
        const subAdminExistByName = await SubAdmin.findOne({ name, companyID })
        const managerExistByName = await Manager.findOne({ name, companyID })
        const adminExistByName = await Admin.findOne({ name: name, _id: companyID })

        if (userExist || subAdminExist || managerExist || adminExist) {
            res.status(210).json({
                message: "email exist"
            })
        } else {
            if (userExistByName || subAdminExistByName || adminExistByName || managerExistByName) {
                res.status(211).json({
                    message: "name exist"
                })
            } else {
                const user = await User.create({
                    name: name,
                    email: email,
                    password: password,
                    role: role,
                    companyID: companyID,
                    phone: phone,
                })

                if (user) {



                    res.status(201).json({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        companyID: user.companyID,
                        phone: user.phone
                    })
                }
            }

        }

    } catch (error) {
        console.log("error from register api", error)
    }
}




const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email, password })

        if (user) {
            res.status(200).json({
                user: user
            })
        } else {
            res.status(401).json({
                result: "faild to login , invalid user name or password"
            })
        }
    } catch (error) {
        console.log("error from log in api", error)
    }
}

const getAllUser = async (req, res) => {
    try {
        const companyID = req.query.companyID
        const allUsers = await User.find({ companyID })

        if (allUsers) {
            res.status(200).json({
                allUsers: allUsers
            })
        } else {
            res.status(401).json({
                result: "faild to get allUsers"
            })
        }
    } catch (error) {
        console.log("error from task api", error)
    }
}


const deleteUser = async (req, res) => {
    try {
        const userID = req.query.userID
        const deletedUser = await User.findByIdAndRemove(userID);

        if (deletedUser) {
            res.status(200).json({
                deletedUser: deletedUser
            })
        }

    }
    catch (error) {
        res.status(200).json({
            deletedUser: error
        })
    }
}







export { registerUser, createPassAndRegisterUserForQB, loginUser, getAllUser, deleteUser }

