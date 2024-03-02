import Timesheet from "../models/timesheetModel.js";
import User from "../models/userModel.js"
import SubAdmin from "../models/subAdmin.js";
import Manager from "../models/managerModel.js";
import Admin from "../models/adminModel.js"


const createTimesheet = async (req, res) => {
    try {
        // console.log("req body", req.body)

        // distrack object came from front-end in register page 
        const { userID, companyID, task, project, hours, name, date, userName, billable, description } = req.body;


        if (!name) {

            const newTimesheet = await Timesheet.create({
                userID: userID,
                companyID: companyID,
                task: task,
                project: project,
                hours: hours,
                name: name,
                date: date,
                userName: userName,
                sendToQb: false,
                billable: billable,
                description: description
            })

            if (newTimesheet) {
                res.status(201).json({
                    newTimesheet: newTimesheet
                })
            }
        }
        else {



            const timesheetExist = await Timesheet.findOne({ name: name, companyID: companyID })

            if (!timesheetExist) {
                const newTimesheet = await Timesheet.create({
                    userID: userID,
                    companyID: companyID,
                    task: task,
                    project: project,
                    hours: hours,
                    name: name,
                    date: date,
                    userName: userName,
                    sendToQb: false,
                    billable: billable,
                    description: description
                })

                if (newTimesheet) {
                    res.status(201).json({
                        //  _id : newTimesheet._id,
                        //  date : newTimesheet.date,
                        //  hours : newTimesheet.hours,
                        //  status: newTimesheet.status,
                        //  companyID: newTimesheet.companyID,
                        //  project: newTimesheet.project,
                        //  task: newTimesheet.task,
                        //  userID: newTimesheet.userID
                        newTimesheet: newTimesheet
                    })
                }
            } else {
                if (timesheetExist.state == 'hold') {
                    const updatedTimesheet = await Timesheet.findOneAndUpdate({ name: name, userID: userID }, { hours: hours, project: project, task: task, billable: billable }, { new: true })
                    if (updatedTimesheet) {
                        res.status(200).json({
                            updatedTimesheet: updatedTimesheet
                        })
                    }
                } else {
                    res.status(200).json({
                        message: ` you can't edit this data`
                    })
                }
            }
        }


    } catch (error) {
        console.log("error from register api", error)
    }
}




const sendTimesheetToTimeTraker = async (req, res) => {

    const { userName, task, companyID, project, hours, date, sendToQb, fromQb, lastIndex } = req.body;

    const timesheetExist = await Timesheet.findOne({ fromQb: fromQb, companyID: companyID })

    if (timesheetExist) {
        res.status(200).json({
            nessage: "Timesheet already syncked"
        })
    } else {
        try {

            const user = await User.findOne({ name: userName, companyID: companyID })

            if (user) {
                const userID = user._id
                createNewTimesheet(userName, userID, task, companyID, project, hours, date, sendToQb, fromQb)
            } else {
                // it will check for manager 
                try {
                    const user = await Manager.findOne({ name: userName, companyID: companyID })

                    if (user) {
                        const userID = user._id
                        createNewTimesheet(userName, userID, task, companyID, project, hours, date, sendToQb, fromQb)
                    } else {
                        // it will check for sub-admin 

                        try {
                            const user = await SubAdmin.findOne({ name: userName, companyID: companyID })

                            if (user) {
                                const userID = user._id
                                createNewTimesheet(userName, userID, task, companyID, project, hours, date, sendToQb, fromQb)
                            } else {
                                // it will check for admin 
                                try {
                                    const user = await Admin.findOne({ name: userName, companyID: companyID })

                                    if (user) {
                                        const userID = user._id
                                        createNewTimesheet(userName, userID, task, companyID, project, hours, date, sendToQb, fromQb)
                                        if (lastIndex) {
                                            res.status(200).json({
                                                message: 'sunced'
                                            })
                                        }
                                    } else {
                                        console.log("no user found with this name")
                                        if (lastIndex) {
                                            res.status(200).json({
                                                message: "no user found with this name"
                                            })
                                        }
                                    }
                                } catch (error) {
                                    console.log("error from log in api", error)
                                    if (lastIndex) {
                                        res.status(200).json({
                                            message: error
                                        })
                                    }
                                }
                            }
                        } catch (error) {
                            console.log("error from log in api", error)
                            if (lastIndex) {
                                res.status(200).json({
                                    message: error
                                })
                            }
                        }
                    }
                } catch (error) {
                    console.log("error from log in api", error)
                    if (lastIndex) {
                        res.status(200).json({
                            message: error
                        })
                    }
                }

            }
        } catch (error) {
            console.log("error from log in api", error)
            res.status(200).json({
                message: error
            })
        }
    }

}

const createNewTimesheet = async (userName, userID, task, companyID, project, hours, date, sendToQb, fromQb) => {
    const state = 'aproved'
    const newTimesheet = await Timesheet.create({
        userID: userID,
        companyID: companyID,
        task: task,
        project: project,
        hours: hours,
        date: date,
        userName: userName,
        sendToQb: sendToQb,
        fromQb: fromQb,
        state: state
    })

    if (newTimesheet) {
        console.log(newTimesheet)
    }
}



const getUsersTimesheet = async (req, res) => {
    try {
        const userID = req.query.userID
        console.log("userIDDDDDD", userID)
        const timesheets = await Timesheet.find({ userID })

        if (timesheets) {
            res.status(200).json({
                timesheets: timesheets
            })
        } else {
            res.status(401).json({
                result: "faild to get timesheets"
            })
        }
    } catch (error) {
        console.log("error from timesheets api", error)
    }
}

const lastSeven = async (req, res) => {
    let lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    // const timesheets = await Timesheet.distinct(dynamicData)
    // console.log("timesheets", timesheets)
}

const getAllUsersTimesheet = async (req, res) => {
    try {
        const companyID = req.query.companyID
        const timesheets = await Timesheet.find({ companyID })

        if (timesheets) {
            res.status(200).json({
                timesheets: timesheets
            })
        } else {
            res.status(401).json({
                result: "faild to get timesheets"
            })
        }
    } catch (error) {
        console.log("error from timesheets api", error)
    }
}

const deleteTimesheet = async (req, res) => {
    try {
        const timesheetID = req.query.timesheetID

        const timesheet = await Timesheet.findOne({ _id: timesheetID })

        if (timesheet) {
            console.log(timesheet.state)
            if (timesheet.state == "hold") {
                const deletedTimesheet = await Timesheet.findByIdAndRemove(timesheetID);

                if (deletedTimesheet) {
                    res.status(200).json({
                        deletedTimesheet: deletedTimesheet
                    })
                }
            } else {
                res.status(400).json({
                    message: "you can't delete this data"
                })
            }
        }



    }
    catch (error) {
        console.log("error from delete timesheet api", error)
        res.status(400).json({
            message: "error from delete timesheet api",
            error: error
        })
    }
}

const updateTimesheet = async (req, res) => {
    const { name, userID, hours } = req.body
    console.log(hours)
    try {
        const updatedTimesheet = await Timesheet.findOneAndUpdate({ name: name, userID: userID }, { hours: hours }, { new: true })
        if (updatedTimesheet) {
            res.status(200).json({
                updatedTimesheet: updatedTimesheet
            })
        }
    } catch (error) {
        console.log(error)
    }
}

// have to change these two 

const submitTimesheet = async (req, res) => {
    const timesheetID = req.query.timesheetID
    console.log("timesheetID", timesheetID)
    const state = 'submited'
    try {
        const updatedTimesheet = await Timesheet.findOneAndUpdate({ _id: timesheetID }, { state: state }, { new: true })
        if (updatedTimesheet) {
            res.status(200).json({
                updatedTimesheet: updatedTimesheet
            })
        }

    }
    catch (error) {
        console.log("error from delete timesheet api", error)
        res.status(400).json({
            message: "error from delete timesheet api",
            error: error
        })
    }
}


const allSubmitedTimesheet = async (req, res) => {
    try {
        const companyID = req.query.companyID

        const filter = { companyID: companyID, state : "submited" }; // Specify the filter criteria to identify the document to update


        const allTimesheetData = await Timesheet.find(filter)
        if (allTimesheetData) {
            res.status(200).json({
                allTimesheetData: allTimesheetData
            })
        }

    }
    catch (error) {
        console.log("error from delete timesheet api", error)
        res.status(400).json({
            message: "error from delete timesheet api",
            error: error
        })
    }
}

const getUsersSubmitedTimesheet = async (req, res) => {
    try {
        const userID = req.query.userID

        const filter = { userID: userID, state: 'submited' }; // Specify the filter criteria to identify the document to update


        const allTimesheetData = await Timesheet.find(filter)
        if (allTimesheetData) {
            console.log("allTimesheetData from aprove", allTimesheetData)
            res.status(200).json({
                allTimesheetData: allTimesheetData
            })
        }

    }
    catch (error) {
        console.log("error from delete timesheet api", error)
        res.status(400).json({
            message: "error from delete timesheet api",
            error: error
        })
    }
}

const aproveTimesheet = async (req, res) => {
    const timesheetID = req.query.timesheetID
    console.log("timesheetID", timesheetID)
    const state = 'aproved'
    try {
        const updatedTimesheet = await Timesheet.findOneAndUpdate({ _id: timesheetID }, { state: state }, { new: true })
        if (updatedTimesheet) {
            res.status(200).json({
                updatedTimesheet: updatedTimesheet
            })
        }

    }
    catch (error) {
        console.log("error from delete timesheet api", error)
        res.status(400).json({
            message: "error from delete timesheet api",
            error: error
        })
    }
}


const allAprovedTimesheet = async (req, res) => {
    try {
        const cpmpanyId = req.query.cpmpanyId
        const state = "aproved"

        const filter = { companyID: cpmpanyId, state: state, sendToQb: false }; // Specify the filter criteria to identify the document to update


        const allTimesheetData = await Timesheet.find(filter)
        if (allTimesheetData) {
            res.status(200).json({
                allTimesheetData: allTimesheetData
            })
        }

    }
    catch (error) {
        console.log("error from delete timesheet api", error)
        res.status(400).json({
            message: "error from delete timesheet api",
            error: error
        })
    }
}

const sendToQbUpdate = async (req, res) => {
    const timesheetID = req.query.timesheetID
    console.log("timesheetID", timesheetID)
    const sendToQb = true
    try {
        const updatedTimesheet = await Timesheet.findOneAndUpdate({ _id: timesheetID }, { sendToQb: sendToQb }, { new: true })
        if (updatedTimesheet) {
            res.status(200).json({
                updatedTimesheet: updatedTimesheet
            })
        }

    }
    catch (error) {
        console.log("error from sendToQbUpdate controler", error)
        res.status(400).json({
            message: "error from sendToQbUpdate controler",
            error: error
        })
    }
}


const filterUserTimesheet = async (req, res) => {
    const formDataForUserFilter = req.body.formDataForUserFilter
    for (const key in formDataForUserFilter) {
        if (formDataForUserFilter.hasOwnProperty(key) && formDataForUserFilter[key] === '') {
            delete formDataForUserFilter[key];
        }
    }
    console.log(formDataForUserFilter)

    try {
        const filteredTimesheet = await Timesheet.find(formDataForUserFilter)
        if (filteredTimesheet) {
            res.status(200).json({
                filteredTimesheet: filteredTimesheet
            })
        }
    } catch (error) {
        console.log(error)
    }
}



const submitAll = async (req, res) => {
    const userID = req.query.userID
    const filter = { userID: userID, state: 'hold' };
    const update = { $set: { state: 'submited' } };
    try {
        const submitedTimesheets = await Timesheet.updateMany(filter, update);
        if (submitedTimesheets) {
            res.status(200).json({
                submitedTimesheets: submitedTimesheets
            })
        }
    } catch (error) {
        console.log(error)
    }
}



const deleteAll = async (req, res) => {
    const userID = req.query.userID
    const filter = { userID: userID, state: 'hold' };
    try {
        const deletedData = await Timesheet.deleteMany(filter);
        if (deletedData) {
            res.status(200).json({
                deletedData: deletedData
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const getWeeklyTimesheet = async (req, res) => {
    try {

        const { startDate, endDate } = req.body
        const filter = {
            name: { $exists: true },
        };

        // Loop through the request query parameters and build the filter object
        Object.keys(req.body).forEach(key => {
            if (req.body[key]) {
                filter[key] = req.body[key];
            }
        });


        if (startDate) {
            delete filter.startDate;
        }
        if (endDate) {
            delete filter.endDate;
        }

        if (startDate && endDate) {

            if (filter) {
                const timesheets = await Timesheet.find(filter).lean()

                var finalData = timesheets.filter(item => {
                    const itemDate = new Date(item.date);
                    return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
                });
            }
        }

        if (finalData) {
            res.status(200).json({
                timesheets: finalData
            })
        }
    } catch (error) {
        console.log(error)
    }
}


const deleteWeeklyTimesheet = async (req, res) => {

    try {


        const { startDate, endDate } = req.body
        const filter = {
            name: { $exists: true },
            state: 'hold',
        };

        // Loop through the request query parameters and build the filter object
        Object.keys(req.body).forEach(key => {
            if (req.body[key]) {
                filter[key] = req.body[key];
            }
        });


        if (startDate) {
            delete filter.startDate;
        }
        if (endDate) {
            delete filter.endDate;
        }

        if (startDate && endDate) {

            if (filter) {
                const timesheets = await Timesheet.deleteMany(filter).lean()

                if (timesheets) {
                    res.status(200).json({
                        timesheets: timesheets
                    })
                }
            }
        }


    } catch (error) {
        console.log(error)
    }
}

const submitWeeklyTimesheet = async (req, res) => {


    try {


        const { startDate, endDate } = req.body
        const filter = {
            name: { $exists: true },
            state: 'hold',
        };

        // Loop through the request query parameters and build the filter object
        Object.keys(req.body).forEach(key => {
            if (req.body[key]) {
                filter[key] = req.body[key];
            }
        });


        if (startDate) {
            delete filter.startDate;
        }
        if (endDate) {
            delete filter.endDate;
        }

        if (startDate && endDate) {

            const update = { $set: { state: 'submited' } };
            if (filter) {
                const timesheets = await Timesheet.updateMany(filter, update).lean()


                if (timesheets) {
                    res.status(200).json({
                        timesheets: timesheets
                    })
                }
            }
        }


    } catch (error) {
        console.log(error)
    }
}


const filterTimesheetByState = async (req, res) => {
    const { state } = req.body
    const companyID = req.query.companyID

    if (state == "") {
        try {
            const filteredTimesheet = await Timesheet.find({ companyID: companyID })
            if (filteredTimesheet) {
                res.status(200).json({
                    filteredTimesheet: filteredTimesheet
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    else {
        try {
            const filteredTimesheet = await Timesheet.find({ companyID: companyID, state: state })
            if (filteredTimesheet) {
                res.status(200).json({
                    filteredTimesheet: filteredTimesheet
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

const ImportTimesheet = async (req, res) => {
    const jsonData = req.body;
    const userID = req.query.userID
    const companyID = req.query.companyID
    console.log("companyID", companyID)
    console.log(jsonData)

    try {
        const createTiesheet = async (element) => {
            let billable = true
            if (
                element.billable == "no"
            ) {
                billable = false
            } else {
                billable = true
            }
            const timesheetData = await Timesheet.create({
                userID: userID,
                companyID: companyID,
                task: element.task,
                project: element.project,
                hours: element.hours,
                date: element.date,
                userName: element.userName,
                sendToQb: false,
                billable: billable
            })
        }

        jsonData?.forEach((element) => {
            // console.log(element)
            createTiesheet(element)

        })

        res.status(200).json({
            message: "created"
        })

    } catch (error) {
        console.log(error)
        res.status(200).json({
            message: error
        })
    }
}

const editTimesheet = async (req, res) => {
    const { _id, hours, description, project, task, date } = req.body


    try {


        const timesheetExist = await Timesheet.findOne({ _id: _id })

        if (timesheetExist) {
            if (timesheetExist.state == "hold") {
                try {
                    const updatedTimesheet = await Timesheet.findOneAndUpdate({ _id: _id }, {
                        hours: hours,
                        description: description,
                        project: project,
                        task: task,
                        date: date
                    }, { new: true })
                    if (updatedTimesheet) {
                        res.status(200).json({
                            updatedTimesheet: updatedTimesheet
                        })
                    }
                } catch (error) {
                    console.log("error from update Timesheet Api")
                    res.status(400).json({
                        message: "error from update timesheet api",
                        error: error
                    })
                }

            } else {
                res.status(200).json({
                    message: "can't update this Timesheet"
                })
            }
        }
    }
    catch (error) {
        console.log("error while updating the timesheet", error)
        res.status(400).json({
            message: "error while updating the timesheet",
            error: error
        })
    }
}



export { filterUserTimesheet, editTimesheet, createTimesheet, ImportTimesheet, filterTimesheetByState, deleteWeeklyTimesheet, submitWeeklyTimesheet, getWeeklyTimesheet, submitAll, sendTimesheetToTimeTraker, sendToQbUpdate, allAprovedTimesheet, aproveTimesheet, getUsersSubmitedTimesheet, updateTimesheet, allSubmitedTimesheet, getUsersTimesheet, deleteAll, lastSeven, getAllUsersTimesheet, deleteTimesheet, submitTimesheet }