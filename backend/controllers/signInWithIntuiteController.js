import QuickbooksToken from "../models/QuickbooksToken.js"
import Admin from "../models/adminModel.js";
import generateToken from "../config/generateToken.js";

const findRealmId = async(req, res) => {
    const realmId = req.query.realmId
    try{
        const token = await QuickbooksToken.findOne({ 'fullToken.token.realmId': realmId });
        if(token){
            try {
                const superAdmin = await Admin.findOne({ _id: token.companyID })
        
                if (superAdmin) {
                    res.status(200).json({
                        superAdmin: {
                            accessibility: superAdmin.accessibility,
                            email: superAdmin.email,
                            name: superAdmin.name,
                            phone: superAdmin.phone,
                            role: superAdmin.role,
                            _id: superAdmin._id,
                            createdAt: superAdmin.createdAt,
                            companyID:superAdmin._id,
                            token: generateToken(superAdmin._id)
                        }
                    })
                } else {
                    res.status(200).json({
                        message: 'notAuthorized'
                    })
                }
            } catch (error) {
                console.log("error from superAdmin api", error)
                res.status(401).json({
                    result: "faild to get superAdmin"
                })
            }
        }else{
            //need to handle new account here 
            res.status(200).json({
                message: 'notAuthorized'
            })
        }
    }catch(error){
        console.log(error)
        res.status(400).json({
            error: error
        })
    }
}

export {findRealmId}