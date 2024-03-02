import User from "../models/userModel.js"
import SubAdmin from "../models/subAdmin.js";
import Manager from "../models/managerModel.js";
import Admin from "../models/adminModel.js"


const AdminUpdatePass = async(req, res) => {
    try{

        const {userID , c_password, n_password} = req.body
      

        const filter = { _id: userID, password: c_password }
        const admin = await Admin.findOne( filter )
        if (admin){
            const update = {
                $set: {
                    password :n_password , // Replace with the field you want to update and its new value
                },
              };
            const filter2 = {email: admin.email,}
            console.log("update", update)
            const result = await Admin.updateOne(filter2, update);
            res.status(200).json({
                result: result
            })
        }else{
            res.status(400).json({
                result: "invalid pass"
            })
        }
    }catch(error){
        console.log("error from log in api", error)
    }
}



const userUpdatePass = async(req, res) => {
    try{

        const {userID , c_password, n_password} = req.body
      

        const filter = { _id: userID, password: c_password }
        const user = await User.findOne( filter )
        if (user){
            const update = {
                $set: {
                    password :n_password , // Replace with the field you want to update and its new value
                },
              };
            const filter2 = {email: user.email,}
            console.log("update", update)
            const result = await User.updateOne(filter2, update);
            res.status(200).json({
                result: result
            })
        }else{
            res.status(401).json({
                result: "invalid pass"
            })
        }
    }catch(error){
        console.log("error from log in api", error)
    }
}

const subAdminUpdatePass = async(req, res) => {
    try{

        const {userID , c_password, n_password} = req.body
      

        const filter = { _id: userID, password: c_password }
        const subAdmin = await SubAdmin.findOne( filter )
        if (subAdmin){
            const update = {
                $set: {
                    password :n_password , // Replace with the field you want to update and its new value
                },
              };
            const filter2 = {email: subAdmin.email,}
            console.log("update", update)
            const result = await SubAdmin.updateOne(filter2, update);
            res.status(200).json({
                result: result
            })
        }else{
            res.status(401).json({
                result: "invalid pass"
            })
        }
    }catch(error){
        console.log("error from log in api", error)
    }
}

const managerUpdatePass = async(req, res) => {
    try{

        const {userID , c_password, n_password} = req.body
      

        const filter = { _id: userID, password: c_password }
        const manager = await Manager.findOne( filter )
        if (manager){
            const update = {
                $set: {
                    password :n_password , // Replace with the field you want to update and its new value
                },
              };
            const filter2 = {email: manager.email,}
            console.log("update", update)
            const result = await Manager.updateOne(filter2, update);
            res.status(200).json({
                result: result
            })
        }else{
            res.status(401).json({
                result: "invalid pass"
            })
        }
    }catch(error){
        console.log("error from log in api", error)
    }
}

export {AdminUpdatePass, userUpdatePass, subAdminUpdatePass, managerUpdatePass}