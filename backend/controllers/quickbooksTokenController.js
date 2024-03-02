import QuickbooksToken from "../models/QuickbooksToken.js";


const createQuickbooksToken = async (req, res) => {
    console.log("hello")
    try {
        const companyID = req.query.companyID
        const existToken = await QuickbooksToken.findOne({ companyID })

        if (existToken) {

            const updateOne = {
                $set: {
                    fullToken: req.body
                },
            };

            const updatedToken = await QuickbooksToken.updateOne({ companyID, companyID }, updateOne);
            if (updatedToken) {
                res.status(201).json({
                    updatedToken: updatedToken
                })
            }


        } else {

            const updatedToken = await QuickbooksToken.create({
                companyID: companyID,
                fullToken: req.body
            })
            if (updatedToken) {
                res.status(200).json({
                    updatedToken: updatedToken
                })
            }

        }

    } catch (error) {
        console.log("error from register api", error)
        res.status(400).json({
            error: error
        })
    }
}


const getQuickbooksToken = async (req, res) => {
    try {
        const companyID = req.query.companyID
        const existToken = await QuickbooksToken.findOne({ companyID })
        if(existToken){
            res.status(200).json({
                existToken: existToken
            })
        }else{
            res.status(400).json({
                message: "not exist"
            })
        }
    }catch(error){
        console.log("error from register api", error)
        res.status(400).json({
            message: "error from get-qb-token api"
        })
    }
}

const deleteQuickbooksToken = async (req, res) => {
    try {
        const companyID = req.query.companyID
        const deletedToken = await QuickbooksToken.deleteOne({companyID});
        if(deletedToken){
            res.status(200).json({
                deletedToken: deletedToken
            })
        }
       
    }catch(error){
        console.log("error from register api", error)
        res.status(400).json({
            error: error
        })
    }
}

export { createQuickbooksToken, getQuickbooksToken, deleteQuickbooksToken }