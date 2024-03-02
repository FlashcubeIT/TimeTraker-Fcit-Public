import User from '../models/userModel.js'
import Timesheet from '../models/timesheetModel.js'
import Expense from '../models/expressModel.js'
import Admin from '../models/adminModel.js'


const getAllUsersTimesheetReport = async (req, res) => {
    try {
        const companyID = req.query.companyID
        const timesheets = await Timesheet.find({ companyID }).lean()

        const modifiedTimesheets1 = timesheets.map(({ createdAt, updatedAt, userID, companyID, name, _id, __v, ...rest }) => ({ ...rest }));


        modifiedTimesheets1.forEach(obj => {
            // Rename the keys
            obj.Date = obj.date;
            delete obj.date;
            obj.Task = obj.task;
            delete obj.task;
            obj.Project = obj.project;
            delete obj.project;
            obj.Hours = obj.hours;
            delete obj.hours;
            obj.State = obj.state;
            delete obj.state;
            obj.UserName = obj.userName;
            delete obj.userName;
            obj.Billable = obj.billable;
            delete obj.billable;
            obj.Exported = obj.sendToQb;
            delete obj.sendToQb;
            obj.Description = obj.description? obj.description : "";
            delete obj.description;
          });

        if (modifiedTimesheets1) {
            res.status(200).json({
                timesheets: modifiedTimesheets1
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

const getCompanyName = async(req, res) =>{
    try{
         const companyID = req.query.companyID
         const company= await Admin.findOne({_id:companyID})
         
         if (company){
            res.status(200).json({
                company : company
            })
         }
    }catch(error){
        console.log("error from getCompanyName api ", error)
        res.status(400).json({
            message : "error from getCompanyName api "
        })
    }
}
const getAllUsersExpress = async (req, res) => {
    try {
        const companyID = req.query.companyID
        const expenses = await Expense.find({ companyID }).lean()
        const modifiedExpense1 = expenses.map(({ createdAt, updatedAt, userID, companyID, photo, _id, __v, merchant, expenseReport, fromQb, paidBy, ...rest }) => ({ ...rest }));

        modifiedExpense1.forEach(obj => {
            // Rename the keys
            obj.Date = obj.date? obj.date : "";
            delete obj.date;
            obj.Expense = obj.expense? obj.expense : "";
            delete obj.expense;
            obj.Project = obj.project? obj.project : "";
            delete obj.project;
            obj.Amount = obj.amount? obj.amount : "";
            delete obj.amount;
            obj.State = obj.state? obj.state : "";
            delete obj.state;
            obj.UserName = obj.userName? obj.userName : "";
            delete obj.userName;
            obj.Billable = obj.billable? obj.billable : "";
            delete obj.billable;
            obj.Exported = obj.sendToQb? obj.sendToQb : "";
            delete obj.sendToQb;
            obj.Description = obj.description? obj.description : "";
            delete obj.description;
          });

        if (modifiedExpense1) {
            res.status(200).json({
                expenses: modifiedExpense1
            })
        } else {
            res.status(401).json({
                result: "faild to get expenses"
            })
        }
    } catch (error) {
        console.log("error from expenses api", error)
    }
}

const filteredTimesheet = async (req, res) => {
    try {

        const { startDate, endDate } = req.body
        const filter = {};

        // Loop through the request query parameters and build the filter object
        Object.keys(req.body).forEach(key => {
            if(req.body[key]){
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
                var modifiedTimesheets2 = timesheets.map(({ createdAt, updatedAt, userID, companyID, name, _id, __v, ...rest }) => ({ ...rest }));

                var finalData = modifiedTimesheets2.filter(item => {
                    const itemDate = new Date(item.date);
                    return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
                });
            }
        }if(!startDate && !endDate){
            if (filter) {
                const timesheets = await Timesheet.find(filter).lean()
                var finalData = timesheets.map(({ createdAt, updatedAt, userID, companyID, name, _id, __v, ...rest }) => ({ ...rest }));
                 
            } 
        }

        if (finalData) {
            res.status(200).json({
                timesheets: finalData
            })
        }
    }
    catch (error) {
        console.log("error from filteredTimesheet api", error)
    }
}

const filteredExpense = async (req, res) => {
    try {

        // const filter = {};

        // // Loop through the request query parameters and build the filter object
        // Object.keys(req.body).forEach(key => {
        //     filter[key] = req.body[key];
        // });


        // if (filter) {
        //     const expenses = await Expense.find(filter).lean()
        //     var modifiedExpense2 = expenses.map(({ createdAt, updatedAt, userID, companyID, photo, _id, __v, ...rest }) => ({ ...rest }));
        // }
        // if (modifiedExpense2) {
        //     res.status(200).json({
        //         expenses: modifiedExpense2
        //     })
        // }


        const { startDate, endDate } = req.body
        const filter = {};

        // Loop through the request query parameters and build the filter object
        Object.keys(req.body).forEach(key => {
            if(req.body[key]){
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
                const expenses = await Expense.find(filter).lean()
                var modifiedExpenses2 = expenses.map(({ createdAt, updatedAt, userID, companyID, photo, _id, __v, ...rest }) => ({ ...rest }));

                var finalData = modifiedExpenses2.filter(item => {
                    const itemDate = new Date(item.date);
                    return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
                });
            }
        }if(!startDate && !endDate){
            if (filter) {
                const  expenses = await Expense.find(filter).lean()
                var finalData = expenses.map(({ createdAt, updatedAt, userID, companyID, photo, _id, __v, ...rest }) => ({ ...rest }));
            } 
        }

        if (finalData) {
            res.status(200).json({
                expenses: finalData
            })
        }
    }
    catch (error) {
        console.log("error from filteredTimesheet api", error)
    }
}

const dateFilterForTimesheet = async (req, res) => {
    try {

        const startDate = '2023-11-20'
        const endDate = '2023-11-24'


        const result = await Timesheet.find({
            ['date']: {
                $gte: startDate,
                $lte: endDate
            },
        })
        console.log("result", result)

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "error from dateFilter api",
            error: error
        })
    }
}













export { getAllUsersTimesheetReport,getCompanyName, dateFilterForTimesheet, getAllUsersExpress, filteredTimesheet, filteredExpense }