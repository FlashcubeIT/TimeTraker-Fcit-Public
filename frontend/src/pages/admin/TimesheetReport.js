import React, { useEffect, useState, useContext } from 'react'
import Excel from './Excel'
import Filter from './Filter'
import Pdf from './Pdf'
import Csv from './Csv'
import axios from 'axios'
import Form from "react-bootstrap/Form";
import './TimesheetReport.css'
import AdminLayout from "../../hoc/AdminLayout";
import { MyContext } from '../../context/MyProvider'
import { Col, Container, Row } from "react-bootstrap";
import signupImg1 from "../../img/Vector.png"
import signupImg2 from "../../img/user2.png"
import { Grid } from '@mui/material'
import ReportTimesheetTable from '../../components/ReportTimesheetTable'
import { useNavigate } from 'react-router-dom'


const TimesheetReport = () => {


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



  const navigate = useNavigate()



  const [allUserTimesheetInfo, setAllUserTimesheetInfo] = useState()

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

  const [allUser, setAllUser] = useState([]);
  const [allManager, setAllManager] = useState([]);
  const [allSubAdmin, setAllSubAdmin] = useState([]);
  const [companyName, setCompanyName] = useState('');





  // get all user Timesheet

  const getAllUserTimesheet = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/all-timesheet-report/?companyID=${companyID}`, config)
      setAllUserTimesheetInfo(data.timesheets)
    } catch (error) {
      console.log(error)
    }
  }

  // let allTheEmployee = []

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






  // this is all timesheet map code        // starts from here 
  const userNameWithHours = {};

  allUserTimesheetInfo? allUserTimesheetInfo.forEach(item => {
    // item.dynamicData
    const UserName = item.UserName
    const Hours = item.Hours
    if (userNameWithHours[UserName]) {
      userNameWithHours[UserName] += Hours;
    } else {
      userNameWithHours[UserName] = Hours;
    }



  }) : console.log("na")

  const newArray = Object.entries(userNameWithHours).map(([UserName, Hours]) => ({
    UserName,
    Hours: Hours?.toString(),
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
      const { data } = await axios.post(`http://localhost:8000/api/filtered-timesheet-report/?companyID=${companyID}`, filterFormData, config)
      setAllUserTimesheetInfo(data.timesheets)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getAllUserTimesheet()
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
        <Container fluid className="dash3" style={{ padding: "0", minHeight: '100vh' }}>
          {/* Row 1 */}
          <Row  >
            <Col className='task-container' >
              <div className="hamburgar" style={sideBarStatus ? { display: 'none' } : { display: 'block' }}>
                <i onClick={handleClick} className='fas fa-bars'></i>
              </div>
              <div className="task-top">
                <div className="task-header1">
                  <h5 style={
                    sideBarStatus == true
                      ? { paddingLeft: "10px", paddingTop: "2px" }
                      : { paddingTop: "4px" }
                  } >Timesheet Report</h5>
                </div>

                <div className="task-header2">
                  <abbr title='?'><img src={signupImg1} alt="" /></abbr>
                  <abbr title='Profile'><img onClick={() => { navigate("/profile") }} src={signupImg2} alt="" /></abbr>
                </div>
              </div>
            </Col>
          </Row>
          <div style={{ padding: '20px' }}>
            <Grid container>
              <Grid className='left_grid' item xs={12} lg={5}>
                <div>
                  <p className='left_box_heading'>Excel and CSV Export Fields</p>
                  <Filter allUserTimesheetInfo={allUserTimesheetInfo} />
                </div>
                <div style={{ marginTop: '30px' }} className='left_box_buttons'>
                  <Excel companyName={companyName} />
                  <Pdf companyName={companyName} />
                  <Csv companyName={companyName} />
                </div>
              </Grid>
              <Grid className='right_grid' item xs={12} lg={6.5}>

                <form style={{ height: '100%' }} onSubmit={handleSubmit}>
                  <div style={{ height: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }} >
                    <div>
                      <p className='left_box_heading'>Filter</p>


                      {/* date  */}





                      {/* end  */}


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
                          <label style={{ cursor: 'pointer' }} className='lable_bold' htmlFor="">Employe</label>
                          <Form.Select
                            style={{ cursor: 'pointer' }}
                            className="area"
                            name="userName"
                            aria-label="Default select example"
                            onChange={handleChange}
                          >
                            <option value=''>
                              Select
                            </option>
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
                            <option value=''>
                              Select
                            </option>
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
                            <option value=''>
                              Select
                            </option>
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
                            <option value=''>
                              Select
                            </option>
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
                            <option value=''>
                              Select
                            </option>
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
                            <option value=''>
                              Select
                            </option>
                            <option  >
                              Yes
                            </option>
                            <option  >
                              No
                            </option>
                          </Form.Select>
                        </Grid>
                      </Grid>
                    </div>
                    <div className='right_button'>
                      <button style={{ padding: "0px 40px" }} className="csv_button">Filter</button>
                    </div>
                  </div>

                </form>
              </Grid>
            </Grid>


            <ReportTimesheetTable newArray={newArray} />

          </div>


        </Container>
      </div>
    </AdminLayout>
  )
}

export default TimesheetReport
