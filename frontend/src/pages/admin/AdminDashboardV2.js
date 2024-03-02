

import React, { useEffect, useState, useContext } from 'react'
import "./AdminDashboardV2.css"
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import signupImg1 from "../../img/Vector.png"
import signupImg2 from "../../img/user2.png"
import cardImg1 from "../../img/user2-1.png"
import cardImg2 from "../../img/8134653_briefcase_case_office_project_work_icon 1.svg"
import cardImg3 from "../../img/Group 18.png"
import cardImg4 from "../../img/11019415_wallet_accounting_expense_income_dollar_icon 1.svg"
import timesheet1 from "../../img/Group-5.png"
import timesheet2 from "../../img/Group-6.png"
import AdminLayout from '../../hoc/AdminLayout'
import axios from 'axios'
import AdminChart from '../../components/AdminChart'
import { MyContext } from '../../context/MyProvider'
import Form from "react-bootstrap/Form";
import { PaiChartForReport } from '../../components/PaiChartForReport'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const AdminDashboardV2 = () => {


    const { sideBarStatus, setSideBarStatus } = useContext(MyContext);

    const handleClick = () => {
        if (sideBarStatus == true) {
            setSideBarStatus(false)
        } else {
            setSideBarStatus(true)
        }
    }
    const navigate = useNavigate()


    const screenWidth = window.innerWidth;
    if (screenWidth >= 840) {
        var forPhoneScreenNoDisplay = true
    } else {
        var forPhoneScreenNoDisplay = false
    }






    const [projectInfo, setProjectInfo] = useState([])
    const [taskInfo, setTaskInfo] = useState([])
    const [allUser, setAllUser] = useState([]);
    const [expenseInfo, setExpenseInfo] = useState([]);
    const [allUserTimesheetInfo, setAllUserTimesheetInfo] = useState([]);
    const [allManager, setAllManager] = useState([]);
    const [allSubAdmin, setAllSubAdmin] = useState([]);
    const [showFilterForChart, setShowFilterForChart] = useState(false);



    const adminloginInfo = JSON.parse(localStorage.getItem('adminLoginInfo'));
    const userLoginInfo = JSON.parse(localStorage.getItem('userLoginInfo'));


    if (adminloginInfo) {
        var companyID = adminloginInfo._id
        var token = adminloginInfo?.token
        var name = adminloginInfo?.name
    }
    else if (userLoginInfo) {
        var companyID = userLoginInfo.companyID
        var token = userLoginInfo?.token
        var name = userLoginInfo?.name
    }

    console.log("projectInfo===>", projectInfo)
    // config 

    const config = {
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }



    const TimesheetSubmitNotfy = () => {
        toast.success(`welcome ${name}`, {
            position: 'top-right',
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };



    const getAllUser = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/all-users/?companyID=${companyID}`, config)
            setAllUser(data.allUsers)
        } catch (error) {
            console.log('error', error)
        }
    }

    // get all project 

    const getAllProject = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/all-project/?companyID=${companyID}`, config)
            setProjectInfo(data.projects)
        } catch (error) {
            console.log('error', error)
        }
    }

    // get all task 

    const getAllTask = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/all-task/?companyID=${companyID}`, config)
            setTaskInfo(data.tasks)
        } catch (error) {
            console.log('error', error)
        }
    }

    // get all expenses 

    const getAllUsersExpress = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/all-expense/?companyID=${companyID}`, config)
            setExpenseInfo(data.expenses)
        } catch (error) {
            console.log('error', error)
        }
    }

    // get all user Timesheet

    const getAllUserTimesheet = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/all-Timesheet/?companyID=${companyID}`, config)
            setAllUserTimesheetInfo(data.timesheets)
        } catch (error) {
            console.log('error', error)
        }
    }

    const getAllManager = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/all-manager/?companyID=${companyID}`, config)

            setAllManager(data.allManager)
        } catch (error) {
            console.log("error from get all user api", error)
        }
    }

    const getAllSubAdmin = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/all-sub-asmin/?companyID=${companyID}`, config)

            setAllSubAdmin(data.allSubAdmin)
        } catch (error) {
            console.log("error from get all user api", error)
        }
    }


    const filterTimesheetByStatus = async (e) => {
        try {
            const state = e.target.value
            const { data } = await axios.post(`http://localhost:8000/api/all-Filtered-Timesheet/?companyID=${companyID}`, { state: state }, config)
            setAllUserTimesheetInfo(data.filteredTimesheet)
        } catch (error) {
            console.log('error', error)
        }
    }








    let firstFiveItems = projectInfo.slice(0, 5);



    // total number of expense 
    const totalExpense = expenseInfo.length

    // totask number of task 
    const totalProject = projectInfo.length

    // totask number of task 
    const totalTask = taskInfo.length

    // total number of users 

    const totalUser = allUser.length + 1 + allManager.length + allSubAdmin.length


    useEffect(() => {
        TimesheetSubmitNotfy()
        getAllUser()
        getAllProject()
        getAllTask()
        getAllUsersExpress()
        getAllUserTimesheet()
        getAllManager()
        getAllSubAdmin()
        if (!forPhoneScreenNoDisplay) {
            setSideBarStatus(false)
        }
    }, [])



    // this is all timesheet map code        // starts from here 
    const dateWithHours = {};

    allUserTimesheetInfo ? allUserTimesheetInfo.forEach(item => {
        // item.dynamicData
        const date = item.date
        const hours = item.hours
        if (dateWithHours[date]) {
            dateWithHours[date] += hours;
            console.log("dateWithHours", dateWithHours)
        } else {
            dateWithHours[date] = hours;
        }



    }) : console.log("na")

 


    const newArray = Object.entries(dateWithHours).map(([date, hours]) => ({
        date,
        hours: hours?.toString(),
    }));

    newArray.sort((a, b) => a.date.localeCompare(a.date));

    console.log("allUserTimesheetInfo======>", newArray)

    const data = newArray.slice(-4)
    console.log("slicedArrslicedArr", data)

    console.log("newArray", newArray)



    //ends here 

    const [dateForFilter, setDateForFilter] = useState({ companyID: companyID })
    const [chartFilter, setChartFilter] = useState(false)


    const handlechangeFilterDate = (e) => {
        const { name, value } = e.target;
        setDateForFilter((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmitFilterData = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`http://localhost:8000/api/filtered-timesheet-report`, dateForFilter, config)
            setAllUserTimesheetInfo(data.timesheets)
            setChartFilter(true)
        } catch (error) {
            console.log(error)
        }

    }


    const [filteredHoldTimesheet, setFilteredHoldTimesheet] = useState()
    const [filteredSubmitedTimesheet, setFilteredSubmitedTimesheet] = useState()
    const [filteredAprovedTimesheet, setFilteredAprovedTimesheet] = useState()
    const [paiDataForTotalTimesheetAndHold, setPaiDataForTotalTimesheetAndHold] = useState([])
    const [paiDataForTotalTimesheetAndSubmited, setPaiDataForTotalTimesheetAndSubmited] = useState([])
    const [paiDataForTotalTimesheetAndAproved, setPaiDataForTotalTimesheetAndAproved] = useState([])
    const [paiDataForHoldTimesheetAndSubmited, setPaiDataForHoldTimesheetAndSubmited] = useState([])
    const [paiDataForSubmitedTimesheetAndAproved, setPaiDataForSubmitedTimesheetAndAproved] = useState([])

    useEffect(() => {
        setFilteredHoldTimesheet(allUserTimesheetInfo.filter(item => item.state === "hold"))
        setFilteredSubmitedTimesheet(allUserTimesheetInfo.filter(item => item.state === "submited"))
        setFilteredAprovedTimesheet(allUserTimesheetInfo.filter(item => item.state === "Aproved"))

    }, [allUserTimesheetInfo])

    useEffect(() => {

        setPaiDataForTotalTimesheetAndHold([

            {
                name: "Hold",
                value: filteredHoldTimesheet?.length
            },
            {
                name: "Total",
                value: allUserTimesheetInfo?.length - filteredHoldTimesheet?.length
            }
        ])
    }, [filteredHoldTimesheet])

    useEffect(() => {


        setPaiDataForTotalTimesheetAndSubmited([
            {
                name: "Submited",
                value: filteredSubmitedTimesheet?.length
            },
            {
                name: "Total",
                value: allUserTimesheetInfo?.length - filteredSubmitedTimesheet?.length
            }
        ])
    }, [filteredSubmitedTimesheet])

    useEffect(() => {


        setPaiDataForTotalTimesheetAndAproved([

            {
                name: "Aproved",
                value: filteredAprovedTimesheet?.length
            },
            {
                name: "Total",
                value: allUserTimesheetInfo?.length - filteredAprovedTimesheet?.length
            }
        ])
    }, [filteredAprovedTimesheet])

    useEffect(() => {


        setPaiDataForHoldTimesheetAndSubmited([

            {
                name: "Hold",
                value: filteredHoldTimesheet?.length
            },
            {
                name: "Submited",
                value: filteredSubmitedTimesheet?.length
            }
        ])
    }, [filteredSubmitedTimesheet, filteredHoldTimesheet])

    useEffect(() => {


        setPaiDataForSubmitedTimesheetAndAproved([

            {
                name: "Aproved",
                value: filteredAprovedTimesheet?.length
            },
            {
                name: "Submited",
                value: filteredSubmitedTimesheet?.length
            }
        ])
    }, [filteredAprovedTimesheet, filteredSubmitedTimesheet])




    return (
        <AdminLayout>
            {/* content_right_dashboard */}
            <ToastContainer />

            <Container className={sideBarStatus ? 'content_right_dashboard_3' : "none"} fluid style={sideBarStatus == true & forPhoneScreenNoDisplay == false ? { display: 'none' } : { display: 'block' }}>
                {/* Row 1 */}
                <div className="hamburgar" style={sideBarStatus ? { display: 'none' } : { display: 'block' }}>
                    <i onClick={handleClick} className='fas fa-bars'></i>
                </div>

                <Row>
                    <Col md={12} className='dash-container1' >
                        <div className="header-top">
                            <div className="dash-header1">
                                <Link style={
                                    sideBarStatus == true
                                        ? { paddingLeft: "0px", paddingTop: "2px", fontSize: "22px" }
                                        : { paddingLeft: "30px", paddingTop: "4px", fontSize: "22px" }
                                } >Dashboard</Link>

                            </div>

                            <div className="dash-header2">
                                <abbr title='?'><img src={signupImg1} alt="" /></abbr>
                                <abbr title='Profile'><img onClick={() => { navigate("/profile") }} src={signupImg2} alt="" /></abbr>
                            </div>
                        </div>
                    </Col>
                </Row>

                <div className='body_main_content'>
                    {/* Row 2 */}
                    <Row style={{ background: '#F1F1F1' }}>
                        <Col md={12}>
                            <div className="card-container">
                                <div className="card1">
                                    <img src={cardImg1} alt="" />
                                    <div className='card_content_parent'>
                                        <p className='card-para1'>{totalUser}</p>
                                        <p className='card-para2'>Users</p>
                                    </div>
                                </div>

                                <div className="card1">
                                    <img src={cardImg2} alt="" />
                                    <div className='card_content_parent'>
                                        <p className='card-para1'>{totalProject}</p>
                                        <p className='card-para2'>Projects</p>
                                    </div>
                                </div>

                                <div className="card1">
                                    <img src={cardImg3} alt="" />
                                    <div className='card_content_parent'>
                                        <p className='card-para1'>{totalTask}</p>
                                        <p className='card-para2'>Task</p>
                                    </div>
                                </div>

                                <div className="card1 expense_card">
                                    <img src={cardImg4} alt="" />
                                    <div className='card_content_parent'>
                                        <p className='card-para1'>{totalExpense}</p>
                                        <p className='card-para2'>Expense Items</p>
                                    </div>
                                </div>

                                <div className="card5">
                                    <div className='card-child'>
                                        <p className='card-para3'>Total Time Sheets</p>
                                        <p className='card-para1'>{allUserTimesheetInfo?.length}</p>
                                    </div>
                                </div>

                            </div>
                        </Col>
                    </Row>

                    {/* Row 3 */}
                    <Row style={{ background: '#F1F1F1' }}>
                        <Col md={12} className='dash1-wrap1'>
                            <div style={showFilterForChart ? { height: "470px" } : { height: "400px" }} className='graphLeft'>
                                <div className='graph-text'>
                                    <Form.Select
                                        className="input-menu-focus graph-text_selact"
                                        style={{ cursor: 'pointer' }}
                                        name="status"
                                        aria-label="Default select example"
                                        onChange={filterTimesheetByStatus}
                                    >
                                        <option value="">Total Hours</option>
                                        <option value="hold">Hold Hours</option>
                                        <option value="submited">Submited Hours</option>
                                        <option value="aproved">Aproved Hours</option>
                                    </Form.Select>
                                    <button onClick={() => { setShowFilterForChart(!showFilterForChart) }} >{data[0] ? data[0].date : "00-00-00"} to {data[data.length - 1] ? data[data.length - 1].date : "00-00-00"} </button>
                                </div>

                                <form onSubmit={handleSubmitFilterData} style={showFilterForChart ? { display: "flex" } : { display: "none" }} className='date_filter_for_cahrt'>
                                    <input required onChange={handlechangeFilterDate} name='startDate' type='date' />
                                    <input required onChange={handlechangeFilterDate} name='endDate' type='date' />
                                    <button type='submit' className=''>Filter</button>
                                </form>
                                {/* <img className='img-fluid' src={graphImg} alt="" />  */}
                                <div style={chartFilter ? { display: "none" } : { display: "block" }}>
                                    <AdminChart data={data} />
                                </div>
                                <div style={chartFilter ? { display: "block" } : { display: "none" }}>
                                    <AdminChart data={newArray} />
                                </div>


                            </div>

                            <div className='graphRight-container'>
                                <div className="graphRight">
                                    <h5>Top Customers</h5>
                                    <div className='graph1'>
                                        {firstFiveItems && firstFiveItems.map((item, index) => {

                                            return (
                                                <div key={index} style={{ display: 'flex', margin: '10px 0px' }}>
                                                    <div>
                                                        <img src={cardImg1} alt="" />
                                                    </div>
                                                    <div>
                                                        <p className='project_name'>{item.project}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        }
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>



                    {/* Row 4 */}
                    <Row style={{ background: '#F1F1F1' }} >
                        <Col md={12} className='dash1-wrap2' style={{ marginBottom: '100px' }} >
                            <div className="report">
                                <div className='report-text'>
                                    <h5>Reports</h5>
                                    <button style={{ cursor: 'context-menu' }} >More Reports</button>
                                </div>

                                <div className='report-container'>
                                    <div className="report1">
                                        {/*  <p>Budget vs Actual Detail by Employee</p>
                                        <img src={gruop} alt="" />
                                        */}
                                        <p>Total Vs Hold Timesheet</p>
                                        <PaiChartForReport data={paiDataForTotalTimesheetAndHold} />
                                    </div>
                                    <div className="report1">
                                        {/* <p>Budget vs Actual Detail Summary</p>
                                        <img src={gruop1} alt="" /> */}
                                        <p>Total Vs Submited Timesheet</p>
                                        <PaiChartForReport data={paiDataForTotalTimesheetAndSubmited} />
                                    </div>
                                    <div className="report1">
                                        {/* <p>OverTime Report</p>
                                        <img src={gruop2} alt="" /> */}
                                        <p>Total Vs Aproved Timesheet</p>
                                        <PaiChartForReport data={paiDataForTotalTimesheetAndAproved} />
                                    </div>
                                    <div className="report1">
                                        {/* <p>Timesheet Status</p>
                                        <img src={gruop3} alt="" /> */}
                                        <p>Hold Vs Submited Timesheet</p>
                                        <PaiChartForReport data={paiDataForHoldTimesheetAndSubmited} />
                                    </div>
                                    <div className="report1">
                                        {/* <p>Print Timesheets</p>
                                        <img src={gruop4} alt="" /> */}
                                        <p>Submited Vs Approved Timesheet</p>
                                        <PaiChartForReport data={paiDataForSubmitedTimesheetAndAproved} />
                                    </div>
                                </div>
                            </div>


                            <div className='timesheet_container'>
                                <div className="timesheet">
                                    <div className='timesheet1'>
                                        <img className='img-fluid' src={timesheet1} alt="" />
                                        <p>Timesheets</p>
                                        <span>Pending Download </span>
                                    </div>
                                    <div className='timesheet2'>
                                        <img className='img-fluid' src={timesheet2} alt="" />
                                        <p>Expense</p>
                                        <span>Pending Download </span>
                                    </div>

                                </div>
                            </div>
                        </Col>
                    </Row>

                </div>
            </Container>
        </AdminLayout>
    )
}

export default AdminDashboardV2
