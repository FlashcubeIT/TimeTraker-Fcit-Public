import express from "express";
import dotenv from "dotenv";
import initDB from "./backend/config/db.js";
import userRoutes from './backend/routes/userRoutes.js'
import adminRoutes from './backend/routes/adminRoutes.js'
import taskRoutes from './backend/routes/taskRoutes.js'
import projectRoutes from './backend/routes/projectRoutes.js'
import timesheetRoutes from './backend/routes/timesheetRoutes.js'
import expenseRoutes from './backend/routes/expenseRoutes.js'
import subAdminRoutes from './backend/routes/subAdminRoutes.js'
import managerRoutes from './backend/routes/managerRoutes.js'
import loginRoutes from './backend/routes/loginRoute.js'
import updatePassRoutes from './backend/routes/updatePassRoutes.js'
import forgotpassRoute from './backend/routes/forgotpassRoute.js'
import editAccessibilityRoutes from './backend/routes/editAccessibilityRoutes.js'
import reportRoutes from './backend/routes/reportRoutes.js'
import bamboohrRoutes from './backend/routes/bamboohrRoutes.js'
import accountRoutes from "./backend/routes/accountRoutes.js"
import sendContactMailRouter from "./backend/routes/sendContactMailRouter.js"
import quickbooksTokenRoute from './backend/routes/quickbooksTokenRoute.js'
import signInWithIntuiteRoute from './backend/routes/signInWithIntuiteRoute.js'
import cors from 'cors';
import { userProtect } from "./backend/middleware/authMiddleware.js";

dotenv.config();




// this line of code is responsible for taking all the elements of express in the app 
const app = express();
// app.use('/', express.static('public'))
app.use(express.static('frontend'))
app.use(express.json())
app.use(cors({
    // origin: "https://*.timetracker.com/*",
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// this code will connect you backend with your mongoDB
initDB()

// this part of code means ( if we surve on "/" url then " res.send" will be display ) testing api
app.get("/", (req, res) => {
    res.send("hello from node surver")
})


// this is our all user routs raping 

app.use('/api', userRoutes);
app.use('/api', adminRoutes);
app.use('/api', taskRoutes);
app.use('/api', projectRoutes)
app.use('/api', timesheetRoutes)
app.use('/api', expenseRoutes)
app.use('/api', subAdminRoutes)
app.use('/api', managerRoutes)
app.use('/api', loginRoutes)
app.use('/api', updatePassRoutes)
app.use('/api', forgotpassRoute)
app.use('/api', editAccessibilityRoutes)
app.use('/api', reportRoutes)
app.use('/api', bamboohrRoutes)
app.use('/api', accountRoutes)
app.use('/api', sendContactMailRouter)
app.use('/api', quickbooksTokenRoute)
app.use('/api', signInWithIntuiteRoute)

// this line of code define port 
const port = process.env.port || 8000

// this part is reaponsible to run the surver 
app.listen(port, () => {
    console.log(`surver is runing on port ${port}`)
})



// Quickbooks 


'use strict';


import OAuthClient from 'intuit-oauth'
import bodyParser from 'body-parser'
import axios from 'axios';


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


var urlencodedParser = bodyParser.urlencoded({ extended: false });

var oauthClient = '';
var oauth2_token_json = '';
var redirectUri = '';


var oauthClient = null;


app.options('/authUri', cors());


app.get('/authUri', urlencodedParser, function (req, res) {

    oauthClient = new OAuthClient({
        clientId: 'ABNQPTibqorqsJsFe675WOLbsSrldJjpve36spHKLrg4Hpj5bs',
        clientSecret: 'ajZSsH3ZRCS6xE3mcUHlHaXtZwIx0Im56uSHvb88',
        environment: 'production',
        redirectUri: 'http://localhost:8000/callback'

    });

    var authUri =
        oauthClient.authorizeUri({ scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId, OAuthClient.scopes.Profile, OAuthClient.scopes.Phone, OAuthClient.scopes.Email], state: 'intuit-test' });
    res.send(authUri);

});



app.get('/callback', function (req, res) {

    oauthClient.createToken(req.url)
        .then(function (authResponse) {
            oauth2_token_json = JSON.stringify(authResponse.getJson(), null, 2);
        })
        .catch(function (e) {
            console.error(e);
        });


    res.send('<script>window.close();</script>');


});




app.get('/retrieveToken', function (req, res) {
    res.send(oauthClient);
});


app.get('/oauthClient-null', function (req, res) {

    oauthClient = new OAuthClient({
        clientId: 'ABNQPTibqorqsJsFe675WOLbsSrldJjpve36spHKLrg4Hpj5bs',
        clientSecret: 'ajZSsH3ZRCS6xE3mcUHlHaXtZwIx0Im56uSHvb88',
        environment: 'production',
        redirectUri: 'http://localhost:8000/callback'

    });

    res.status(200).json({
        message: "done"
    })
});


app.get('/getUserInfoFormQB', function (req, res) {

    axios.get('https://sandbox-accounts.platform.intuit.com/v1/openid_connect/userinfo', {
        headers: {
            'Authorization': `Bearer ${oauthClient.token.access_token}`,
            'Accept': 'application/json'
        }
    })
        .then(response => {
            const userInfo = response.data;


            // Check if email is verified
            const emailVerified = userInfo.emailVerified;
            if (emailVerified == true) {
                const email = userInfo.email;
                const profileInfo = {
                    email: email,
                    givenName: userInfo.given_name,
                    familyName: userInfo.family_name,
                    displayName: userInfo.name,
                    phoneNumber: userInfo.phoneNumber
                    // Add other profile info fields as needed
                };
                console.log('User profile information:', profileInfo);

                // here we will add the code to create this users account.

                const createAccountWithQuickbooks = async () => {
                    try {

                        // config 

                        const config = {
                            headers: {
                                "Accept": "application/json",
                                'Content-Type': 'application/json'
                            }
                        }

                        const registerData = await axios.post('http://localhost:8000/api/sign-in-with-intuite-admin-register',
                            {
                                name: profileInfo?.displayName ? profileInfo?.displayName : 'Qb User',
                                email: profileInfo.email,
                                companyName: "QB",
                                phone: '1234567890'
                            },
                            config)


                        if (registerData.data.adminExist) {
                            try {
                                const { data } = await axios.post(`http://localhost:8000/api/admin-login`, { email: registerData.data.adminExist.email, password: registerData.data.adminExist.password }, config)
                                // send responce 
                                res.status(200).json({
                                    loginData: data.admin
                                })

                            } catch (error) {
                                console.log("error", error)
                                // send responce 
                                res.status(400).json({
                                    error: 'please try again to log in '
                                })
                            }
                        } if (registerData.data.createdAccount) {
                            try {
                                const { data } = await axios.post(`http://localhost:8000/api/admin-login`, { email: registerData.data.createdAccount.email, password: registerData.data.createdAccount.password }, config)
                                // send responce 
                                res.status(200).json({
                                    loginData: data.admin
                                })
                            } catch (error) {
                                console.log("error", error)
                                // send responce 
                                res.status(400).json({
                                    error: 'please try again to log in '
                                })
                            }
                        }
                    } catch (error) {
                        console.log("error from the intuite register api", error)
                        // send responce 
                        res.status(400).json({
                            error: 'please try again to log in '
                        })
                    }
                }
                if (profileInfo) {
                    createAccountWithQuickbooks()
                }



            } else {
                console.log('User email is not verified. Access denied.');
                res.status(200).json({
                    notVarifyed: "notVarifyed"
                })
            }

        })
        .catch(error => {
            console.error('Error fetching user information:', error.response.data);
            res.status(400).json({
                error: 'please try again to log in '
            })
        });
});







app.post('/refreshAccessToken', function (req, res) {



    token = req.body.token?.token?.access_token
    const refresh_token = req.body.token?.token?.refresh_token
    timetrakerCompanyID = req.body?.timetrakerCompanyID
    qbCompanyID = req.body.token?.token?.realmId
    if (token != "") {
        environment = req.body.token?.environment
    }

    const client = new OAuthClient({
        clientId: 'ABNQPTibqorqsJsFe675WOLbsSrldJjpve36spHKLrg4Hpj5bs',
        clientSecret: 'ajZSsH3ZRCS6xE3mcUHlHaXtZwIx0Im56uSHvb88',
        environment: 'production',
        redirectUri: 'http://localhost:8000/callback'

    });


    client.refreshUsingToken(refresh_token)
        .then((response) => {
            res.status(200).json({
                result: response
            })
        })
        .catch((error) => {
            res.status(400).json({
                result: 'not done'
            })
        });

});






let token = ""
let timetrakerCompanyID = ""
let qbCompanyID = ""
let environment = ""



app.post('/disconnect', userProtect, function (req, res) {



    token = req.body.token?.token?.access_token
    timetrakerCompanyID = req.body?.timetrakerCompanyID
    qbCompanyID = req.body.token?.token?.realmId
    if (token != "") {
        environment = req.body.token?.environment
    }

    const client = new OAuthClient({
        clientId: 'ABNQPTibqorqsJsFe675WOLbsSrldJjpve36spHKLrg4Hpj5bs',
        clientSecret: 'ajZSsH3ZRCS6xE3mcUHlHaXtZwIx0Im56uSHvb88',
        environment: 'production',
        redirectUri: 'http://localhost:8000/callback'

    });
    const params = {
        access_token: token
    };

    client.revoke(params)
        .then((response) => {
            console.log(response)
            oauthClient = null
            res.status(200).json({
                result: 'Done'
            })
        })
        .catch((error) => {
            res.status(200).json({
                result: 'not done'
            })
        });

    // oauthClient.revoke(token, (err, result) => {
    //     if (err) {
    //       console.error('Error revoking token:', err.message);
    //       res.status(400).json({
    //         result: err
    //       })
    //     } else {
    //       console.log('Token revoked successfully:', result);
    //       res.status(200).json({
    //         result: result
    //       })
    //     }
    // })
});



app.post('/sync-timesheet-user-with-quickbooks', userProtect, async (req, res) => {


    let TTtoken;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            TTtoken = req.headers.authorization.split(" ")[1]
        } catch (error) {
            console.log(error)
            res.status(401).json({
                message: "you are not authorized"
            })
        }
    }


    token = req.body.token?.token?.access_token
    timetrakerCompanyID = req.body?.timetrakerCompanyID
    qbCompanyID = req.body.token?.token?.realmId
    if (token != "") {
        environment = req.body.token?.environment
    }


    // config 
    const config = {
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TTtoken}`
        }
    }



    const getAllUser = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/all-users/?companyID=${timetrakerCompanyID}`, config)
            const allUser = []
            allUser.push(data.allUsers)
            getAllManager(allUser)
        } catch (error) {
            console.log("error from get all user api", error)

        }
    }


    const getAllManager = async (allUser) => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/all-manager/?companyID=${timetrakerCompanyID}`, config)

            allUser.push(data.allManager)
            getAllSubAdmin(allUser)
        } catch (error) {
            console.log("error from get all user api", error)

        }
    }

    const getAllSubAdmin = async (allUser) => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/all-sub-asmin/?companyID=${timetrakerCompanyID}`, config)

            allUser.push(data.allSubAdmin)

            const flattenedArray = [].concat(...allUser);

            forEachFunctionForEmployeSendQuickbooks(flattenedArray, res)

        } catch (error) {
            console.log("error from get all user api", error)

        }
    }

    getAllUser()


});

const forEachFunctionForEmployeSendQuickbooks = (flattenedArray, res) => {



    if (flattenedArray.length == 0) {
        res.status(200).json({
            message: "no user found"
        })
    } else {
        flattenedArray.forEach((element, index) => {

            let lastIndex = false
            if (index == flattenedArray.length - 1) {
                lastIndex = true
            }

            const name = element.name
            const phone = element.phone
            sendTimeTrakerEmployeToQuickbooks(name, phone, res, lastIndex)
        })
    }

}



const sendTimeTrakerEmployeToQuickbooks = async (name, phone, res, lastIndex) => {








    try {

        const employeeData = {
            "GivenName": `${name}`,
            "PrimaryPhone": {
                "FreeFormNumber": `${phone}`
            },
            "FamilyName": `${name}`
        };

        const url = environment === 'sandbox' ?
            OAuthClient.environment.sandbox : OAuthClient.environment.production;

        const authResponse = await axios({
            method: 'post',
            url: `${url}v3/company/${qbCompanyID}/employee`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            data: employeeData,
        });

        console.log("Employee created:", authResponse.data);


        if (lastIndex) {
            res.status(200).json({
                message: "Employee data has been sent to quickbooks"
            })
        }

    } catch (error) {
        if (lastIndex) {
            console.error(error.response.data.Fault.Error);
            res.status(200).json({
                message: "Employee data has been sent to quickbooks"
            })
        }
    }
}





var employeeDataResponse = null
app.post('/getEmployee', userProtect, async function (req, res) {

    token = req.body.token?.token?.access_token
    timetrakerCompanyID = req.body?.timetrakerCompanyID
    qbCompanyID = req.body.token?.token?.realmId
    environment = req.body.token?.environment ? req.body.token?.environment : ""


    try {
        // const url = environment === 'sandbox' ?
        //     OAuthClient.environment.sandbox : OAuthClient.environment.production;
        // const authResponse = await oauthClient.makeApiCall({
        //     url: `${url}v3/company/${qbCompanyID}/query?query=select * from Employee`
        // });


        // JSON.stringify(authResponse);
        // employeeDataResponse = JSON.stringify(authResponse.getJson(),
        //     null, 2);
        const url = environment === 'sandbox' ?
            OAuthClient.environment.sandbox : OAuthClient.environment.production;

        const authResponse = await axios({
            method: 'get',
            url: `${url}v3/company/${qbCompanyID}/query?query=select * from Employee`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        const employeeDataResponse = authResponse.data
        res.send(employeeDataResponse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetchingemployee information.' });
    }
});








// Timesheet 



app.post('/createTimesheet', userProtect, async (req, res) => {

    let TTtoken;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            TTtoken = req.headers.authorization.split(" ")[1]
        } catch (error) {
            console.log(error)
            res.status(401).json({
                message: "you are not authorized"
            })
        }
    }

    token = req.body.token?.token?.access_token
    timetrakerCompanyID = req.body?.timetrakerCompanyID
    qbCompanyID = req.body.token?.token?.realmId
    if (token != "") {
        environment = req.body.token?.environment
    }


    // config 
    const config = {
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TTtoken}`
        }
    }





    // to find all aproved timesheets

    let allAprovedTimesheetFromTimeTraker = []


    try {
        const { data } = await axios.get(`http://localhost:8000/api/all-aproved-timesheet/?cpmpanyId=${timetrakerCompanyID}`, config)
        if (data) {
            allAprovedTimesheetFromTimeTraker = data.allTimesheetData
        }
    }
    catch (error) {
        console.log("aproveTimesheet error", error)
    }




    if (allAprovedTimesheetFromTimeTraker.length > 0) {
        allAprovedTimesheetFromTimeTraker.forEach((element, index) => {

            let lastIndex = false
            if (index == allAprovedTimesheetFromTimeTraker.length - 1) {
                lastIndex = true
            }

            const userID = element.userID
            const hours = element.hours
            const timesheetID = element._id


            getUserName(userID, hours, timesheetID, res, lastIndex, TTtoken)


        });
    } else {
        res.status(200).json({
            message: "sync data"
        })
    }

});



const getUserName = async (userID, hours, timesheetID, res, lastIndex, TTtoken) => {
    // config 
    const config = {
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TTtoken}`
        }
    }
    try {
        const { data } = await axios.get(`http://localhost:8000/api/get-user/?userID=${userID}`, config)
        if (data) {
            // userName = data.user.name
            const userName = data.user.name
            getQuickbooksIdByUserName(userName, hours, timesheetID, res, lastIndex, TTtoken)
        }
    }
    catch (error) {
        console.log(error)
    }
}


const getQuickbooksIdByUserName = async (userName, hours, timesheetID, res, lastIndex, TTtoken) => {

    // config 
    const config = {
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TTtoken}`
        }
    }



    try {




        const url = environment === 'sandbox' ?
            OAuthClient.environment.sandbox : OAuthClient.environment.production;
        const authResponse = await axios({
            method: 'get',
            url: `${url}v3/company/${qbCompanyID}/query?query=select * from Employee where GivenName = '${userName}'&minorversion=69`,
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'text/plain',
                'Authorization': `Bearer ${token}`,
            }
        });

        console.log(authResponse?.data)

        if (Object.keys(authResponse?.data?.QueryResponse).length != 0 ) {
            const userID = authResponse?.data?.QueryResponse?.Employee[0].Id;

            sendTimesheetDataToQuickbooks(userID, userName, hours, timesheetID, res, lastIndex, TTtoken)

        } else {
            if (lastIndex) {
                res.status(200).json({
                    message: "sync data"
                })
            }
        }


        // res.json(authResponse.data);
    } catch (error) {
        console.error(error);

    }
}

const sendTimesheetDataToQuickbooks = async (userID, userName, hours, timesheetID, res, lastIndex, TTtoken) => {



    // config 
    const config = {
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TTtoken}`
        }
    }

    const TimesheetData = {
        "NameOf": "Employee",
        "EmployeeRef": {
            "value": `${userID}`,
            "name": `${userName}`,
        },
        "BillableStatus": "Billable",
        "HourlyRate": "20",
        "CustomerRef": {
            "value": "1",
        },
        "Hours": hours,
    }







    try {


        const url = environment === 'sandbox' ?
            OAuthClient.environment.sandbox : OAuthClient.environment.production;

        const authResponse = await axios({
            method: 'post',
            url: `${url}v3/company/${qbCompanyID}/timeactivity?minorversion=69`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            data: TimesheetData,
        });


        console.log("Timesheet created:", authResponse.data);

        if (authResponse.data) {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/sendToQb/?timesheetID=${timesheetID}`, config)
                console.log(data)
            } catch (error) {
                console.log("error", error)
            }
        }

        if (lastIndex) {
            res.status(200).json({
                message: "sync data"
            })
        }

    } catch (error) {
        console.error(error);
        if (lastIndex) {
            res.status(200).json({
                message: "some error"
            })
        }
    }
}





var timesheetDataResponse = null
app.post('/getTimesheet', userProtect, async function (req, res) {

    token = req.body.token?.token?.access_token
    timetrakerCompanyID = req.body?.timetrakerCompanyID
    qbCompanyID = req.body.token?.token?.realmId
    environment = 'sandbox'


    let TTtoken;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            TTtoken = req.headers.authorization.split(" ")[1]
        } catch (error) {
            console.log(error)
            res.status(401).json({
                message: "you are not authorized"
            })
        }
    }


    // config 
    const config = {
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TTtoken}`
        }
    }


    try {


        const url = environment === 'sandbox' ?
            OAuthClient.environment.sandbox : OAuthClient.environment.production;
        const authResponse = await axios({
            method: 'get',
            url: `${url}v3/company/${qbCompanyID}/query?query=select * from Timeactivity`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        // console.log("Employee created:", authResponse.data);

        const allTimesheet = authResponse.data.QueryResponse.TimeActivity
        if (allTimesheet.length > 0) {
            allTimesheet.forEach((element, index) => {

                console.log("element", element)
                if (element.Hours) {
                    let lastIndex = false
                    if (index == allTimesheet.length - 1) {
                        lastIndex = true
                    }
                    const userName = element.EmployeeRef?.name
                    const companyID = timetrakerCompanyID
                    const task = ""
                    const project = element.CustomerRef?.name
                    const hours = element.Hours
                    const date = element.TxnDate

                    const sendToQb = true
                    const fromQb = element.Id

                    sendTimesheetToTimeTraker(userName, task, companyID, project, hours, date, sendToQb, fromQb, res, lastIndex, config)
                }

            });
        }



    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while syncing Timesheet.' });
    }

});

const sendTimesheetToTimeTraker = async (userName, task, companyID, project, hours, date, sendToQb, fromQb, res, lastIndex, config) => {


    try {
        const { data } = await axios.post('http://localhost:8000/api/sendTimesheetToTimeTraker', { userName: userName, task: task, companyID: companyID, project: project, hours: hours, date: date, sendToQb: sendToQb, fromQb: fromQb, lastIndex: lastIndex }, config)
        console.log(data)
        if (lastIndex) {
            res.status(200).json({
                message: "Timesheet data has been sync"
            });
        }
    } catch (error) {
        console.log("error From timesheet create api", error)
        if (lastIndex) {
            res.status(500).json({ error: 'An error occurred while syncing Timesheet.' });
        }
    }
}



// for customer




app.post('/create-customer', userProtect, async function (req, res) {

    let TTtoken;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            TTtoken = req.headers.authorization.split(" ")[1]
        } catch (error) {
            console.log(error)
            res.status(401).json({
                message: "you are not authorized"
            })
        }
    }





    const config = {
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TTtoken}`
        }
    }

    token = req.body.token?.token?.access_token
    timetrakerCompanyID = req.body?.timetrakerCompanyID
    qbCompanyID = req.body.token?.token?.realmId
    if (token != "") {
        environment = req.body.token?.environment
    }

    let allProject = []

    try {
        const { data } = await axios.get(`http://localhost:8000/api/all-project/?companyID=${timetrakerCompanyID}`, config)
        if (data) {
            allProject = data.projects
        }

    }
    catch (error) {
        console.log("get project error", error)
        res.status(400).json({
            message: "sync data error",
            error: error
        })
    }


    if (allProject.length > 0) {
        allProject.forEach((element, index) => {

            let lastIndex = false
            if (index == allProject.length - 1) {
                lastIndex = true
            }

            const Project = element.project


            sendProjectToQuickBooks(Project, res, lastIndex)


        });
    }

})


const sendProjectToQuickBooks = async (Project, res, lastIndex) => {

    const data = {
        "BillAddr": {
            "Line1": "123 Main Street",
            "City": "",
            "Country": "",
            "CountrySubDivisionCode": "",
            "PostalCode": ""
        },
        "Notes": "Here are other details.",
        "DisplayName": `${Project}`,
        "PrimaryPhone": {
            "FreeFormNumber": ""
        },
        "PrimaryEmailAddr": {
            "Address": ""
        }
    }






    try {



        const url = environment === 'sandbox' ?
            OAuthClient.environment.sandbox : OAuthClient.environment.production;

        const authResponse = await axios({
            method: 'post',
            url: `${url}v3/company/${qbCompanyID}/customer?minorversion=69`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            data: data,
        });


        if (lastIndex) {
            res.status(200).json({
                message: "Download project done"
            })
        }


    } catch (error) {
        console.error(error);
        if (lastIndex) {
            res.status(200).json({
                message: "Download project have some problems"
            })
        }
    }
}




app.post('/get-customer', userProtect, async function (req, res) {

    let TTtoken;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            TTtoken = req.headers.authorization.split(" ")[1]
        } catch (error) {
            console.log(error)
            res.status(401).json({
                message: "you are not authorized"
            })
        }
    }

    token = req.body.token?.token?.access_token
    timetrakerCompanyID = req.body?.timetrakerCompanyID
    qbCompanyID = req.body.token?.token?.realmId
    if (token != "") {
        environment = req.body.token?.environment
    }



    try {


        const url = environment === 'sandbox' ?
            OAuthClient.environment.sandbox : OAuthClient.environment.production;
        const authResponse = await axios({
            method: 'get',
            url: `${url}v3/company/${qbCompanyID}/query?query=select * from customer`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        console.log(authResponse.data.QueryResponse.Customer)
        const allProject = authResponse.data.QueryResponse.Customer


        if (allProject.length > 0) {
            allProject.forEach((element, index) => {

                let lastIndex = false
                if (index == allProject.length - 1) {
                    lastIndex = true
                }

                const project = element.DisplayName
                const status = element.Active
                const companyID = timetrakerCompanyID

                sendPeojectToTimeTraker(project, status, companyID, res, lastIndex, TTtoken)

            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while geting customer' });
    }

});


const sendPeojectToTimeTraker = async (project, status, companyID, res, lastIndex, TTtoken) => {

    const config = {
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TTtoken}`
        }
    }

    const billable = "true"
    try {
        const { data } = await axios.post('http://localhost:8000/api/create-project', { project, status, companyID, billable, lastIndex }, config)
        console.log(data)

        if (lastIndex) {
            res.status(200).json({
                message: "Sync project completed"
            });
        }
    } catch (error) {
        console.log("error from create Project Api", error)
        if (lastIndex) {
            res.status(500).json({ error: 'An error occurred while geting customer' });
        }
    }
}




// for expense  ()



app.post('/createExpense-purchase', userProtect, async (req, res) => {

    let TTtoken;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            TTtoken = req.headers.authorization.split(" ")[1]
        } catch (error) {
            console.log(error)
            res.status(401).json({
                message: "you are not authorized"
            })
        }
    }

    const config = {
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TTtoken}`
        }
    }

    token = req.body.token?.token?.access_token
    timetrakerCompanyID = req.body?.timetrakerCompanyID
    qbCompanyID = req.body.token?.token?.realmId
    if (token != "") {
        environment = req.body.token?.environment
    }



    try {
        const { data } = await axios.get(`http://localhost:8000/api/all-aproved-expense-for-sync/?companyID=${timetrakerCompanyID}`, config)
        const allexpense = data.allExpenseData

        console.log("allexpense", allexpense)
        if (allexpense && allexpense.length > 0) {
            allexpense.forEach((element, index) => {

                let lastIndex = false
                if (index == allexpense.length - 1) {
                    lastIndex = true
                }

                const amount = element.amount
                const expenseType = element.expense
                const mainExpenseID = element._id

                getExpenseTypeID(amount, expenseType, mainExpenseID, TTtoken, lastIndex, res)

            });
        } else {
            res.status(200).json({
                message: "expence download completed"
            })
        }



    } catch (error) {
        console.log("error from create expense", error)
        res.status(200).json({
            message: "expence download error"
        })
    }

});

const getExpenseTypeID = async (amount, expenseType, mainExpenseID, TTtoken, lastIndex, res) => {

    const config = {
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TTtoken}`
        }
    }


    try {
        const { data } = await axios.post(`http://localhost:8000/api/get-chart-of-account-by-id/?companyID=${timetrakerCompanyID}`, { name: expenseType }, config)
        const expenseTypeId = data.chartOfAccount.qbID

        getActiveBankAccount(amount, expenseType, expenseTypeId, mainExpenseID, TTtoken, lastIndex, res)
    } catch (error) {
        console.log("error from getExpenseTypeID", error)
    }
}

const getActiveBankAccount = async (amount, expenseType, expenseTypeId, mainExpenseID, TTtoken, lastIndex, res) => {

    const config = {
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TTtoken}`
        }
    }


    try {
        const { data } = await axios.get(`http://localhost:8000/api/get-active-bank/?companyID=${timetrakerCompanyID}`, config)

        if (data.bankAccount == false) {
            console.log("selact bank account")
            // here we have to send the response that bank is not selacted.
            res.status(200).json({
                message: "selact bank"
            })
        } else {
            const bankName = data.bankAccount.name
            const bankId = data.bankAccount.qbID
            synExpenseDataTTTOQB(amount, expenseType, expenseTypeId, bankName, bankId, mainExpenseID, TTtoken, lastIndex, res)
        }

    } catch (error) {
        console.log("error from getActiveBankAccount", error)
    }
}

const synExpenseDataTTTOQB = async (amount, expenseType, expenseTypeId, bankName, bankId, mainExpenseID, TTtoken, lastIndex, res) => {

    const expense = {
        "AccountRef": {
            "name": `${bankName}`,
            "value": `${bankId}`
        },
        "CurrencyRef": {
            "value": "USD",
            "name": "United States Dollar"
        },
        "Line": [
            {
                "DetailType": "AccountBasedExpenseLineDetail",
                "Amount": amount,
                "AccountBasedExpenseLineDetail": {
                    "AccountRef": {
                        "name": `${expenseType}`,
                        "value": `${expenseTypeId}`
                    },
                    "BillableStatus": "NotBillable",
                    "TaxCodeRef": {
                        "value": "NON"
                    }

                }
            }
        ],
        "PaymentType": "Check",
        "PrintStatus": "NotSet"
    }

    console.log("expense", expense)
    // const expense = {
    //     "AccountRef": {
    //         "value": "35",
    //         "name": "Checking"
    //     },
    //     "CurrencyRef": {
    //         "value": "USD",
    //         "name": "United States Dollar"
    //     },
    //     "Line": [
    //         {
    //             "Id": "1",
    //             "Description": "Office Supplies",
    //             "Amount": 18.08,
    //             "DetailType": "AccountBasedExpenseLineDetail",
    //             "AccountBasedExpenseLineDetail": {
    //                 "AccountRef": {
    //                     "value": "15",
    //                     "name": "Office Expenses"
    //                 },
    //                 "BillableStatus": "NotBillable",
    //                 "AccountRef": {
    //                     "value": "15",
    //                     "name": "Office Expenses"
    //                 },
    //                 "TaxCodeRef": {
    //                     "value": "NON"
    //                 },
    //             }
    //         }
    //     ],
    //     "PaymentType": "Check",
    //     "PrintStatus": "NotSet"
    // }



    try {


        const url = environment === 'sandbox' ?
            OAuthClient.environment.sandbox : OAuthClient.environment.production;
        const authResponse = await axios({
            method: 'post',
            url: `${url}v3/company/${qbCompanyID}/purchase?minorversion=69`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            data: expense,
        });

        console.log("authResponse.data", authResponse.data)

        if (authResponse.data) {

            const config = {
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${TTtoken}`
                }
            }

            try {
                const { data } = await axios.get(`http://localhost:8000/api/sendToQb-expense/?expenseID=${mainExpenseID}`, config)
                console.log(data)
            } catch (error) {
                console.log("error", error)
            }
        }

        if (lastIndex) {
            res.status(200).json({
                message: "expense synced"
            })
        }

    } catch (error) {
        console.error('An error occurred while creating the expense.', error.response.data.Fault);

        if (lastIndex) {
            res.status(200).json({
                message: "expense not synced"
            })
        }
    }
}


//get expense 


app.post('/get-purchase-fromQB', userProtect, async function (req, res) {

    token = req.body.token?.token?.access_token
    timetrakerCompanyID = req.body?.timetrakerCompanyID
    qbCompanyID = req.body.token?.token?.realmId
    if (token != "") {
        environment = req.body.token?.environment
    }

    let TTtoken;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            TTtoken = req.headers.authorization.split(" ")[1]
        } catch (error) {
            console.log(error)
            res.status(401).json({
                message: "you are not authorized"
            })
        }
    }





    try {


        const url = environment === 'sandbox' ?
            OAuthClient.environment.sandbox : OAuthClient.environment.production;
        const authResponse = await axios({
            method: 'get',
            url: `${url}/v3/company/${qbCompanyID}/query?query=select * from Purchase&minorversion=69`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });




        const allPurchase = authResponse.data.QueryResponse.Purchase



        if (allPurchase.length > 0) {
            allPurchase.forEach((element, index) => {

                let lastIndex = false
                if (index == allPurchase.length - 1) {
                    lastIndex = true
                }

                element.Line.forEach((item, set) => {
                    let billable = true
                    let expense = ''
                    if (item.DetailType == 'AccountBasedExpenseLineDetail') {

                        if (item.AccountBasedExpenseLineDetail.BillableStatus == 'NotBillable') {
                            billable = false
                        } else {
                            billable = true
                        }

                        expense = item.AccountBasedExpenseLineDetail.AccountRef.name

                    } else if (item.DetailType == 'ItemBasedExpenseLineDetail') {

                        if (item.ItemBasedExpenseLineDetail.BillableStatus == 'NotBillable') {
                            billable = false
                        } else {
                            billable = true
                        }

                        expense = item.ItemBasedExpenseLineDetail.ItemRef.name

                    }

                    const formData = {
                        date: element.TxnDate,
                        expense: expense,
                        state: 'aproved',
                        companyID: timetrakerCompanyID,
                        amount: item.Amount,
                        billable: billable,
                        sendToQb: true,
                        fromQb: element.Id,
                        lastIndex: lastIndex
                    }

                    sendExpenseQBTOTT(formData, res, allPurchase, TTtoken)

                })

            });
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while geting chart of accounts' });
    }

});

const sendExpenseQBTOTT = async (formData, res, allPurchase, TTtoken) => {

    // config 
    const config = {
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TTtoken}`
        }
    }

    try {
        const { data } = await axios.post("http://localhost:8000/api/send-expense-qb-to-tt", formData, config)
        console.log(data)

        if (formData.lastIndex) {
            res.status(200).json({
                allPurchase: allPurchase,
                message: "syc expense is completed "
            });
        }
    } catch (error) {
        console.log("an error occurred in sendExpenseQBTOTT")
        if (formData.lastIndex) {
            res.status(200).json({
                message: "facing some error please try again"
            });
        }
    }
}




// bank account


app.post('/get-chart-of-account', userProtect, async function (req, res) {


    let TTtoken;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            TTtoken = req.headers.authorization.split(" ")[1]
        } catch (error) {
            console.log(error)
            res.status(401).json({
                message: "you are not authorized"
            })
        }
    }


    token = req.body.token?.token?.access_token
    timetrakerCompanyID = req.body?.timetrakerCompanyID
    qbCompanyID = req.body.token?.token?.realmId
    if (token != "") {
        environment = req.body.token?.environment
    }




    try {


        const url = environment === 'sandbox' ?
            OAuthClient.environment.sandbox : OAuthClient.environment.production;
        const authResponse = await axios({
            method: 'get',
            url: `${url}/v3/company/${qbCompanyID}/query?query=select * from Account&minorversion=69`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });




        const allAccounts = authResponse.data.QueryResponse.Account


        if (allAccounts.length > 0) {
            allAccounts.forEach((element, index) => {

                let lastIndex = false
                if (index == allAccounts.length - 1) {
                    lastIndex = true
                }

                const name = element.Name
                const type = element.AccountType
                const companyID = timetrakerCompanyID
                const qbID = element.Id

                syncAccountQBTOTT(name, type, companyID, qbID, res, lastIndex, TTtoken)

            });
        }



    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while geting chart of accounts' });
    }

});

const syncAccountQBTOTT = async (name, type, companyID, qbID, res, lastIndex, TTtoken) => {


    // config 
    const config = {
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TTtoken}`
        }
    }

    try {
        const { data } = await axios.post("http://localhost:8000/api/create-account", { name: name, type: type, companyID: companyID, qbID: qbID, lastIndex: lastIndex }, config)
        if (lastIndex) {
            res.status(200).json({
                message: "sync chart of account is completed"
            });
        }
    } catch (error) {
        console.log("error from syncAccountQBTOTT ", error)
        if (lastIndex) {
            res.status(200).json({
                message: "form catch block"
            });
        }
    }
}

