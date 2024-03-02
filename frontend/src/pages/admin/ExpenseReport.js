import React, { useEffect, useState, useContext } from 'react'
import ExpenseExcel from './ExpenseExcel'
import ExpenseCsv from './ExpenseCsv'
import ExpensePdf from './ExpensePDF'
import ExpenseFilter from './ExpenseFilter'
import axios from 'axios'
import Form from "react-bootstrap/Form";
import './TimesheetReport.css'
import AdminLayout from "../../hoc/AdminLayout";
import { MyContext } from '../../context/MyProvider'
import { Col, Container, Row } from "react-bootstrap";
import signupImg1 from "../../img/Vector.png"
import signupImg2 from "../../img/user2.png"
import { Grid } from '@mui/material'
import ReportExpenseTable from '../../components/ReportExpenseTable'
import { useNavigate } from 'react-router-dom'

const ExpenseReport = () => {


  const { sideBarStatus, setSideBarStatus } = useContext(MyContext);

  const handleClick = () => {
    if (sideBarStatus == true) {
      setSideBarStatus(false)
    } else {
      setSideBarStatus(true)
    }
  }


  const screenWidth = window.innerWidth;
  if (screenWidth >= 840) {
    var forPhoneScreenNoDisplay = true
  } else {
    var forPhoneScreenNoDisplay = false
  }



  const [allUserExpenseInfo, setAllUserExpenseInfo] = useState()

  const adminloginInfo = JSON.parse(localStorage.getItem('adminLoginInfo'));
  const userLoginInfo = JSON.parse(localStorage.getItem('userLoginInfo'));


  if (adminloginInfo) {
    var companyID = adminloginInfo._id
    var token = adminloginInfo?.token
  }
  else if (userLoginInfo) {
    var companyID = userLoginInfo.companyID
    var token = adminloginInfo?.token
  }

  // config 

  const config = {
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }


  const navigate = useNavigate()

  const [allUser, setAllUser] = useState([]);
  const [allManager, setAllManager] = useState([]);
  const [allSubAdmin, setAllSubAdmin] = useState([]);
  const [companyName, setCompanyName] = useState('');







  const getAllUserExpense = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/all-expense-report/?companyID=${companyID}`, config)
      console.log("data.expenses====>", data.expenses)
      setAllUserExpenseInfo(data.expenses)
    } catch (error) {
      console.log(error)
    }
  }


  const getAllUser = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/all-users/?companyID=${companyID}`, config)
      // allTheEmployee.push(...data.allUsers)

      setAllUser(data.allUsers)
    } catch (error) {
      console.log("error from get all user api", error)
    }
  }


  const getAllManager = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/all-manager/?companyID=${companyID}`, config)
      // allTheEmployee.push(...data.allManager)
      setAllManager(data.allManager)
    } catch (error) {
      console.log("error from get all user api", error)
    }
  }

  const getAllSubAdmin = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/all-sub-asmin/?companyID=${companyID}`, config)
      // allTheEmployee.push(...data.allSubAdmin)
      setAllSubAdmin(data.allSubAdmin)
    } catch (error) {
      console.log("error from get all user api", error)
    }
  }


  // this is all timesheet map code        // starts from here 
  const userNameWithAmount = {};

  allUserExpenseInfo ? allUserExpenseInfo.forEach(item => {
    // item.dynamicData
    const UserName = item.UserName
    const Amount = item.Amount
    if (userNameWithAmount[UserName]) {
      userNameWithAmount[UserName] += Amount;
    } else {
      userNameWithAmount[UserName] = Amount;
    }



  }) : console.log("na")

  const newArray = Object.entries(userNameWithAmount).map(([UserName, Amount]) => ({
    UserName,
    Amount: Amount.toString(),
  }));

  newArray.sort((a, b) => a.UserName.localeCompare(a.UserName));


  // filter

  const [projectInfo, setProjectInfo] = useState([]);
  const [taskInfo, setTaskInfo] = useState([]);

  // get all project

  const getAllProject = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/all-project/?companyID=${companyID}`,
        config
      );
      setProjectInfo(data.projects);
    } catch (error) {
      console.log('error', error)
    }
  };

  // get all task

  const getAllTask = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/all-task/?companyID=${companyID}`,
        config
      );
      setTaskInfo(data.tasks);
    } catch (error) {
      console.log('error', error)
    }
  };


  const [filterFormData, setFilterFormData] = useState({
    companyID: companyID
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`http://localhost:8000/api/filtered-expense-report/?companyID=${companyID}`, filterFormData, config)
      setAllUserExpenseInfo(data.expenses)
    } catch (error) {
      console.log(error)
    }
  }
  const getCompanyName = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/company-name/?companyID=${companyID}`, config)
      // allTheEmployee.push(...data.allSubAdmin)
      console.log("company", data)
      setCompanyName(data.company.name)
    } catch (error) {
      console.log("error from get all user api", error)
    }
  }


  useEffect(() => {
    getAllUserExpense()
    getAllTask()
    getAllProject()
    getAllSubAdmin()
    getAllManager()
    getAllUser()
    getCompanyName()
    if (!forPhoneScreenNoDisplay) {
      setSideBarStatus(false)
    }
  }, [])

  return (
    <AdminLayout>
      
      <div className={sideBarStatus ? 'content_right_dashboard' : "none"} fluid style={sideBarStatus == true & forPhoneScreenNoDisplay == false ? { display: 'none' } : { display: 'block' }}>
        <Container fluid className="dash3" style={{ padding: "0" }}>
          {/* Row 1 */}
          <Row>
            <Col className='task-container' >
              <div className="hamburgar" style={sideBarStatus ? { display: 'none' } : { display: 'block' }}>
                <i onClick={handleClick} className='fas fa-bars'></i>
              </div>
              <div className="task-top">
                <div className="task-header1">
                  <h5 style={
                    sideBarStatus == true
                      ? { paddingLeft: "10px", paddingTop: "2px" }
                      : { paddingLeft: "60px", paddingTop: "4px" }
                  } >Expense Report</h5>
                </div>

                <div className="task-header2">
                  <abbr title='?' ><img src={signupImg1} alt="" /></abbr>
                  <abbr title='Profile' ><img onClick={() => { navigate("/profile") }} src={signupImg2} alt="" /></abbr>
                </div>
              </div>
            </Col>
          </Row>
          <div style={{ padding: '20px' }}>
            <Grid container>

              <Grid className='left_grid' item xs={12} lg={5}>
                <div>
                  <p className='left_box_heading'>Excel and CSV Export Fields</p>
                  <ExpenseFilter allUserExpenseInfo={allUserExpenseInfo} />
                </div>
                <div style={{ flexWrap: 'wrap' }} className='left_box_buttons'>
                  <ExpenseExcel companyName={companyName} />
                  <ExpensePdf companyName={companyName} />
                  <ExpenseCsv companyName={companyName} />
                </div>
              </Grid>

              <Grid className='right_grid' item xs={12} lg={6.5}>

                <form onSubmit={handleSubmit}>
                  <p className='left_box_heading'>Filter</p>
                  <Grid container>
                    <Grid item xs={12} md={6} lg={6} className='right_selact'>
                      <div className='date_duration'>
                        <label className='lable_bold' htmlFor="">Starting Date</label>
                        <input style={{ cursor: 'pointer' }} className='date' name='startDate' onChange={handleChange} type='date' />
                      </div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} className='right_selact'>
                      <div className='date_duration'>
                        <label className='lable_bold' htmlFor="">Ending Date</label>
                        <input style={{ cursor: 'pointer' }} className='date' name='endDate' onChange={handleChange} type='date' />
                      </div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} className='right_selact'>
                      <label className='lable_bold' htmlFor="">Employe</label>
                      <Form.Select
                        style={{ cursor: 'pointer' }}
                        className="area"
                        name="userName"
                        aria-label="Default select example"
                        onChange={handleChange}
                      >
                        <option value=''>Select</option>
                        {allSubAdmin &&
                          allSubAdmin.map((item, index) => {
                            return (
                              <option key={index} value={item.name}>
                                {item.name}
                              </option>
                            );
                          })}
                        {allManager &&
                          allManager.map((item, index) => {
                            return (
                              <option key={index} value={item.name}>
                                {item.name}
                              </option>
                            );
                          })}
                        {allUser &&
                          allUser.map((item, index) => {
                            return (
                              <option key={index} value={item.name}>
                                {item.name}
                              </option>
                            );
                          })}
                      </Form.Select>
                    </Grid>


                    <Grid item xs={12} md={6} lg={6} className='right_selact'>
                      <label className='lable_bold' htmlFor="">Project</label>
                      <Form.Select
                        style={{ cursor: 'pointer' }}
                        className="area"
                        name="project"
                        aria-label="Default select example"

                        onChange={handleChange}
                      >
                        <option value=''>Select</option>
                        {projectInfo &&
                          projectInfo.map((item, index) => {
                            return (
                              <option key={index} value={item.project}>
                                {item.project}
                              </option>
                            );
                          })}
                      </Form.Select>
                    </Grid>


                    <Grid item xs={12} md={6} lg={6} className='right_selact'>
                      <label className='lable_bold' htmlFor="">Task</label>
                      <Form.Select
                        style={{ cursor: 'pointer' }}
                        className="area"
                        name="task"
                        aria-label="Default select example"

                        onChange={handleChange}
                      >
                        <option value=''>Select</option>
                        {taskInfo &&
                          taskInfo.map((item, index) => {
                            return (
                              <option key={index} value={item.task}>
                                {item.task}
                              </option>
                            );
                          })}
                      </Form.Select>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} className='right_selact'>
                      <label className='lable_bold' htmlFor="">Billable</label>
                      <Form.Select
                        style={{ cursor: 'pointer' }}
                        className="area"
                        name="task"
                        aria-label="Default select example"

                      >
                        <option value=''>Select</option>
                        <option  >
                          Yes
                        </option>
                        <option  >
                          No
                        </option>
                      </Form.Select>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} className='right_selact'>
                      <label className='lable_bold' htmlFor="">Approved</label>
                      <Form.Select
                        style={{ cursor: 'pointer' }}
                        className="area"
                        name="task"
                        aria-label="Default select example"

                      >
                        <option value=''>Select</option>
                        <option  >
                          Yes
                        </option>
                        <option  >
                          No
                        </option>
                      </Form.Select>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} className='right_selact'>
                      <label className='lable_bold' htmlFor="">Taxable</label>
                      <Form.Select
                        style={{ cursor: 'pointer' }}
                        className="area"
                        name="task"
                        aria-label="Default select example"

                      >
                        <option value=''>Select</option>
                        <option  >
                          Yes
                        </option>
                        <option  >
                          No
                        </option>
                      </Form.Select>
                    </Grid>
                  </Grid>
                  <div className='right_button'>
                    <button style={{ padding: "0px 40px" }} className="csv_button">Filter</button>
                  </div>
                </form>
              </Grid>
            </Grid>


            <ReportExpenseTable newArray={newArray} />

          </div>

        </Container>
      </div>
    </AdminLayout>
  )
}

export default ExpenseReport
