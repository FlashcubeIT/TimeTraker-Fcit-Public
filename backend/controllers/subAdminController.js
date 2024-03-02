import User from "../models/userModel.js"
import SubAdmin from "../models/subAdmin.js";
import Manager from "../models/managerModel.js";
import Admin from "../models/adminModel.js"
import nodemailer from 'nodemailer'



const registerSubAdmin = async (req, res) => {
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
                const subAdmin = await SubAdmin.create({
                    name: name,
                    email: email,
                    password: password,
                    role: role,
                    companyID: companyID,
                    phone: phone,
                })

                if (subAdmin) {

                    res.status(201).json({
                        _id: subAdmin._id,
                        name: subAdmin.name,
                        email: subAdmin.email,
                        role: subAdmin.role,
                        companyID: subAdmin.companyID,
                        phone: subAdmin.phone,
                        message: "sub admin created"
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
                            to: `${subAdmin.email}`,
                            subject: 'Welcome to TimeTraker',

                            html: `
<p style="font-size: 25px; font-weight: 600; color: black; ">Welcome ${subAdmin.name}!</p> <br/>
<p>Here is your login details</p> <br/>
<p>Your email id :- ${subAdmin.email},</p> 
<p>& Your password :- ${subAdmin.password}.</p> <br/>
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



const loginSubAdmin = async (req, res) => {
    try {
        const { email, password } = req.body
        const subAdmin = await SubAdmin.findOne({ email, password })

        if (subAdmin) {
            res.status(200).json({
                subAdmin: subAdmin
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

const getAllsubAdmin = async (req, res) => {
    try {
        const companyID = req.query.companyID
        const allSubAdmin = await SubAdmin.find({ companyID })

        if (allSubAdmin) {
            res.status(200).json({
                allSubAdmin: allSubAdmin
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


const deleteSubAdmin = async (req, res) => {
    try {
        const userID = req.query.userID
        const deletedSubAdmin = await SubAdmin.findByIdAndRemove(userID);

        if (deletedSubAdmin) {
            res.status(200).json({
                deletedSubAdmin: deletedSubAdmin
            })
        }

    }
    catch (error) {
        res.status(200).json({
            deletedUser: error
        })
    }
}



export { registerSubAdmin, loginSubAdmin, getAllsubAdmin, deleteSubAdmin }

