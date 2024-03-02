import Expense from "../models/expressModel.js";
import formidable from "formidable";
import fs from "fs";
import _ from "lodash";


const createExpense = async (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      console.log("fields", fields)
      if (err) {
        return res.status(400).json({
          error: "image could not be uploaded"
        })
      }
      let expense = new Expense(fields)
      if (files.photo) {
        if (files.photo.size > 1000000) {
          res.status(400).json({
            error: "File size should lessthen 10 mb"
          })
        }
        else {
          expense.photo.data = fs.readFileSync(files.photo.filepath);
          expense.photo.contentType = files.photo.mimetype;

          expense.save();
          if (expense) {
            res.status(200).json({
              _id: expense._id,
              amount: expense.amount,
              description: expense.description,
              message: "expense successfully created"
            })
          }
        }
      }
    })
  } catch (error) {
    console.log(error)
  }


}

const getUsersExpress = async (req, res) => {
  try {
    const userID = req.query.userID
    const expenses = await Expense.find({ userID })

    if (expenses) {
      res.status(200).json({
        expenses: expenses
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


const getAllUsersExpress = async (req, res) => {
  try {
    const companyID = req.query.companyID
    const expenses = await Expense.find({ companyID })

    if (expenses) {
      res.status(200).json({
        expenses: expenses
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

const deletedExpenseController = async (req, res) => {
  try {
    const expenseID = req.query.expenseID
    const deletedExpense = await Expense.findByIdAndRemove(expenseID);

    if (deletedExpense) {
      res.status(200).json({
        deletedExpense: deletedExpense
      })
    }

  }
  catch (error) {
    console.log("error from delete Expense api", error)
    res.status(400).json({
      message: "error from delete Expense api",
      error: error
    })
  }
}


const submitExpense = async (req, res) => {
  const expenseID = req.query.expenseID
  console.log("expenseID for submit", expenseID)
  const state = 'submited'
  try {
    const updatedExpense = await Expense.findOneAndUpdate({ _id: expenseID }, { state: state }, { new: true })
    if (updatedExpense) {
      res.status(200).json({
        updatedExpense: updatedExpense
      })
    }

  }
  catch (error) {
    console.log("error from delete Expense api", error)
    res.status(400).json({
      message: "error from delete Expense api",
      error: error
    })
  }
}

const allSubmitedExpense = async (req, res) => {
  try {
    const companyID = req.query.companyID
    const state = 'submited'

    const filter = { companyID: companyID, state: state }; // Specify the filter criteria to identify the document to update


    const allSubmitedExpenseData = await Expense.find(filter)
    if (allSubmitedExpenseData) {
      res.status(200).json({
        allSubmitedExpenseData: allSubmitedExpenseData
      })
    }

  }
  catch (error) {
    console.log("error from  allSubmitedExpenseData api", error)
    res.status(400).json({
      message: "error from  allSubmitedExpenseData api",
      error: error
    })
  }
}


const aproveExpense = async (req, res) => {
  const expenseID = req.query.expenseID
  console.log("expenseID", expenseID)
  const state = 'aproved'

  try {
    const updatedExpense = await Expense.findOneAndUpdate({ _id: expenseID }, { state: state }, { new: true })
    if (updatedExpense) {
      res.status(200).json({
        updatedExpense: updatedExpense
      })
    }

  }
  catch (error) {
    console.log("error from delete updatedExpense api", error)
    res.status(400).json({
      message: "error from delete updatedExpense api",
      error: error
    })
  }
}


const getExpensePhotoById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.expenseId)
    if (expense) {
      if (expense.photo.data) {
        res.set('Content-Type', expense.photo.contentType)
        return res.send(expense.photo.data)
      } else {
        res.status(400).json({
          message: "expense photo is not available"
        })
      }
    } else {
      res.status(400).json({
        message: "expense not available"
      })
    }
  } catch (error) {
    console.log("error", error)
    res.status(400).json({
      message: "server error"
    })
  }
}

const getUsersSubmitedExpense = async (req, res) => {
  try {
    const userID = req.query.userID

    const filter = { userID: userID, state: 'submited' }; // Specify the filter criteria to identify the document to update


    const allExpenseData = await Expense.find(filter)
    if (allExpenseData) {
      console.log("allExpenseData from aprove", allExpenseData)
      res.status(200).json({
        allExpenseData: allExpenseData
      })
    }

  }
  catch (error) {
    console.log("error from delete timesheet api", error)
    res.status(400).json({
      message: "error from delete expense api",
      error: error
    })
  }
}



const sendToQbUpdateExpense = async (req, res) => {
  const expenseID = req.query.expenseID
  const sendToQb = true
  try {
    const updatedExpense = await Expense.findOneAndUpdate({ _id: expenseID }, { sendToQb: sendToQb }, { new: true })
    if (updatedExpense) {
      res.status(200).json({
        updatedExpense: updatedExpense
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


const getAllAproveExpenseForSync = async (req, res) => {
  try {
    const companyID = req.query.companyID
    const state = "aproved"

    const filter = { companyID: companyID, state: state, sendToQb: false }; // Specify the filter criteria to identify the document to update


    const allExpenseData = await Expense.find(filter)

    if (allExpenseData) {
      res.status(200).json({
        allExpenseData: allExpenseData
      })
    }

  }
  catch (error) {
    console.log("error from all aprove  expense api", error)
    res.status(400).json({
      message: "error from all aprove  expense api",
      error: error
    })
  }
}

const sendExpenseQBTOTT = async (req, res) => {
  const { date, expense, state, companyID, amount, billable, sendToQb, fromQb, lastIndex } = req.body;

  try {
    const expenseExist = await Expense.findOne({ fromQb: fromQb, companyID: companyID })

    if (expenseExist) {
      if (lastIndex) {
        res.status(200).json({
          nessage: "expense already syncked"
        })
      }
    } else {

      try {
        const newExpense = await Expense.create({
          date: date,
          expense: expense,
          state: state,
          companyID: companyID,
          amount: amount,
          userID: companyID,
          userName: companyID,
          billable: billable,
          sendToQb: sendToQb,
          fromQb: fromQb
        })

        if (newExpense) {
          if (lastIndex) {
            res.status(201).json({
              newExpense: newExpense
            })
          }
        }
      } catch (error) {
        console.log("error from log in api", error)
        if (lastIndex) {
          res.status(200).json({
            nessage: error
          })
        }
      }
    }
  } catch (error) {
    console.log("error from log in api", error)
    if (lastIndex) {
      res.status(200).json({
        nessage: error
      })
    }
  }
}


const submitAll = async (req, res) => {
  const userID = req.query.userID
  const filter = { userID: userID, state: 'hold' };
  const update = { $set: { state: 'submited' } };
  try {
    const submitedExpense = await Expense.updateMany(filter, update);
    if (submitedExpense) {
      res.status(200).json({
        submitedExpense: submitedExpense
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
    const deletedData = await Expense.deleteMany(filter);
    if (deletedData) {
      res.status(200).json({
        deletedData: deletedData
      })
    }
  } catch (error) {
    console.log(error)
  }

}




const filterUserExpense = async (req, res) => {
  const formDataForUserFilter = req.body.formDataForUserFilter
  console.log('formDataForUserFilter', formDataForUserFilter)
  for (const key in formDataForUserFilter) {
    if (formDataForUserFilter.hasOwnProperty(key) && formDataForUserFilter[key] === '') {
      delete formDataForUserFilter[key];
    }
  }
  console.log(formDataForUserFilter)

  try {
    const filteredExpense = await Expense.find(formDataForUserFilter)
    if (filteredExpense) {
      res.status(200).json({
        filteredExpense: filteredExpense
      })
    }
  } catch (error) {
    console.log(error)
  }
}


const editExpense = async (req, res) => {
  const { _id, amount, description, project, date, expense, paidBy } = req.body
  console.log(req.body)



  try {


    const expenseExist = await Expense.findOne({ _id: _id })

    if (expenseExist) {
      if (expenseExist.state == "hold") {
        try {
          const updatedExpense = await Expense.findOneAndUpdate({ _id: _id }, {
            amount: amount,
            description: description,
            project: project,
            expense: expense,
            date: date,
            paidBy: paidBy
          }, { new: true })
          if (updatedExpense) {
            res.status(200).json({
              updatedExpense: updatedExpense
            })
          }
        } catch (error) {
          console.log("error from update Expense Api")
          res.status(400).json({
            message: "error from update Expense api",
            error: error
          })
        }

      } else {
        res.status(200).json({
          message: "can't update this Expense"
        })
      }
    }
  }
  catch (error) {
    console.log("error while updating the Expense", error)
    res.status(400).json({
      message: "error while updating the Expense",
      error: error
    })
  }
}





export { createExpense, editExpense, filterUserExpense, deleteAll, submitAll, sendExpenseQBTOTT, submitExpense, getAllAproveExpenseForSync, sendToQbUpdateExpense, getUsersSubmitedExpense, getExpensePhotoById, aproveExpense, allSubmitedExpense, getUsersExpress, getAllUsersExpress, deletedExpenseController }