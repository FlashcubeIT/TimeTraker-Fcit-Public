import User from "../models/userModel.js"
import SubAdmin from "../models/subAdmin.js";
import Manager from "../models/managerModel.js";


const updateSubAdminAccessibility = async (req, res) => {
    try {

        // const {project, employe, task, myTimesheets, myExpenses, expenses, timesheets, dashboard, sync, download, setupCustomization, reports, role, profile} = req.body
        const accessibility = req.body


        const filter = { role: 'sub-admin' }
        const update = {
            $set: {
                accessibility: accessibility,
            },
        };
        const result = await SubAdmin.updateOne(filter, update);

        if (result) {

            res.status(200).json({
                result: result
            })
        } else {
            res.status(410).json({
                message: 'some problem in updateAdminAccessibility'
            })
        }
    } catch (error) {
        console.log("error from log in api", error)
    }
}
const updateManagerAccessibility = async (req, res) => {
    try {

        // const {project, employe, task, myTimesheets, myExpenses, expenses, timesheets, dashboard, sync, download, setupCustomization, reports, role, profile} = req.body
        const accessibility = req.body


        const filter = { role: 'manager' }
        const update = {
            $set: {
                accessibility: accessibility,
            },
        };
        const result = await Manager.updateOne(filter, update);

        if (result) {

            res.status(200).json({
                result: result
            })
        } else {
            res.status(410).json({
                message: 'some problem in updateManagerAccessibility'
            })
        }
    } catch (error) {
        console.log("error from log in api", error)
    }
}
const updateUserAccessibility = async (req, res) => {
    try {

        // const {project, employe, task, myTimesheets, myExpenses, expenses, timesheets, dashboard, sync, download, setupCustomization, reports, role, profile} = req.body
        const accessibility = req.body


        const filter = { role: 'user' }
        const update = {
            $set: {
                accessibility: accessibility,
            },
        };
        const result = await User.updateOne(filter, update);

        if (result) {

            res.status(200).json({
                result: result
            })
        } else {
            res.status(410).json({
                message: 'some problem in updateUserAccessibility'
            })
        }
    } catch (error) {
        console.log("error from log in api", error)
    }
}

const getUserAccessibility = async (req, res) => {
    try {

        // const {project, employe, task, myTimesheets, myExpenses, expenses, timesheets, dashboard, sync, download, setupCustomization, reports, role, profile} = req.body
      


        const result = await User.findOne({role: 'user'});

        if (result) {

            res.status(200).json({
                result: result.accessibility
            })
        }
    } catch (error) {
        console.log("error from log in api", error)
    }
}
const getManagerAccessibility = async (req, res) => {
    try {

        // const {project, employe, task, myTimesheets, myExpenses, expenses, timesheets, dashboard, sync, download, setupCustomization, reports, role, profile} = req.body
      


        const result = await Manager.findOne({role: 'manager'});

        if (result) {

            res.status(200).json({
                result: result.accessibility
            })
        }
    } catch (error) {
        console.log("error from log in api", error)
    }
}
const getSubAdminAccessibility = async (req, res) => {
    try {

        // const {project, employe, task, myTimesheets, myExpenses, expenses, timesheets, dashboard, sync, download, setupCustomization, reports, role, profile} = req.body
      


        const result = await SubAdmin.findOne({role: 'sub-admin'});

        if (result) {

            res.status(200).json({
                result: result.accessibility
            })
        }
    } catch (error) {
        console.log("error from log in api", error)
    }
}




export {updateSubAdminAccessibility, getSubAdminAccessibility, getManagerAccessibility, updateManagerAccessibility, updateUserAccessibility, getUserAccessibility}