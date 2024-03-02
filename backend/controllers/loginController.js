import User from "../models/userModel.js"
import SubAdmin from "../models/subAdmin.js";
import Manager from "../models/managerModel.js";
import Admin from "../models/adminModel.js"
import generateToken from "../config/generateToken.js";


const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body
        // it will check for admin 

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

    // it will check for user 


            const user = await User.findOne({ email, password })

            if (user) {
                res.status(200).json({
                    user: {
                        accessibility: user.accessibility,
                        email: user.email,
                        name: user.name,
                        phone: user.phone,
                        role: user.role,
                        _id: user._id,
                        companyID:user.companyID,
                        createdAt: user.createdAt,
                        token: generateToken(user._id)
                    }
                })
            } else {
                // it will check for manager 
                try {
                    const user = await Manager.findOne({ email, password })

                    if (user) {
                        res.status(200).json({
                            user: {
                                accessibility: user.accessibility,
                                email: user.email,
                                name: user.name,
                                phone: user.phone,
                                role: user.role,
                                companyID:user.companyID,
                                _id: user._id,
                                createdAt: user.createdAt,
                                token: generateToken(user._id)
                            }
                        })
                    } else {
                        // it will check for sub-admin 

                        try {
                            const user = await SubAdmin.findOne({ email, password })

                            if (user) {
                                res.status(200).json({
                                    user: {
                                        accessibility: user.accessibility,
                                        email: user.email,
                                        name: user.name,
                                        phone: user.phone,
                                        role: user.role,
                                        companyID:user.companyID,
                                        _id: user._id,
                                        createdAt: user.createdAt,
                                        token: generateToken(user._id)
                                    }
                                })
                            } else {
                                res.status(401).json({
                                    result: "faild to login , invalid admin name or password"
                                })

                            }
                        } catch (error) {
                            console.log("error from log in api", error)
                        }
                    }
                } catch (error) {
                    console.log("error from log in api", error)
                }

            }
        }
    } catch (error) {
        console.log("error from log in api", error)
    }
}





const getUser = async (req, res) => {
    // it will check for user 
    try {
        const userID = req.query.userID
        const user = await User.findOne({ _id: userID })

        if (user) {
            res.status(200).json({
                user: user
            })
        } else {
            // it will check for manager 
            try {
                const user = await Manager.findOne({ _id: userID })

                if (user) {
                    res.status(200).json({
                        user: user
                    })
                } else {
                    // it will check for sub-admin 

                    try {
                        const user = await SubAdmin.findOne({ _id: userID })

                        if (user) {
                            res.status(200).json({
                                user: user
                            })
                        } else {
                            // it will check for admin 
                            try {
                                const user = await Admin.findOne({ _id: userID })

                                if (user) {
                                    res.status(200).json({
                                        user: user
                                    })
                                } else {
                                    res.status(401).json({
                                        result: "faild to login , invalid admin name or password"
                                    })
                                }
                            } catch (error) {
                                console.log("error from log in api", error)
                            }
                        }
                    } catch (error) {
                        console.log("error from log in api", error)
                    }
                }
            } catch (error) {
                console.log("error from log in api", error)
            }

        }
    } catch (error) {
        console.log("error from log in api", error)
    }
}





export { loginUser, getUser }
