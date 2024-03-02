import Account from "../models/accountModel.js";


const createAccount = async (req, res) => {
    try {
        // console.log("req body", req.body)

        // distrack object came from front-end in register page 
        const { name, type, qbID, companyID, lastIndex } = req.body;

        // chacking admin exist or  not 
        const accountExist = await Account.findOne({ name, companyID })
        if (accountExist) {
            if (lastIndex) {
                res.status(200).json({
                    result: "Account is alrady exist"
                })
            }
        }
        else {
            const newAccount = await Account.create({
                name: name,
                type: type,
                qbID: qbID,
                companyID: companyID
            })

            if (newAccount) {
                if (lastIndex) {
                    res.status(201).json({
                        newAccount: newAccount
                    })
                }
            }
        }

    } catch (error) {
        console.log("error from register api", error)
        if (lastIndex) {
            res.status(200).json({
                result: "Account is not created"
            })
        }
    }
}


const getChartOfAccount = async (req, res) => {
    try {
        const companyID = req.query.companyID
        const chartOfAccount = await Account.find({ companyID: companyID })

        if (chartOfAccount) {

            const filteredData = chartOfAccount.filter(item => item.type !== 'Bank');

            if (filteredData) {
                res.status(201).json({
                    chartOfAccount: filteredData
                })

            }
        }
    }
    catch (error) {
        console.log("error from register api", error)
    }
}


const getBankAccount = async (req, res) => {
    try {
        const companyID = req.query.companyID
        const bankAccount = await Account.find({ companyID: companyID, type: 'Bank' })

        if (bankAccount) {
            res.status(201).json({
                bankAccount: bankAccount
            })


        }
    }
    catch (error) {
        console.log("error from register api", error)
    }
}


const setBank = async (req, res) => {
    try {
        const { name } = req.body
        const companyID = req.query.companyID

        const update = {
            $set: {
                profile: "inactive", // Replace with the field you want to update and its new value
            },
        };

        const result = await Account.updateMany({ companyID }, update);

        if (result) {
            const updateOne = {
                $set: {
                    profile: "active", // Replace with the field you want to update and its new value
                },
            };
            try {
                const updatedAccount = await Account.updateOne({ companyID, name }, updateOne);
                if (updatedAccount) {
                    res.status(201).json({
                        updatedAccount: updatedAccount
                    })
                }
            } catch (error) {
                console.log("error from setBank iner try block", error)
            }
        }

    } catch (error) {
        console.log("error from setBank", error)
    }
}

const getChartOfAccountByID = async (req, res) => {
    try {
        const { name } = req.body
        const companyID = req.query.companyID
        const chartOfAccount = await Account.findOne({ companyID: companyID, name: name })

        if (chartOfAccount) {
            res.status(201).json({
                chartOfAccount: chartOfAccount
            })
        }
    }
    catch (error) {
        console.log("error from register api", error)
    }
}

const getActiveBankAccount = async (req, res) => {
    try {

        const companyID = req.query.companyID
        const bankAccount = await Account.findOne({ companyID: companyID, profile: 'active' })

        if (bankAccount) {
            res.status(201).json({
                bankAccount: bankAccount
            })
        } else {
            res.status(201).json({
                bankAccount: false
            })
        }
    }
    catch (error) {
        console.log("error from register api", error)
    }
}

export { createAccount, getChartOfAccountByID, getActiveBankAccount, getChartOfAccount, getBankAccount, setBank }