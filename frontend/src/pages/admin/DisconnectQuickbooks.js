import React, { useState, useEffect, useContext } from "react";
import "./Quickbooks.css";
import axios from "axios";
import connectToQB from "../../img/connectToQB.png";
import { MyContext } from "../../context/MyProvider";
import AdminLayout from "../../hoc/AdminLayout";
import { Col, Container, Row } from "react-bootstrap";
import signupImg1 from "../../img/Vector.png";
import signupImg2 from "../../img/user2.png";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import Loder from "../../components/Loder";
import CryptoJS from 'crypto-js';

const DisconnectQuickbooks = () => {
    const [dataQuickFormBacend, setDataQuickFormBacend] = useState("");
    const [dataFormQuick, setDataFormQuick] = useState("");
    const encryptionKey = 'YourEncryptionKey';

    const encryptObjectForQB = (objectToEncrypt) => {

        try {
            const encrypted = CryptoJS.AES.encrypt(JSON.stringify(objectToEncrypt), encryptionKey).toString();
            localStorage.setItem('dataFormQuick', encrypted);
        } catch (error) {
            console.error('Encryption failed:', error.message);
        }
    };

    const decryptObjectForQB = () => {
        const QbDataFromLocal = localStorage.getItem("dataFormQuick");
        if (QbDataFromLocal) {
            try {
                const bytes = CryptoJS.AES.decrypt(QbDataFromLocal, encryptionKey);
                setDataFormQuick(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)));
            } catch (error) {
                console.error('Decryption failed:', error.message);
            }
        } else {
            console.log('No encrypted data found.');
        }
    };



    const [loading, setLoading] = useState(false)
    const [connect, setConnect] = useState(true)


    const navigate = useNavigate();
    // config


    const adminloginInfo = JSON.parse(localStorage.getItem("adminLoginInfo"));
    const userLoginInfo = JSON.parse(localStorage.getItem("userLoginInfo"));

    if (adminloginInfo) {
        var companyID = adminloginInfo?._id;
        var TTtoken = adminloginInfo?.token
    } else if (userLoginInfo) {
        var companyID = userLoginInfo?.companyID;
        var TTtoken = userLoginInfo?.token
    }


    var config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${TTtoken}`
        },
    };

    const [employeeInfo, setEmployeeInfo] = useState([]);


    function authorizeUri() {


        axios
            .get(
                "http://localhost:8000/authUri",
                function (uri) {
                }
            )
            .then(function (authUri) {
                // Launch Popup using the JS window Object
                var parameters = "location=1,width=800,height=650";
                // parameters += ",left=" + (screen.width - 800) / 2 + ",top=" + (screen.height - 650) / 2;
                var win = window.open(authUri.data, "connectPopup", parameters);
                // var pollOAuth = window.setInterval(function () {
                //   try {
                //     if (win.document.URL.indexOf("code") != -1) {
                //       window.clearInterval(pollOAuth);
                //       win.close();
                //       window.location.reload();
                //     }
                //   } catch (e) {
                //     console.log(e);
                //   }
                // }, 100);
            });
    }
    const deleteTokenFormMongo = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:8000/api/delete-qb-token?companyID=${companyID}`,
                config
            );
            if (data) {
                localStorage.removeItem("dataFormQuick")
                setConnect(true)
                
            }
        } catch (error) {
            console.log(error)
        }
    }


    const disconnectQuickbooks = async () => {
        decryptObjectForQB()
        const token = dataFormQuick;
        try {
            const { data } = await axios.post(
                `http://localhost:8000/disconnect`,
                { token: token, timetrakerCompanyID: companyID },
                config
            );
           
            if (data) {
                deleteTokenFormMongo()
            }
        } catch (error) {
            console.log(error)
        }


    }

    useEffect(() => {
        disconnectQuickbooks()
    }, [])



    const refresh_token_Access_token = async (oldData) => {

        setLoading(true)

        let newDataFormQuick = oldData.existToken.fullToken
        // decryptObjectForQB()
        const token = newDataFormQuick;
        try {
            const { data } = await axios.post(
                `http://localhost:8000/refreshAccessToken`,
                { token: token, timetrakerCompanyID: companyID },
                config
            );
            if (data) {

                const access_token = data.result.token.access_token
                const refresh_token = data.result.token.refresh_token
                const id_token = data.result.token.id_token

                newDataFormQuick.token.access_token = access_token
                newDataFormQuick.token.refresh_token = refresh_token
                newDataFormQuick.token.id_token = id_token

                // localStorage.setItem("dataFormQuick", JSON.stringify(newDataFormQuick));
                encryptObjectForQB(newDataFormQuick)

                let refress = false
                saveTokenInBackend(newDataFormQuick, refress)
            }

        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }




    async function retrieveToken() {
        // Generate the authUri
        try {
            const res = await axios.get("http://localhost:8000/retrieveToken");
            if (res?.data?.token?.access_token) {
                setDataQuickFormBacend(res?.data);
                return

            } else {
                setTimeout(retrieveToken, 2000)
            }


        } catch (error) {
            console.log("error", error)
        }
    }







    function refreshToken() {
        // Generate the authUri
        axios.get("http://localhost:8000/refreshAccessToken", function (token) {
            var token =
                token != null
                    ? token
                    : "Please Authorize Using Connect to Quickbooks first !";
            // $("#accessToken").html(token);
        });
    }

    function makeAPICall() {
        // Generate the authUri
        axios.get("http://localhost:8000/getCompanyInfo", function (response) {
            // $("#apiCall").html(JSON.stringify(response, null, 4));
        });
    }

    function authorizeUriFn(e) {
        e.preventDefault();
        retrieveToken()
        authorizeUri();
    }



    function refreshTokenFn(e) {
        e.preventDefault();
        refreshToken();
    }
    function makeAPICallFn(e) {
        e.preventDefault();
        makeAPICall();
    }

    // async function createEmploye (e){
    //     e.preventDefault();
    //     const formData = {}
    //     // axios.post('http://localhost:8000/createEmploye', function (response) {
    //     //     // $("#apiCall").html(JSON.stringify(response, null, 4));
    //     //     console.log("response", response)
    //     // });
    //     const { data } = await axios.post(`http://localhost:8000/createEmploye`, formData)
    //     console.log(data)
    // }

    async function createExpense(e) {
        decryptObjectForQB()
        const token = dataFormQuick;
        try {
            let resp = await axios.post(
                "http://localhost:8000/createExpense",
                { token: token, timetrakerCompanyID: companyID },
                config
            );
        } catch (error) {
            alert("There is some error please connect with QuickBooks and try again");
        }
    }

    async function createExpensePurchase(e) {
        setLoading(true)
        decryptObjectForQB()
        const token = dataFormQuick;
        try {
            let resp = await axios.post(
                "http://localhost:8000/createExpense-purchase",
                { token: token, timetrakerCompanyID: companyID },
                config
            );
            setLoading(false)
        } catch (error) {
            setLoading(false)
            alert("There is some error please connect with QuickBooks and try again");
        }
    }

    const sendEmployeeToQuickbooks = async () => {
        setLoading(true)
        decryptObjectForQB()
        const token = dataFormQuick;
        try {
            let resp = await axios.post(
                "http://localhost:8000/sync-timesheet-user-with-quickbooks",
                { token: token, timetrakerCompanyID: companyID },
                config
            );
            setLoading(false)
        } catch (error) {
            setLoading(false)
            alert("There is some error please connect with QuickBooks and try again");
        }
    };

    async function createTimesheet(e) {
        setLoading(true)
        decryptObjectForQB()
        const token = dataFormQuick;
        try {
            let resp = await axios.post(
                "http://localhost:8000/createTimesheet",
                { token: token, timetrakerCompanyID: companyID },
                config
            );
            setLoading(false)
        } catch (error) {
            setLoading(false)
            alert("There is some error please connect with QuickBooks and try again");
        }
    }

    async function getTimesheet(e) {
        setLoading(true)
        decryptObjectForQB()
        const token = dataFormQuick;
        try {
            let resp = await axios.post(
                "http://localhost:8000/getTimesheet",
                { token: token, timetrakerCompanyID: companyID },
                config
            );
            setLoading(false)
        } catch (error) {
            setLoading(false)
            alert("There is some error please connect with QuickBooks and try again");
        }
    }

    async function createCustomer(e) {
        setLoading(true)
        decryptObjectForQB()
        const token = dataFormQuick;
        console.log("config", config)
        try {
            let resp = await axios.post(
                "http://localhost:8000/create-customer",
                { token: token, timetrakerCompanyID: companyID },
                config
            );
            setLoading(false)
        } catch (error) {
            setLoading(false)
            alert("There is some error please connect with QuickBooks and try again");
        }
    }

    const getQBTokenFormDataBase = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(
                `http://localhost:8000/api/get-qb-token?companyID=${companyID}`,
                config
            );
            if (data) {
                setConnect(false)
                refresh_token_Access_token(data)
            }
        } catch (error) {
            setLoading(false)
            console.log("error from getAllBankAccount", error);
        }
    }

    async function getCustomer(e) {
        setLoading(true)
        decryptObjectForQB()
        const token = dataFormQuick;
        try {
            let resp = await axios.post(
                "http://localhost:8000/get-customer",
                { token: token, timetrakerCompanyID: companyID },
                config
            );
            setLoading(false)
        } catch (error) {
            setLoading(false)
            alert("There is some error please connect with QuickBooks and try again");
        }
    }

    async function getChartOfAccount(e) {
        setLoading(true)
        decryptObjectForQB()
        const token = dataFormQuick;
        try {
            let resp = await axios.post(
                "http://localhost:8000/get-chart-of-account",
                { token: token, timetrakerCompanyID: companyID },
                config
            );
            setLoading(false)
        } catch (error) {
            setLoading(false)
            alert("There is some error please connect with QuickBooks and try again");
        }
    }

    async function GetExpenseFromQB(e) {
        setLoading(true)
        decryptObjectForQB()
        const token = dataFormQuick;
        try {
            let resp = await axios.post(
                "http://localhost:8000/get-purchase-fromQB",
                { token: token, timetrakerCompanyID: companyID },
                config
            );
            setLoading(false)
        } catch (error) {
            setLoading(false)
            alert("There is some error please connect with QuickBooks and try again");
        }
    }

    async function getEmployee(e) {

        setLoading(true)


        decryptObjectForQB()
        const token = dataFormQuick;

        try {
            let resp = await axios.post(
                "http://localhost:8000/getEmployee",
                { token: token, timetrakerCompanyID: companyID },
                config
            );
            setLoading(false)
            setEmployeeInfo(resp.data.QueryResponse.Employee);
        } catch (error) {
            setLoading(false)
            alert("There is some error please connect with QuickBooks and try again");
        }

    }


    if (employeeInfo != []) {
        employeeInfo.forEach((element) => {
            if (element?.PrimaryEmailAddr?.Address) {
                createEmployeInTT(element)

            } else {

                console.log("this user does not have a email")
            }
        });
    }

    async function createEmployeInTT(element) {
        try {
            const { data } = await axios.post(
                "http://localhost:8000/api/user-register-for-QB",
                {
                    name: element.DisplayName,
                    phone: element?.PrimaryPhone?.FreeFormNumber,
                    email: element?.PrimaryEmailAddr?.Address,
                    companyID: companyID,
                },
                config
            );

        } catch (error) {
            alert(
                "There is some error please connect with QuickBooks and try again"
            );
        }
    }



    const [bankAccount, setBankAccount] = useState([]);
    const [selectedBank, setSelactedBank] = useState("")

    const getAllBankAccount = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:8000/api/get-bank-account/?companyID=${companyID}`,
                config
            );
            setBankAccount(data.bankAccount);
            console.log('data.bankAccount', data.bankAccount)
            data.bankAccount.forEach((element) => {
                if (element.profile == "active") {
                    setSelactedBank(element.name)
                    return
                }
            })
        } catch (error) {
            console.log(error)
        }
    };

    const handleChangeBank = async (e) => {

        const name = e.target.value;
        setSelactedBank(e.target.value)

        try {
            try {
                const { data } = await axios.post(
                    `http://localhost:8000/api/update-account-profile/?companyID=${companyID}`,
                    { name: name },
                    config
                );
            } catch (error) {
                console.log("error from getAllBankAccount", error);
            }
        } catch (error) {
            console.log("error from handleChangeBank", error);
        }
    };

    const saveTokenInBackend = async (dataFormQuick, refress) => {
        setLoading(true)
        decryptObjectForQB()


        try {
            const { data } = await axios.post(
                `http://localhost:8000/api/update-qb-token?companyID=${companyID}`,
                dataFormQuick,
                config
            );
            setLoading(false)
            if (data && refress) {

                window.location.reload()
            }
        } catch (error) {
            setLoading(false)
            console.log("error from getAllBankAccount", error);
        }

    }

    const oauthClientNull = async () => {
        try {
            await axios.get(
                `http://localhost:8000/oauthClient-null`,
                config
            );
        } catch (error) {
            console.log("error from getAllBankAccount", error);
        }
    }

    useEffect(() => {
        if (dataQuickFormBacend) {
            // localStorage.setItem("dataFormQuick", JSON.stringify(dataFormQuick));
            encryptObjectForQB(dataQuickFormBacend)

            //   here i need to add the code to clean the the oauthClient


            // const getUserInfoFormQB = async() => {
            //   try{
            //     const {data} = await axios.get('http://localhost:8000/getUserInfoFormQB', config)
            //   }catch(error){
            //     console.log(error)
            //   }
            // }
            // getUserInfoFormQB()
            let refress = true
            saveTokenInBackend(dataQuickFormBacend, refress)
            oauthClientNull()
        }
    }, [dataQuickFormBacend.token])

    useEffect(() => {
        getAllBankAccount();
    }, []);

    const { sideBarStatus, setSideBarStatus } = useContext(MyContext);

    const handleClick = () => {
        if (sideBarStatus == true) {
            setSideBarStatus(false);
        } else {
            setSideBarStatus(true);
        }
    };

    const screenWidth = window.innerWidth;
    if (screenWidth >= 840) {
        var forPhoneScreenNoDisplay = true;
    } else {
        var forPhoneScreenNoDisplay = false;
    }

    useEffect(() => {
        if (!forPhoneScreenNoDisplay) {
            setSideBarStatus(false);
        }
        getQBTokenFormDataBase()
    }, []);




    // sync all

    const syncAll = async () => {
        setLoading(true)
        // const token = dataFormQuick;
        // try {
        //   const apiUrls = [
        //     'http://localhost:8000/getEmployee',
        //     'http://localhost:8000/get-customer',
        //     'http://localhost:8000/get-chart-of-account',
        //     'http://localhost:8000/getTimesheet',
        //     'http://localhost:8000/get-purchase-fromQB',
        //   ];

        //   const apiPromises = apiUrls.map(url => {

        //     return fetch(url, {
        //       method: 'POST',
        //       headers: {
        //         Accept: "application/json",
        //         "Content-type": "application/json",
        //       },
        //       body: JSON.stringify({ token: token, timetrakerCompanyID: companyID }),
        //     }).then(response => response.json());
        //   });

        //   const responses = await Promise.all(apiPromises);

        //   if(responses){
        //     getTimesheet()
        //     GetExpenseFromQB()
        //   }
        //   setLoading(false)

        // } catch (error) {
        //   setLoading(false)
        //   alert(
        //     "There is some error please connect with QuickBooks and try again or try to sync individually"
        //   );
        // }


        setLoading(true)


        decryptObjectForQB()
        const token = dataFormQuick;

        try {
            let resp1 = await axios.post(
                "http://localhost:8000/getEmployee",
                { token: token, timetrakerCompanyID: companyID },
                config
            );
            setEmployeeInfo(resp1.data.QueryResponse.Employee);
            if (resp1) {
                try {
                    let resp2 = await axios.post(
                        "http://localhost:8000/get-customer",
                        { token: token, timetrakerCompanyID: companyID },
                        config
                    );
                    if (resp2) {
                        try {
                            let resp3 = await axios.post(
                                "http://localhost:8000/get-chart-of-account",
                                { token: token, timetrakerCompanyID: companyID },
                                config
                            );
                            if (resp3) {
                                try {
                                    let resp4 = await axios.post(
                                        "http://localhost:8000/getTimesheet",
                                        { token: token, timetrakerCompanyID: companyID },
                                        config
                                    );
                                    if (resp4) {
                                        try {
                                            let resp5 = await axios.post(
                                                "http://localhost:8000/get-purchase-fromQB",
                                                { token: token, timetrakerCompanyID: companyID },
                                                config
                                            );
                                            setLoading(false)
                                        } catch (error) {
                                            setLoading(false)
                                            alert("There is some error please connect with QuickBooks and try again");
                                        }
                                    }
                                } catch (error) {
                                    setLoading(false)
                                    alert("There is some error please connect with QuickBooks and try again");
                                }
                            }
                        } catch (error) {
                            setLoading(false)
                            alert("There is some error please connect with QuickBooks and try again");
                        }
                    }
                } catch (error) {
                    setLoading(false)
                    alert("There is some error please connect with QuickBooks and try again");
                }
            }
        } catch (error) {
            setLoading(false)
            alert("There is some error please connect with QuickBooks and try again");
        }

    };




    return (
        <AdminLayout>
            {
                loading ?
                    <Loder className='loder' />
                    :
                    console.log("")
            }
            <div
                // style={loading ? { filter: 'blur(2px)' } : console.log('')}
                className={sideBarStatus ? "content_right_dashboard_quick" : "none"}
                fluid
                style={
                    (sideBarStatus == true) & (forPhoneScreenNoDisplay == false)
                        ? { display: "none" }
                        : loading ?
                            { filter: 'blur(2px)', display: "block", minHeight: "100vh", background: "#f1f1f1" }
                            : { display: "block", minHeight: "100vh", background: "#f1f1f1" }
                }
            >

                <Container style={{ padding: "0" }} fluid className="dash3" >
                    {/* Row 1 */}
                    <Row>
                        <Col className="task-container">
                            <div
                                className="hamburgar"
                                style={
                                    sideBarStatus ? { display: "none" } : { display: "block" }
                                }
                            >
                                <i onClick={handleClick} className="fas fa-bars"></i>
                            </div>
                            <div className="task-top">
                                <div
                                    className="task-header1"

                                >
                                    <h5
                                        style={
                                            sideBarStatus == true
                                                ? { paddingLeft: "10px", paddingTop: "2px" }
                                                : { paddingLeft: "60px", paddingTop: "4px" }
                                        }
                                    >
                                        QuickBooks
                                    </h5>
                                </div>

                                <div className="task-header2">
                                    <abbr title="?">
                                        <img src={signupImg1} alt="" />
                                    </abbr>
                                    <abbr title="Profile">
                                        <img
                                            onClick={() => {
                                                navigate("/profile");
                                            }}
                                            src={signupImg2}
                                            alt=""
                                        />
                                    </abbr>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div style={{ padding: "15px 30px" }}>


                    {/* display-box */}
                    <p className="text-center mt-5">
                        Now click the <b>Connect to QuickBooks</b> button below.
                    </p>
                    <pre id="accessToken"></pre>
                    <div className="display-box">
                        <a
                            className="imgLink"
                            href="#"
                            id="authorizeUri"

                        >
                            <img onClick={authorizeUriFn} style={connect ? { display: 'block' } : { display: "none" }} className="img_to_qb" src={connectToQB} width="178" />
                            <button style={connect ? { display: 'none' } : { display: "block" }} onClick={disconnectQuickbooks}>Disconnect</button>
                        </a>


                    </div>


                    <div className="headline">
                        <h1>Integrate with QuickBooks</h1>
                    </div>

                    <pre>{/* {JSON.stringify(props.data, null, 2)} */}</pre>

                    <div className="api-button">
                        <h2>Sync and Download required data </h2>
                        <div className="api-button-container">
                            {/* <h2>Make an API call</h2> */}
                            {/* <h4> Please refer to our <a target="_balnk" */}
                            {/* href="https://developer.intuit.com/v2/apiexplorer?apiname=V3QBO#?id=Account">API Explorer</a> </h4> */}
                            {/* <p>If there is no access token or the access token is invalid, click either the <b>Connect to QuickBooks</b> </p> */}

                            {/* <button type="button" id="makeAPICall" onClick={makeAPICallFn} className="btn btn-success">Get Company Info</button> */}
                            <div className="sync_button">
                                <button
                                    className="btn btn-success btn_qb_2"
                                    onClick={syncAll}
                                >
                                    Sync All
                                </button>
                                <button
                                    className="btn btn-success btn_qb_2"
                                    onClick={getEmployee}
                                >
                                    Sync Employee
                                </button>

                                {/* <button className="btn btn-success btn_qb_2" onClick={createExpense}>create expense(bill)</button>
                    <button className="btn btn-success btn_qb_2" onClick={createExpensePurchase}> create expense (purchase)</button> */}

                                <button
                                    className="btn btn-success btn_qb_2"
                                    onClick={getTimesheet}
                                >
                                    Sync Timesheet
                                </button>

                                <button
                                    className="btn btn-success btn_qb_2"
                                    onClick={getCustomer}
                                >
                                    Sync Project
                                </button>

                                <button
                                    className="btn btn-success btn_qb_2"
                                    onClick={GetExpenseFromQB}
                                >
                                    Sync Expense
                                </button>
                                <button
                                    className="btn btn-success btn_qb_2"
                                    onClick={getChartOfAccount}
                                >
                                    {" "}
                                    Sync Chart Of Account{" "}
                                </button>

                                <div className="bank-account">
                                    {/* <label
                    className="lable_bold"
                    style={{ fontSize: "16px" }}
                    htmlFor=""
                  >
                    Select Bank Account
                  </label> 
                  <br />*/}
                                    <Form.Select
                                        style={{ cursor: "pointer" }}
                                        name="expense"
                                        onChange={handleChangeBank}
                                        type="selact"
                                        required
                                        className="drop-area1 drop-bank"
                                        aria-label="Default select example"
                                        value={selectedBank}
                                    >
                                        <option value="">Select bank account</option>
                                        {bankAccount &&
                                            bankAccount.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.name}>
                                                        {item.name}
                                                    </option>
                                                );
                                            })}
                                    </Form.Select>
                                </div>
                            </div>
                            <div className="download_button">

                                <button
                                    className="btn btn-success btn_qb_2"
                                    onClick={createCustomer}
                                >
                                    Download Project
                                </button>
                                <button
                                    className="btn btn-success btn_qb_2"
                                    onClick={sendEmployeeToQuickbooks}
                                >
                                    Download Employee
                                </button>
                                <button
                                    className="btn btn-success btn_qb_2"
                                    onClick={createTimesheet}
                                >
                                    Download Timesheet
                                </button>

                                <button
                                    className="btn btn-success btn_qb_2"
                                    onClick={createExpensePurchase}
                                >
                                    Download Expense
                                </button>



                            </div>

                        </div>
                    </div>



                    <div className="more-info">
                        <hr />
                        <p>More Info:</p>
                        <ul>
                            <li>
                                <a href="https://developer.intuit.com/docs">
                                    Integrate With QuickBooks Guide
                                </a>
                            </li>
                            <li>
                                <a href="https://developer.intuit.com/docs/00_quickbooks_online/2_build/50_sample_apps_and_code">
                                    Sync And Download Gide
                                </a>
                            </li>
                            <li>
                                <a href="https://developer.intuit.com/docs/00_quickbooks_online/2_build/40_sdks">
                                    About TimeTraker
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* <hr /> */}
                    <p className="text-center text-muted">
                        &copy; 2024 TimeTraker&trade;, All rights reserved. TimeTraker and
                        FCIT are registered trademarks of TimeTraker.
                    </p>

                    {/* <button onClick={createEmployee}>create employe</button>  */}
                </div>
            </div>
        </AdminLayout>
    );
};

export default DisconnectQuickbooks;
