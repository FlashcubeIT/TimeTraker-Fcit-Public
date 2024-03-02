import React, { useState, useEffect, useContext } from "react";
import AdminLayout from "../../hoc/AdminLayout";
import { useNavigate } from "react-router-dom";
import './AdminWeeklyTimesheet.css'
// import { Col, Container, Row } from "react-bootstrap";
import signupImg1 from "../../img/Vector.png";
import signupImg2 from "../../img/user2.png";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { Col, Container, Row } from "react-bootstrap";
import UserTimeSheetTable from "../../components/UserTimeSheetTable";
import { MyContext } from '../../context/MyProvider'
import UserPdf from "./UserPdf";
import UserExcel from "./UserExcel";
import UserCsv from "./UserCsv";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { ToastContainer, toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const AdminWeeklyTimesheet = () => {


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




  const [newTimesheetData, setNewTimesheetData] = useState();
  const [userTimesheetInfo, setUserTimesheetInfo] = useState([]);
  const getThisWeekDates = () => {
    const today = new Date();
    const currDate = today.getDate();
    const currDay = today.getDay();

    console.log("currDate", currDate)
    console.log("currDay", currDay)

    // Calculate the start date of the week (Sunday)
    const startDate = new Date(today);
    startDate.setDate(currDate - currDay);

    const dates = [];

    // Push the dates of the week into the 'dates' array
    for (let i = 0; i < 7; i++) {
      const tempDate = new Date(startDate);
      tempDate.setDate(startDate.getDate() + i);
      dates.push(tempDate.toDateString()); // You can format this date as needed
    }


    return dates;
  };

  const [thisWeekDates, setThisWeekDates] = useState(getThisWeekDates())
  const [projectInfo, setProjectInfo] = useState([]);
  const [weeklytimesheetData, setWeeklytimesheetData] = useState([]);
  const [taskInfo, setTaskInfo] = useState([]);
  const [project1, setProject1] = useState("");
  const [project2, setProject2] = useState("");
  const [project3, setProject3] = useState("");
  const [project4, setProject4] = useState("");
  const [project5, setProject5] = useState("");
  const [isBillable1, setIsBillable1] = useState(true);
  const [isBillable2, setIsBillable2] = useState(true);
  const [isBillable3, setIsBillable3] = useState(true);
  const [isBillable4, setIsBillable4] = useState(true);
  const [isBillable5, setIsBillable5] = useState(true);
  const [task1, setTask1] = useState("");
  const [task2, setTask2] = useState("");
  const [task3, setTask3] = useState("");
  const [task4, setTask4] = useState("");
  const [task5, setTask5] = useState("");



  console.log("task3", task3)





  const adminloginInfo = JSON.parse(localStorage.getItem("adminLoginInfo"));
  const userLoginInfo = JSON.parse(localStorage.getItem("userLoginInfo"));
  if (adminloginInfo) {
    var companyID = adminloginInfo?._id;
    var token = adminloginInfo?.token
    var userID = adminloginInfo._id;
    var userName = adminloginInfo.name;
  }
  if (userLoginInfo) {
    var companyID = userLoginInfo?.companyID;
    var token = userLoginInfo?.token
    var userID = userLoginInfo._id;
    var userName = userLoginInfo.name;
  }


  const config = {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`
    },
  };
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


  const [prviousCount, setPreviousCount] = useState(7)

  const getPreviousThisWeekDates = () => {
    // const today = new Date();
    // const currDate = today.getDate();
    // const currDay = today.getDay();

    // // Calculate the start date of the week (Sunday)
    // const startDate = new Date(today);
    // startDate.setDate(currDate - currDay);

    // const dates = [];

    // // Push the dates of the week into the 'dates' array
    // for (let i = 7; i > 0; i--) {
    //   const tempDate = new Date(startDate);
    //   tempDate.setDate(startDate.getDate() - i);
    //   dates.push(tempDate.toDateString()); // You can format this date as needed
    // }

    // return dates;

    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = today.getDate() - dayOfWeek;

    const lastSunday = new Date(today);
    lastSunday.setDate(diff - prviousCount);
    setPreviousCount(prviousCount + 7)

    const dates = [];

    for (let i = 0; i < 7; i++) {
      const tempDate = new Date(lastSunday);
      tempDate.setDate(lastSunday.getDate() + i);
      dates.push(tempDate.toDateString()); // You can format this date as needed
    }


    return dates;
  };

  const getNextWeekDates = () => {
    // const today = new Date();
    // const currDate = today.getDate();
    // const currDay = today.getDay();

    // // Calculate the start date of the week (Sunday)
    // const startDate = new Date(today);
    // startDate.setDate(currDate - currDay);

    // const dates = [];

    // // Push the dates of the week into the 'dates' array
    // for (let i = 7; i < 14; i++) {
    //   const tempDate = new Date(startDate);
    //   tempDate.setDate(startDate.getDate() + i);
    //   dates.push(tempDate.toDateString()); // You can format this date as needed
    // }

    // return dates;

    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = today.getDate() - dayOfWeek;

    const lastSunday = new Date(today);
    lastSunday.setDate(diff - prviousCount + 14);
    setPreviousCount(prviousCount - 7)

    const dates = [];

    for (let i = 0; i < 7; i++) {
      const tempDate = new Date(lastSunday);
      tempDate.setDate(lastSunday.getDate() + i);
      dates.push(tempDate.toDateString()); // You can format this date as needed
    }


    return dates;

  };



  const prevWeekTimesheet = () => {
    setThisWeekDates(getPreviousThisWeekDates())
  }
  const currentWeekTimesheet = () => {
    window.location.reload()
  }
  const nextWeekTimesheet = () => {
    setThisWeekDates(getNextWeekDates())
  }


  // const firstChange = {};

  // const firstChangeInfo = JSON.parse(localStorage.getItem('firstChange'));
  // console.log(firstChangeInfo)

  const handleChange = async (e) => {

    if (e.target.dataset.project == "" || e.target.dataset.task == "") {
      alert("Can't save this data. Please selact task and project");
    } else {
      const dateID = e.target.dataset.id;
      const project = e.target.dataset.project;
      const task = e.target.dataset.task;
      const name = e.target.name;
      const hours = e.target.value;
      const billable = e.target.dataset.billable


      // convert the date

      const convertDate = (dateString) => {
        const months = {
          Jan: "01",
          Feb: "02",
          Mar: "03",
          Apr: "04",
          May: "05",
          Jun: "06",
          Jul: "07",
          Aug: "08",
          Sep: "09",
          Oct: "10",
          Nov: "11",
          Dec: "12",
        };

        const dateParts = dateString.split(" ");
        const year = dateParts[3];
        const month = months[dateParts[1]];
        const day = dateParts[2];

        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
      };

      if (dateID) {
        var date = convertDate(dateID);
      }
      try {
        const { data } = await axios.post(
          `http://localhost:8000/api/create-timesheet-entry`,
          { date, name, project, task, hours, userID, companyID, userName, billable },
          config
        );
        if (data) {
          window.location.reload()
        }

      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChangeProject1 = (e) => {
    setProject1(e.target.value);
  };
  const handleChangeProject2 = (e) => {
    setProject2(e.target.value);
  };
  const handleChangeProject3 = (e) => {
    setProject3(e.target.value);
  };
  const handleChangeProject4 = (e) => {
    setProject4(e.target.value);
  };
  const handleChangeProject5 = (e) => {
    setProject5(e.target.value);
  };

  const handleChangeBillable1 = (e) => {
    setIsBillable1((current) => !current);
  };
  const handleChangeBillable2 = (e) => {
    setIsBillable2((current) => !current);
  };
  const handleChangeBillable3 = (e) => {
    setIsBillable3((current) => !current);
  };
  const handleChangeBillable4 = (e) => {
    setIsBillable4((current) => !current);
  };
  const handleChangeBillable5 = (e) => {
    setIsBillable5((current) => !current);
  };

  const handleChangeTask1 = (e) => {
    setTask1(e.target.value);
  };
  const handleChangeTask2 = (e) => {
    setTask2(e.target.value);
  };
  const handleChangeTask3 = (e) => {
    setTask3(e.target.value);
  };
  const handleChangeTask4 = (e) => {
    setTask4(e.target.value);
  };
  const handleChangeTask5 = (e) => {
    setTask5(e.target.value);
  };

  const getUserTimesheet = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/user-Timesheet/?userID=${userID}`,
        config
      );
      setUserTimesheetInfo(data.timesheets);
    } catch (error) {
      console.log("error from get user timesheet api ", error);
    }
  };


  const convertDate = (dateString) => {
    const months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };

    const dateParts = dateString.split(" ");
    const year = dateParts[3];
    const month = months[dateParts[1]];
    const day = dateParts[2];

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };


  const getWeeklyTimesheetData = async () => {
    setWeeklytimesheetData([])
    const startDate = convertDate(thisWeekDates[0])
    const endDate = convertDate(thisWeekDates[6])


    console.log(startDate, endDate)
    try {
      const { data } = await axios.post("http://localhost:8000/api/get-weekly-timesheet", { startDate, endDate, userID }, config)


      // for Hours
      const resultObject = data.timesheets.reduce((acc, item) => {
        acc[item.name] = item.hours;
        return acc;
      }, {});


      // for Project
      let resultObjectForProject = data.timesheets.reduce((acc, item) => {
        acc[item.name] = item.project;
        return acc;
      }, {});




      let newKeyValuesForProject = {
        "1": '',
        "2": '',
        "3": '',
        "4": "",
        "5": ""
      };

      resultObjectForProject = { ...newKeyValuesForProject, ...resultObjectForProject };





      for (const key in resultObjectForProject) {
        if (resultObjectForProject.hasOwnProperty(key)) {
          const lastDigit = key.match(/\d$/)[0]; // Extract the last digit from the key
          const value = resultObjectForProject[key];
          switch (lastDigit) {
            case '1':
              setProject1(value);
              break;
            case '2':
              setProject2(value);
              break;
            case '3':
              setProject3(value);
              break;
            case '4':
              setProject4(value);
              break;
            case '5':
              setProject5(value);
              break;
            default:
              break;
          }
        }
      }






      // for Task
      let resultObjectForTask = data.timesheets.reduce((acc, item) => {
        acc[item.name] = item.task;
        return acc;
      }, {});




      let newKeyValues = {
        "1": '',
        "2": '',
        "3": '',
        "4": "",
        "5": ""
      };

      resultObjectForTask = { ...newKeyValues, ...resultObjectForTask };




      for (const key in resultObjectForTask) {
        if (resultObjectForTask.hasOwnProperty(key)) {
          const lastDigit = key.match(/\d$/)[0]; // Extract the last digit from the key
          const value = resultObjectForTask[key];
          switch (lastDigit) {
            case '1':
              setTask1(value);
              break;
            case '2':
              setTask2(value);
              break;
            case '3':
              setTask3(value);
              break;
            case '4':
              setTask4(value);
              break;
            case '5':
              setTask5(value);
              break;
            default:
              setTask1("");
              setTask2("");
              setTask3("");
              setTask4("");
              setTask5("");
              break;
          }
        }
      }


      setWeeklytimesheetData(resultObject)

    } catch (error) {
      console.log(error)
    }
  }

  const deleteWeeklyTimesheetData = async () => {
    try {
      const startDate = thisWeekDates[0]
      const endDate = thisWeekDates[6]
      console.log(startDate, endDate)
      const { data } = await axios.post("http://localhost:8000/api/delete-weekly-timesheet", { startDate, endDate, userID }, config)
      if (data) {
        setNewTimesheetData(data);
      }

    } catch (error) {
      console.log(error)
    }
  }

  const submitWeeklyTimesheetData = async () => {
    try {
      const startDate = thisWeekDates[0]
      const endDate = thisWeekDates[6]
      console.log(startDate, endDate)
      const { data } = await axios.post("http://localhost:8000/api/submit-weekly-timesheet", { startDate, endDate, userID }, config)
      if (data) {
        setNewTimesheetData(data);
      }
    } catch (error) {
      console.log(error)
    }
  }


  const navigate = useNavigate();


  useEffect(() => {
    getAllProject();
    getAllTask();
    getUserTimesheet();
    getWeeklyTimesheetData()
    if (!forPhoneScreenNoDisplay) {
      setSideBarStatus(false)
    }
  }, []);

  useEffect(() => {

    getWeeklyTimesheetData()

  }, [thisWeekDates]);




  const handleDataFromChild = (data) => {
    setNewTimesheetData(data);
  };

  const [formDataForUserFilter, setFormDataForUserFilter] = useState({ userID: userID })


  // submitAllTimesheets

  const submitAllTimesheets = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/submitAll-timesheet/?userID=${userID}`,
        config
      );
      if (data) {
        setNewTimesheetData(data);
        TimesheetSubmitNotfy()
      }
    } catch (error) {
      console.log("error from submitAllTimesheets", error)
    }
  }



  const deleteAllTimesheets = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/deleteAll-timesheet/?userID=${userID}`,
        config
      );
      if (data) {
        setNewTimesheetData(data);
        TimesheetDeleteNotfy()
      }
    } catch (error) {
      console.log("error from submitAllTimesheets", error)
    }
  }




  const handleChangeForFilterForUser = async (e) => {
    const { name, value } = e.target;
    setFormDataForUserFilter((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }


  const [open2, setOpen2] = React.useState(false);


  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };





  const TimesheetAddNotfy = () => {
    toast.success('Your timesheet has been added', {
      position: 'top-right',
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };



  const TimesheetSubmitNotfy = () => {
    toast.success('Your timesheet has been submited', {
      position: 'top-right',
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };


  const TimesheetDeleteNotfy = () => {
    toast.success('Your timesheet has been deleted', {
      position: 'top-right',
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };


  useEffect(() => {
    const filterTimesheetForUser = async () => {

      try {
        const { data } = await axios.post(
          `http://localhost:8000/api/filter-user-timesheet`, { formDataForUserFilter },
          config
        );
        if (data) {
          setUserTimesheetInfo(data.filteredTimesheet);
        }
      } catch (error) {
        console.log("error from filteruserTimesheet", error)
      }
    }
    filterTimesheetForUser()
  }, [formDataForUserFilter])

  useEffect(() => {
    getUserTimesheet();
    getWeeklyTimesheetData()
  }, [newTimesheetData]);

  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    const getWeekByCalendar = () => {
      const today = startDate;
      const dayOfWeek = today.getDay();
      const diff = today.getDate() - dayOfWeek;

      const lastSunday = new Date(today);
      lastSunday.setDate(diff);

      const dates = [];

      for (let i = 0; i < 7; i++) {
        const tempDate = new Date(lastSunday);
        tempDate.setDate(lastSunday.getDate() + i);
        dates.push(tempDate.toDateString()); // You can format this date as needed
      }


      return dates;
    }
    setThisWeekDates(getWeekByCalendar())
  }, [startDate])







  return (
    <AdminLayout>


      < ToastContainer />


      <div
        className={sideBarStatus ? "content_right_dashboard" : "none"}
        fluid
        style={
          (sideBarStatus == true) & (forPhoneScreenNoDisplay == false)
            ? { display: "none" }
            : { display: "block" }
        }
      >

        {/* Row 1 */}
        <div
          className="hamburgar"
          style={sideBarStatus ? { display: "none" } : { display: "block" }}
        >
          <i onClick={handleClick} className="fas fa-bars"></i>
        </div>

        <Row>
          <Col md={12} className="dash-container2">
            <div className="header-top2">
              <div className="dash-header1">
                <h5
                  className=""
                  style={
                    sideBarStatus == true
                      ? { paddingLeft: "10px", marginTop: "5px" }
                      : { paddingLeft: "60px", marginTop: "5px" }
                  }
                >
                  My Timesheet
                </h5>
              </div>


              <div className="dash-header2"  >
                <i style={{ display: 'none' }} class="fa-solid fa-hourglass-end"></i>{" "}
                <span className="hours-tieims" style={{ display: 'none' }} > 06 Hr : 15 Min : 30 Sec</span>
                <abbr title="?" ><img src={signupImg1} alt="" /></abbr>
                <abbr title="Profile" ><img onClick={() => { navigate("/profile") }} src={signupImg2} alt="" /></abbr>
              </div>
            </div>
          </Col>
        </Row>

        <Row style={{ background: "#F1F1F1" }} className="mt-0">
          <Col>
            <div
              className="time"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                marginBottom: "20px"
              }}
            >


              <div className="text-time">
                <p
                  style={{ cursor: "pointer" }}
                  className="para1"
                  onClick={() => {
                    navigate("/my-time");
                  }}
                >
                  Day View
                </p>

                <p
                  style={{ backgroundColor: "#64E48E", cursor: "pointer" }}
                  className="para2"
                  onClick={() => {
                    navigate("/weekly-timesheet");
                  }}
                >
                  Week View
                </p>
                <p
                  style={{ cursor: "pointer" }}
                  className="para3"
                  onClick={() => {
                    navigate("/calendar-timesheet")
                  }}
                >
                  Calendar
                </p>
              </div>
            </div>
          </Col>
        </Row>



        <Row style={{ background: "#F1F1F1" }}>
          <Col className="weekly_buttons_parent" md={12}>
            <div className="button-container button-container-weekly-top">
              <button className='button-container-button' onClick={prevWeekTimesheet} style={{ cursor: "pointer" }}><i class="fa-solid fa-circle-left" style={{ color: "#04542c", fontSize: "20px" }}></i></button>
              <button className='button-container-button' onClick={currentWeekTimesheet} style={{ cursor: "pointer" }}>Current Week</button>
              <DatePicker style={{ cursor: "pointer" }} value="Choose Date" selected={startDate} onChange={(date) => setStartDate(date)} />
              <button className='button-container-button' onClick={nextWeekTimesheet} style={{ cursor: "pointer" }}><i class="fa-solid fa-circle-right" style={{ color: "#04542c", fontSize: "20px" }}></i></button>
            </div>
            <div style={{ justifyContent: 'center', marginRight: "30px" }} className="button-container">
              <button className='button-container-button' onClick={submitWeeklyTimesheetData} style={{ cursor: 'pointer' }} >Submit week</button>
              <button className='button-container-button' onClick={deleteWeeklyTimesheetData} style={{ cursor: 'pointer' }} >Delete week</button>
            </div>
          </Col>
        </Row>
        <div style={{ width: '100%', display: 'flex', justifyContent: "center", alignItems: 'center', marginBottom: "50px" }}>
          <div className="top-view">
            {/* <button onClick={navigateToDaily}>Daily view</button> */}
            <h1 style={{ textAlign: 'center' }} >Weekly Timesheet</h1>

            <div className="scroll_weelky_table" >
              <div style={{ display: "flex", width: '1087px', backgroundColor: "#80e6a2", }}>

                <div className="project-heading">
                  <p>Project</p>
                  <p>Task</p>
                  <p>Billable</p>
                </div>

                <ul
                  style={{
                    padding: '0px',
                    display: "flex",
                    listStyle: "none",
                    // Width: "40%",
                    height: "70px",
                    backgroundColor: "#80e6a2",
                    color: "#fff",
                    paddingTop: "10px"
                  }}
                >
                  {thisWeekDates.map((date, index) => {
                    const updatedweek = date.slice(0, -11);
                    const updatedDay = date.slice(4, -4);
                    return (
                      <li
                        style={{ margin: "0px 17px", fontSize: "12px", minWidth: '90px' }}
                        key={index}
                      >
                        {updatedweek}<br />
                        {updatedDay}
                      </li>
                    )
                  })}
                </ul>
              </div>
              <ul style={{ display: "flex", listStyle: "none", padding: '0', }}>
                {/* <label htmlFor="">Project</label> */}
                <Form.Select
                  value={project1}
                  style={{ Width: "200px", cursor: 'pointer' }}
                  aria-label="Default select example"
                  required
                  onChange={handleChangeProject1}
                >
                  <option value=''  >
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

                {/* <label htmlFor="">Task</label> */}
                <Form.Select style={{ cursor: 'pointer' }}
                  aria-label="Default select example"
                  value={task1}
                  required
                  onChange={handleChangeTask1}
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

                <div
                  className="weekly_billable"
                >
                  <input
                    onChange={handleChangeBillable1}
                    defaultChecked
                    type="checkbox"
                  />
                </div>

                {thisWeekDates.map((date, index) => {
                  const name = `${date}1`;

                  return (
                    <div>
                      <input

                        name={name}
                        defaultValue={weeklytimesheetData[name]}
                        className="input_time_weekly"
                        style={name.charAt(0) === "S" ? {
                          height: "40px",
                          margin: "0px 0px",
                          borderRadius: "none",
                          outline: "none",
                          background: "rgb(233 233 233)"
                        } : {
                          height: "40px",
                          margin: "0px 0px",
                          borderRadius: "none",
                          outline: "none",
                        }}
                        data-id={date}
                        data-project={project1}
                        data-task={task1}
                        data-billable={isBillable1}
                        onChange={handleChange}
                      />
                    </div>
                  );
                })}
              </ul>

              {/* 2 */}

              <ul style={{ display: "flex", listStyle: "none", padding: '0', }}>
                {/* <label htmlFor="">Project</label> */}
                <Form.Select
                  style={{ Width: "150px", borderLeft: "2px solid #717171", cursor: 'pointer' }}
                  aria-label="Default select example"
                  value={project2}
                  required
                  onChange={handleChangeProject2}
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

                {/* <label htmlFor="">Task</label> */}
                <Form.Select
                  style={{ cursor: 'pointer' }}
                  aria-label="Default select example"
                  value={task2}
                  required
                  onChange={handleChangeTask2}
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
                <div
                  className="weekly_billable"
                >
                  <input
                    onChange={handleChangeBillable2}
                    defaultChecked
                    type="checkbox"
                  />
                </div>
                {thisWeekDates.map((date, index) => {
                  const name = `${date}2`;
                  return (
                    <div>
                      <input
                        name={name}
                        defaultValue={weeklytimesheetData[name]}
                        className="input_time_weekly"
                        style={name.charAt(0) === "S" ? {
                          height: "40px",
                          margin: "0px 0px",
                          borderRadius: "none",
                          outline: "none",
                          background: "rgb(233 233 233)"
                        } : {
                          height: "40px",
                          margin: "0px 0px",
                          borderRadius: "none",
                          outline: "none",
                        }}
                        data-id={date}
                        data-project={project2}
                        data-task={task2}
                        data-billable={isBillable2}
                        onChange={handleChange}
                      />
                    </div>
                  );
                })}
              </ul>

              {/* 3  */}

              <ul style={{ display: "flex", listStyle: "none", padding: '0', }}>
                {/* <label htmlFor="">Project</label> */}
                <Form.Select
                  style={{ cursor: 'pointer' }}
                  // style={{ maxWidth: "200px" }}
                  aria-label="Default select example"
                  value={project3}
                  required
                  onChange={handleChangeProject3}
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

                {/* <label htmlFor="">Task</label> */}
                <Form.Select
                  style={{ cursor: 'pointer' }}
                  aria-label="Default select example"
                  value={task3}
                  required
                  onChange={handleChangeTask3}
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
                <div
                  className="weekly_billable"
                >
                  <input
                    onChange={handleChangeBillable3}
                    defaultChecked
                    type="checkbox"
                  />
                </div>
                {thisWeekDates.map((date, index) => {
                  const name = `${date}3`;
                  return (
                    <div>
                      <input
                        name={name}
                        defaultValue={weeklytimesheetData[name]}
                        className="input_time_weekly"
                        style={name.charAt(0) === "S" ? {
                          height: "40px",
                          margin: "0px 0px",
                          borderRadius: "none",
                          outline: "none",
                          background: "rgb(233 233 233)"
                        } : {
                          height: "40px",
                          margin: "0px 0px",
                          borderRadius: "none",
                          outline: "none",
                        }}
                        data-id={date}
                        data-project={project3}
                        data-task={task3}
                        data-billable={isBillable3}
                        onChange={handleChange}
                      />
                    </div>
                  );
                })}
              </ul>

              {/* 4 */}

              <ul style={{ display: "flex", listStyle: "none", padding: '0', }}>
                {/* <label htmlFor="">Project</label> */}
                <Form.Select
                  style={{ cursor: 'pointer' }}
                  // style={{ maxWidth: "200px" }}
                  aria-label="Default select example"
                  value={project4}
                  required
                  onChange={handleChangeProject4}
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

                {/* <label htmlFor="">Task</label> */}
                <Form.Select
                  style={{ cursor: 'pointer' }}
                  aria-label="Default select example"
                  value={task4}
                  required
                  onChange={handleChangeTask4}
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
                <div
                  className="weekly_billable"
                >
                  <input
                    onChange={handleChangeBillable4}
                    defaultChecked
                    type="checkbox"
                  />
                </div>
                {thisWeekDates.map((date, index) => {
                  const name = `${date}4`;
                  return (
                    <div>
                      <input
                        name={name}
                        defaultValue={weeklytimesheetData[name]}
                        className="input_time_weekly"
                        style={name.charAt(0) === "S" ? {
                          height: "40px",
                          margin: "0px 0px",
                          borderRadius: "none",
                          outline: "none",
                          background: "rgb(233 233 233)"
                        } : {
                          height: "40px",
                          margin: "0px 0px",
                          borderRadius: "none",
                          outline: "none",
                        }}
                        data-id={date}
                        data-project={project4}
                        data-task={task4}
                        data-billable={isBillable4}
                        onChange={handleChange}
                      />
                    </div>
                  );
                })}
              </ul>

              {/* 5  */}

              <ul style={{ display: "flex", listStyle: "none", padding: '0', }}>
                {/* <label htmlFor="">Project</label> */}
                <Form.Select
                  style={{ cursor: 'pointer' }}
                  // style={{ maxWidth: "200px" }}
                  aria-label="Default select example"
                  value={project5}
                  required
                  onChange={handleChangeProject5}
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

                {/* <label htmlFor="">Task</label> */}
                <Form.Select
                  style={{ cursor: 'pointer' }}
                  aria-label="Default select example"
                  value={task5}
                  required
                  onChange={handleChangeTask5}
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
                <div
                  className="weekly_billable"
                >
                  <input
                    onChange={handleChangeBillable5}
                    defaultChecked
                    type="checkbox"
                  />
                </div>
                {thisWeekDates.map((date, index) => {
                  const name = `${date}5`;
                  return (
                    <div>
                      <input
                        name={name}
                        defaultValue={weeklytimesheetData[name]}
                        className="input_time_weekly"
                        style={name.charAt(0) === "S" ? {
                          height: "40px",
                          margin: "0px 0px",
                          borderRadius: "none",
                          outline: "none",
                          background: "rgb(233 233 233)"
                        } : {
                          height: "40px",
                          margin: "0px 0px",
                          borderRadius: "none",
                          outline: "none",
                        }}
                        data-id={date}
                        data-project={project5}
                        data-task={task5}
                        data-billable={isBillable5}
                        onChange={handleChange}
                      />
                    </div>
                  );
                })}
              </ul>
            </div>
            <div className="weekly_table_end">

            </div>
          </div>
        </div>







        <Row style={{ background: "#F1F1F1" }}>
          <Col md={12}>
            <div className="time">
              <div className="text-time">
                {/* <input type="text" name="" id="" placeholder="Search" /> */}

                <Form className="input-menu" >
                  <Form.Select
                    className="input-menu-focus"
                    style={{ cursor: 'pointer' }}
                    name="project"
                    aria-label="Default select example"
                    onChange={handleChangeForFilterForUser}

                  >
                    <option value="">Project</option>
                    {projectInfo &&
                      projectInfo.map((item, index) => {
                        return (
                          <option key={index} value={item.project}>
                            {item.project}
                          </option>
                        );
                      })}
                  </Form.Select>

                  <Form.Select
                    className="input-menu-focus"
                    style={{ cursor: 'pointer' }}
                    name="task"
                    aria-label="Default select example"
                    onChange={handleChangeForFilterForUser}


                  >
                    <option value="">Task</option>
                    {taskInfo &&
                      taskInfo.map((item, index) => {
                        return (
                          <option key={index} value={item.task}>
                            {item.task}
                          </option>
                        );
                      })}
                  </Form.Select>

                  <Form.Select
                    className="input-menu-focus"
                    style={{ cursor: 'pointer' }}
                    name="state"
                    aria-label="Default select example"
                    onChange={handleChangeForFilterForUser}
                  >
                    <option value="">Status</option>
                    <option value="hold">Hold</option>
                    <option value="submited">Submitted</option>
                    <option value="aproved">Approved</option>
                  </Form.Select>
                </Form>
              </div>

              <div className="button-container">
                <button className='button-container-button' onClick={submitAllTimesheets} style={{ cursor: "pointer" }}>Submit All</button>
                <button className='button-container-button' onClick={handleClickOpen2} style={{ cursor: "pointer" }}>Print</button>
                <button className='button-container-button' onClick={deleteAllTimesheets} style={{ cursor: "pointer" }}>Delete All</button>
              </div>
            </div>
          </Col>
        </Row>
        <Row style={{ background: "#F1F1F1" }}>
          <Col>
            <div style={{ margin: "50px" }}>
              <UserTimeSheetTable
                userTimesheetInfo={userTimesheetInfo}
                handleDataFromChild={handleDataFromChild}
              />
            </div>
          </Col>
        </Row>



        <Dialog
          open={open2}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose2}
          aria-describedby="alert-dialog-slide-description"
        >
          <div style={{ padding: "50px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <h4 style={{ marginBottom: "40px" }}>Please choose the format</h4>
            <div style={{ marginBottom: "40px" }} className="button-container">
              <UserPdf className='button-container-button' userTimesheetInfo={userTimesheetInfo} />
              <UserExcel className='button-container-button' userTimesheetInfo={userTimesheetInfo} />
              <UserCsv className='button-container-button' userTimesheetInfo={userTimesheetInfo} />
            </div>
            <div className="button-container">
              <button className='button-container-button' onClick={handleClose2} style={{ cursor: "pointer", background: "rgb(100, 228, 142)", }}>Close</button>
            </div>
          </div>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminWeeklyTimesheet;