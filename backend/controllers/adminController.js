import User from "../models/userModel.js"
import SubAdmin from "../models/subAdmin.js";
import Manager from "../models/managerModel.js";
import Admin from "../models/adminModel.js"
import nodemailer from 'nodemailer'
import generateToken from "../config/generateToken.js";

const varifyEmail = async (req, res) => {
    const { email, name } = req.body
    const otp = req.query.otp
    console.log(otp, email, name)

    //2. import nodemailer
    // chacking admin exist or  not 
    try {
        const userExist = await User.findOne({ email })
        const subAdminExist = await SubAdmin.findOne({ email })
        const managerExist = await Manager.findOne({ email })
        const adminExist = await Admin.findOne({ email })
        const adminExistByName = await Admin.findOne({ name: name })

        if (userExist || subAdminExist || managerExist || adminExist) {
            res.status(210).json({
                message: "email exist"
            })
        } else {
            if (adminExistByName) {
                res.status(211).json({
                    message: "name exist"
                })
            } else {

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
                        subject: 'Welcome to TimeTraker ',
                        html: `
<p style="font-size: 25px; font-weight: 600; color: black; ">Welcome ${name}!</p> <br/>
<p>Your otp is <span style=" font-weight: 600; color: black; ">${otp}</span></p> <br/>
<p>I hope you enjoy using TimeTraker. If you have any questions or feedback, please don't hesitate to reach us at <a href="mailto:contact@flashcubeit.com">contact@flashcubeit.com</a>.</p> <br/>
<p>You can also reach out to us at: <a href="mailto:admin@flashcubeit.com">admin@flashcubeit.com</a> or you can call on +91 9953156485</p> <br/><br/>
<p>Thank you,</p>
<p>TimeTraker</p>
`
                    }

                    try {
                        const result = await transporter.sendMail(mailOptions);
                        res.status(200).json({
                            message: "email Send"
                        })

                    } catch (error) {
                        console.log('Email send failed with error:', error)
                    }
                }
                sendMail()
            }
        }
    } catch (error) {
        console.log('Email send failed with error:', error)
    }
}

const registerAdmin = (req, res) => {
    const { name, email, companyName, role, phone } = req.body;
    const generateRandomPassword = (length) => {
        let password = "";
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset.charAt(randomIndex);
        }
        registerAdmin2(name, email, companyName, role, phone, password, req, res)
    };

    generateRandomPassword(8)


}

const registerAdmin2 = async (name, email, companyName, role, phone, password, req, res) => {
    try {
        // console.log("req body", req.body)

        // distrack object came from front-end in register page 


        // chacking admin exist or  not 
        const userExist = await User.findOne({ email })
        const subAdminExist = await SubAdmin.findOne({ email })
        const managerExist = await Manager.findOne({ email })
        const adminExist = await Admin.findOne({ email })

        if (userExist || subAdminExist || managerExist || adminExist) {
            res.status(400).json({
                result: "admin is alrady exist"
            })
        } else {
            const admin = await Admin.create({
                name: name,
                email: email,
                password: password,
                role: role,
                phone: phone,
                companyName: companyName
            })

            if (admin) {
                sendWelcomeEmail(admin, req, res)
                res.status(201).json({
                    _id: admin._id,
                    name: admin.name,
                    email: admin.email,
                    role: admin.role,
                    phone: admin.phone,
                    message: "mail send"
                })
            }
        }

    } catch (error) {
        console.log("error from register api", error)
    }
}


const sendWelcomeEmail = (admin, req, res) => {
    async function sendMail(admin, req, res) {
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
            to: `${admin.email}`,
            subject: 'Login Credentials For TimeTraker',
            html: `
<p style="font-size: 25px; font-weight: 600; color: black; ">Welcome ${admin.name}!</p> <br/>
<p>Your Passoward is <span style=" font-weight: 600; color: black; ">${admin.password}</span></p> <br/>
<p>I hope you enjoy using TimeTraker. If you have any questions or feedback, please don't hesitate to reach us at <a href="mailto:contact@flashcubeit.com">contact@flashcubeit.com</a>.</p> <br/>
<p>You can also reach out to us at: <a href="mailto:admin@flashcubeit.com">admin@flashcubeit.com</a> or you can call on +91 9953156485</p> <br/><br/>
<p>Thank you,</p>
<p>TimeTraker</p>
`
        }

        try {
            const result = await transporter.sendMail(mailOptions);

        } catch (error) {
            console.log('Email send failed with error:', error)
        }
    }
    sendMail(admin, req, res)
}



const loginAdmin = async (req, res) => {
  
    try {
        const { email, password } = req.body
        console.log("email", email)
        console.log("pass", password)
        const admin = await Admin.findOne({ email, password })

        if (admin) {
            res.status(200).json({
                admin: {
                    accessibility: admin.accessibility,
                    email: admin.email,
                    name: admin.name,
                    phone: admin.phone,
                    role: admin.role,
                    _id: admin._id,
                    createdAt: admin.createdAt,
                    companyID:admin._id,
                    token: generateToken(admin._id)
                }
            })
        } else {
            res.status(401).json({
                result: "faild to login , invalid admin name or password"
            })
        }
    } catch (error) {
        console.log("error from log in api", error)
        res.status(401).json({
            result: "faild to login , invalid admin name or password"
        })
    }
}

const superAdmin = async (req, res) => {
    try {
        const companyID = req.query.companyID
        const superAdmin = await Admin.find({ _id: companyID })

        if (superAdmin) {
            res.status(200).json({
                superAdmin: superAdmin
            })
        } else {
            res.status(401).json({
                result: "faild to get superAdmin"
            })
        }
    } catch (error) {
        console.log("error from superAdmin api", error)
        res.status(401).json({
            result: "faild to get superAdmin"
        })
    }
}



// sign in with intuite 

const registerAdminForSignInWithIntuite = (req, res) => {
    const { name, email, companyName, phone } = req.body;
    const role = 'admin'
    const generateRandomPassword = (length) => {
        let password = "";
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset.charAt(randomIndex);
        }
        registerAdmin2ForSignInWithIntuite(name, email, companyName, role, phone, password, req, res)
    };

    generateRandomPassword(8)


}

const registerAdmin2ForSignInWithIntuite = async (name, email, companyName, role, phone, password, req, res) => {
    try {
        // console.log("req body", req.body)

        // distrack object came from front-end in register page 


        // chacking admin exist or  not 
        const userExist = await User.findOne({ email })
        const subAdminExist = await SubAdmin.findOne({ email })
        const managerExist = await Manager.findOne({ email })
        const adminExist = await Admin.findOne({ email })

        if (userExist || subAdminExist || managerExist) {
            res.status(400).json({
                userExist: 'you have a employee account with this email' 
            })
        } else {
            if (adminExist) {
                res.status(200).json({
                    adminExist: adminExist
                })
            } else {
                const admin = await Admin.create({
                    name: name,
                    email: email,
                    password: password,
                    role: role,
                    phone: phone,
                    companyName: companyName
                })

                if (admin) {
                    sendWelcomeEmail(admin, req, res)
                    res.status(201).json({
                        createdAccount: {
                            _id: admin._id,
                            name: admin.name,
                            email: admin.email,
                            role: admin.role,
                            phone: admin.phone,
                            message: "mail send"
                        }
                    })
                }
            }
        }

    } catch (error) {
        console.log("error from register api", error)
    }
}









export { superAdmin, registerAdmin, loginAdmin, varifyEmail, registerAdminForSignInWithIntuite }

