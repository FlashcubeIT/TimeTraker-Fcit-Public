import User from "../models/userModel.js"
import SubAdmin from "../models/subAdmin.js";
import Manager from "../models/managerModel.js";
import Admin from "../models/adminModel.js"
import nodemailer from 'nodemailer'




const registerManager = async (req, res) => {
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
                const manager = await Manager.create({
                    name: name,
                    email: email,
                    password: password,
                    role: role,
                    companyID: companyID,
                    phone: phone,
                })

                if (manager) {


                    res.status(201).json({
                        _id: manager._id,
                        name: manager.name,
                        email: manager.email,
                        role: manager.role,
                        companyID: manager.companyID,
                        phone: manager.phone,
                        message: "manager created"
                    })


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
                            to: `${manager.email}`,
                            subject: 'Welcome to TimeTraker',
                            html: `
<p style="font-size: 25px; font-weight: 600; color: black; ">Welcome ${manager.name}!</p> <br/>
<p>Here is your login details</p> <br/>
<p>Your email id :- ${manager.email},</p> 
<p>& Your password :- ${manager.password}.</p> <br/>
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

            }
        }
    } catch (error) {
        console.log("error from register api", error)
    }
}



const loginManager = async (req, res) => {
    try {
        const { email, password } = req.body
        const manager = await Manager.findOne({ email, password })

        if (manager) {
            res.status(200).json({
                manager: manager
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

const getAllManager = async (req, res) => {
    try {
        const companyID = req.query.companyID
        const allManager = await Manager.find({ companyID })

        if (allManager) {
            res.status(200).json({
                allManager: allManager
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


const deleteManager = async (req, res) => {
    try {
        const userID = req.query.userID
        const deletedManager = await Manager.findByIdAndRemove(userID);

        if (deletedManager) {
            res.status(200).json({
                deletedManager: deletedManager
            })
        }

    }
    catch (error) {
        res.status(200).json({
            deletedUser: error
        })
    }
}



export { registerManager, loginManager, getAllManager, deleteManager }

