import React, { useState, useEffect, useContext } from "react";
import "./AdminDashboard.css";
import "./DialogStyle.css";
import { Col, Container, Row } from "react-bootstrap";
import signupImg1 from "../../img/Vector.png";
import signupImg2 from "../../img/user2.png";
import Form from "react-bootstrap/Form";
import UserTimeSheetTable from "../../components/UserTimeSheetTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../hoc/AdminLayout";
import { MyContext } from "../../context/MyProvider";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import UserPdf from "./UserPdf";
import ImportTimesheet from "../../components/ImportTimesheet";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserExcel from "./UserExcel";
import UserCsv from "./UserCsv";
// import TableDesign from "../components/TableDesign"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AdminDashboard = () => {
  const { sideBarStatus, setSideBarStatus } = useContext(MyContext);
  const [currentDate2, setCurrentDate2] = useState('');

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



  const adminloginInfo = JSON.parse(localStorage.getItem("adminLoginInfo"));
  const userLoginInfo = JSON.parse(localStorage.getItem("userLoginInfo"));
  if (adminloginInfo) {
    var companyID = adminloginInfo?._id;
    var userID = adminloginInfo?._id;
    var token = adminloginInfo?.token
  }

  if (userLoginInfo) {
    var companyID = userLoginInfo?.companyID;
    var userID = userLoginInfo?._id;
    var token = userLoginInfo?.token
  }


  const config = {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`
    },
  };

  const [formDataForUserFilter, setFormDataForUserFilter] = useState({ userID: userID })
  const [projectInfo, setProjectInfo] = useState([]);
  const [taskInfo, setTaskInfo] = useState([]);
  const [userTimesheetInfo, setUserTimesheetInfo] = useState([]);
  const [newTimesheetData, setNewTimesheetData] = useState();
  const [formData, setFormData] = useState({
    userID: userID,
    companyID: companyID,
    date: currentDate2
  });
  const [isBillable, setIsBillable] = useState(true);



  const handleChangeBillable = () => {
    setIsBillable((current) => !current);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let hours = formData.hours
    if (
      formData.task == "" ||
      formData.project == "" ||
      formData.hours == ""
    ) {
      alert("all the feilds required");
    } else {
      if (hours > 8) {
        var result = window.confirm("Are you sure you want to add more-then 8 hours.");
        if (result) {
          postTimesheetData();
        }
      }
      else if (hours < 1) {
        var result = window.confirm("Are you sure you want to add less-then 1 hour");
        if (result) {
          postTimesheetData();
        }
      } else {
        postTimesheetData();
      }

    }
  };

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

  // post Timesheet data

  const postTimesheetData = async () => {

    try {
      let date = currentDate2
      if (formData.date) {
        date = formData.date
      }

      const lastTimesheetData = {
        formData: formData,
        date: date,
        billable: isBillable
      }
      localStorage.setItem('lastTimesheet', JSON.stringify(lastTimesheetData));


      const { data } = await axios.post(
        `http://localhost:8000/api/create-timesheet-entry`,
        {
          userID: formData.userID,
          companyID: formData.companyID,
          task: formData.task,
          project: formData.project,
          hours: formData.hours,
          name: formData.name,
          date: date,
          userName: formData.userName,
          billable: isBillable,
          description: formData.description
        },
        config
      );
      setNewTimesheetData(data);
      setFormData({
        task: "",
        project: "",
        hours: "",
        description: "",
        userID: formData.userID,
        companyID: formData.companyID,
        billable: true,
      })
      TimesheetAddNotfy()
    } catch (error) {
      console.log("error from post timesheet api", error);
    }
  };


  // repeat Timesheet Data 

  const repeatTimesheet = async () => {
    const lastTimesheet = JSON.parse(localStorage.getItem("lastTimesheet"));
    console.log("lastTimesheet", lastTimesheet)
    try {
      let date = currentDate2
      if (formData.date) {
        date = formData.date
      }

      const { data } = await axios.post(
        `http://localhost:8000/api/create-timesheet-entry`,
        {
          userID: lastTimesheet.formData.userID,
          companyID: lastTimesheet.formData.companyID,
          task: lastTimesheet.formData.task,
          project: lastTimesheet.formData.project,
          hours: lastTimesheet.formData.hours,
          name: lastTimesheet.formData.name,
          date: lastTimesheet.date,
          userName: lastTimesheet.formData.userName,
          billable: lastTimesheet.isBillable,
          description: lastTimesheet.formData.description
        },
        config
      );
      setNewTimesheetData(data);
      TimesheetAddNotfy()
    } catch (error) {
      console.log("error from post timesheet api", error);
      alert("facing some error when repeat your Timesheet please enter manually")
    }
  }


  // get all the timesheets of this user

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

  const navigate = useNavigate();

  useEffect(() => {
    getAllTask();
    getAllProject();
    getUserTimesheet();
    if (!forPhoneScreenNoDisplay) {
      setSideBarStatus(false);
    }
  }, []);

  useEffect(() => {
    getUserTimesheet();
  }, [newTimesheetData]);

  // timer

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const [timerRunning, setTimerRunning] = useState("initialStop");
  const [seconds, setSeconds] = useState(0);

  // Load timer state from local storage on component mount
  useEffect(() => {
    const storedTimerState = JSON.parse(localStorage.getItem("timerState"));

    if (storedTimerState) {
      setSeconds(storedTimerState.seconds);
      setTimerRunning(storedTimerState.timerRunning);
    }
  }, []);

  // Save timer state to local storage on state change
  useEffect(() => {
    localStorage.setItem(
      "timerState",
      JSON.stringify({ seconds, timerRunning })
    );
  }, [seconds, timerRunning]);

  // Effect to handle the case where the timer was running when the page was closed
  useEffect(() => {
    if (timerRunning == "started") {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timerRunning]);

  const onlyPauseTimer = () => {
    if (timerRunning == "started") {
      setTimerRunning("stoped")
    }
  };
  const onlyResumeTimer = () => {
    if (timerRunning == "stoped") {
      setTimerRunning("started")
    }
  };
  const onlyStartTimer = () => {
    if (timerRunning == "initialStop") {
      setTimerRunning("started")
    }
  }
  const onlyStopTimer = () => {
    setTimerRunning("stoped")
    handleClickOpen()
  }
  const resetTimer = () => {
    setSeconds(0);
    setTimerRunning("initialStop");
    handleClose()
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const remainingSeconds = timeInSeconds % 60;
    return `${hours} Hr : ${minutes < 10 ? "0" : ""}${minutes} Min : ${remainingSeconds < 10 ? "0" : ""
      }${remainingSeconds} Sec`;
  };

  var formattedTime = 0.0;
  const formatTime2 = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);

    // Ensure the decimal part has two digits
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    // Combine hours and formatted minutes
    formattedTime = `${hours}.${formattedMinutes}`;

    return formattedTime;
  };

  const currentDate = new Date();

  // Get the individual components of the date
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");

  // Create the formatted date string
  const formattedDate = `${year}-${month}-${day}`;

  const [formData1, setFormData1] = useState({
    userID: userID,
    companyID: companyID,
    date: formattedDate,
    hours: "",
    project: "",
    task: ""
  });

  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setFormData1((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();
    console.log("formData1", formData1)
    let hours = formatTime2(seconds)
    if (
      formData1.task == "" ||
      formData1.project == ""
    ) {
      alert("all the feilds required");
    } else {
      if (hours >= 0.001) {
        handleClose()
        postTimesheetData1(hours);
      } else {
        var result = window.confirm("Your have entered lessthen 1 minute. So by default it will take 1 minute entry. Are you want to continue?");
        if (result) {
          hours = 0.001
          postTimesheetData1(hours);
        } else {
          handleClose()
          setFormData1({
            userID: formData1.userID,
            companyID: formData1.companyID,
            date: formattedDate,
            hours: formatTime2(seconds),
            project: "",
            task: "",
            description: ""
          })
        }
      }
    }
  };

  const postTimesheetData1 = async (hours) => {
    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/create-timesheet-entry`,
        {
          userID: formData1.userID,
          companyID: formData1.companyID,
          date: formData1.date,
          task: formData1.task,
          project: formData1.project,
          description: formData1.description,
          hours: hours,
        },
        config
      );
      if (data) {
        setNewTimesheetData(data);
        TimesheetAddNotfy()
        resetTimer()
        setFormData1({
          userID: formData1.userID,
          companyID: formData1.companyID,
          date: formattedDate,
          project: "",
          task: "",
          description: ""
        })
      }
    } catch (error) {
      console.log("error from post timesheet api", error);
    }
  };

  const handleDataFromChild = (data) => {
    // Do something with the data in the parent component
    setNewTimesheetData(data);
  };

  const makeTheFeildsEmpty = () => {
    setFormData({
      hours: "",
      date: "",
      description: "",
      project: "",
      task: "",
      isBillable: true

    })
  }



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
    // Update the state with the current date when the component mounts
    const formattedDate = new Date().toISOString().split('T')[0];
    setCurrentDate2(formattedDate);
  }, []);

  return (


    <AdminLayout>
      <ToastContainer />
      <div
        className={sideBarStatus ? "content_right_dashboard" : "none"}
        fluid
        style={
          (sideBarStatus == true) & (forPhoneScreenNoDisplay == false)
            ? { display: "none" }
            : { display: "block" }
        }
      >
        <Container fluid className="dash3" style={{ padding: "0" }}>
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
                        ? { paddingLeft: "10px" }
                        : { paddingLeft: "60px" }
                    }
                  >
                    My Timesheet
                  </h5>
                </div>



                <div className="start_timer_parent">
                  <div style={timerRunning == "initialStop" ? { display: "flex" } : { display: "none" }} onClick={onlyStartTimer} className="header-icon">
                    <p style={{ cursor: "pointer" }}>
                      <i class="fa-sharp fa-solid fa-play"></i>
                      <span>Start Timer</span>
                    </p>
                  </div>
                  <div style={timerRunning != "initialStop" ? { display: "flex" } : { display: "none" }} onClick={onlyStopTimer} className="header-icon">
                    <p style={{ cursor: "pointer" }}>
                      <i class="fa-solid fa-stop"></i>
                      <span>Stop Timer</span>
                    </p>
                  </div>
                  <div style={timerRunning == "initialStop" || timerRunning == "started" ? { display: "flex" } : { display: "none" }} onClick={onlyPauseTimer} className="header-icon">
                    <p style={{ cursor: "pointer" }}>

                      <i class="fa-solid fa-pause"></i>
                      <span>Pause Timer</span>
                    </p>
                  </div>
                  <div style={timerRunning == "stoped" ? { display: "flex" } : { display: "none" }} onClick={onlyResumeTimer} className="header-icon">
                    <p style={{ cursor: "pointer" }}>
                      <i class="fa-sharp fa-solid fa-play"></i>
                      <span>Resume Timer</span>
                    </p>
                  </div>
                </div>

                <div
                  className="dash-header2"
                  style={{ cursor: "context-menu", marginBottom: "10px" }}
                >
                  <i class="fa-solid fa-hourglass-end"></i>{" "}
                  <span className="hours-tieims"> {formatTime(seconds)}</span>
                  <abbr title=" ? ">
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

          <Row className="mt-4 timer-second-container">
            <Col>
              <div className="timer-second">
                <div style={timerRunning == "initialStop" ? { display: "flex" } : { display: "none" }} onClick={onlyStartTimer} className="header-icon">
                  <p style={{ cursor: "pointer" }}>
                    <i class="fa-sharp fa-solid fa-play"></i>
                  </p>
                </div>
                <div style={timerRunning != "initialStop" ? { display: "flex" } : { display: "none" }} onClick={onlyStopTimer} className="header-icon">
                  <p style={{ cursor: "pointer" }}>
                    <i class="fa-solid fa-stop"></i>
                  </p>
                </div>
                <div style={timerRunning == "initialStop" || timerRunning == "started" ? { display: "flex" } : { display: "none" }} onClick={onlyPauseTimer} className="header-icon">
                  <p style={{ cursor: "pointer" }}>

                    <i class="fa-solid fa-pause"></i>
                  </p>
                </div>
                <div style={timerRunning == "stoped" ? { display: "flex" } : { display: "none" }} onClick={onlyResumeTimer} className="header-icon">
                  <p style={{ cursor: "pointer" }}>
                    <i class="fa-sharp fa-solid fa-play"></i>
                  </p>
                </div>

                <div className="second" style={{ paddingTop: "10px" }}>

                  <i
                    style={{ color: "#04542C" }}
                    class="fa-solid fa-hourglass-end"
                  ></i>{" "}
                  <span style={{ color: "#04542C", fontSize: " 15px" }}>
                    {" "}
                    {formatTime(seconds)}
                  </span>
                </div>
              </div>
            </Col>
          </Row>

          {/* Row 2 */}
          <Row style={{ background: "#F1F1F1" }} className="mt-0">
            <Col>
              <div
                className="time"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                {/* <div className="time-div1">
                  <div>
                    <i className="fa-sharp fa-solid fa-angle-left time1"></i>
                  </div>

                  <div className="middle-text">
                    <span>
                      00.00 &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      00.00 &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      00.00 &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      00.00 &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      00.00 &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      00.00 &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      00.00
                    </span>
                    <p>
                      <span>
                        {" "}
                        Oct 14 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Oct 15 &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; Oct 16
                        &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Oct 17
                        &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Oct 18
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Oct 19 &nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Oct 20
                      </span>{" "}
                    </p>
                  </div>

                  <div>
                    <i className="fa-sharp fa-solid fa-angle-right time3"></i>
                  </div>
                </div> */}

                <div className="text-time">
                  <p
                    style={{ backgroundColor: "#64E48E", cursor: "pointer" }}
                    className="para1"
                  >
                    Day View
                  </p>
                  <p
                    style={{ cursor: "pointer" }}
                    className="para2"
                    onClick={() => {
                      navigate("/weekly-timesheet");
                    }}
                  >
                    Week View
                  </p>
                  <p onClick={() => {
                    navigate("/calendar-timesheet")
                  }} style={{ cursor: "pointer" }} className="para3">
                    Calendar
                  </p>
                </div>
              </div>
            </Col>
          </Row>

          {/* Row 3 */}
          <form
            onSubmit={handleSubmit}
            style={{ background: "#F1F1F1", padding: "0" }}
          >
            <div
              style={{ background: "#F1F1F1" }}
              className="card-container-row"
            >
              <div className="card-container1">
                <h5>Time</h5>
                <p></p>

                <div action="" className="form-timesheet">
                  <div className="form-time1">
                    <div style={{ width: "45%" }}>
                      <label className="lable_bold" htmlFor="">
                        Hours
                      </label>
                      <input
                        type="number"
                        value={formData.hours}
                        required
                        onChange={handleInputChange}
                        name="hours"
                        id=""
                      />
                    </div>

                    <div style={{ width: "45%" }}>
                      <label className="lable_bold" htmlFor="">
                        Date
                      </label>
                      <input
                        required
                        defaultValue={currentDate2}
                        // value={currentDate2}
                        onChange={handleInputChange}
                        type="date"
                        name="date"
                        id=""
                      />
                    </div>
                  </div>

                  <div className="textarea">
                    <label className="lable_bold" htmlFor="">
                      Description
                    </label>
                    <textarea
                      onChange={handleInputChange}
                      value={formData.description}
                      type="text"
                      name="description"
                      id=""
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="card-container2">
                <h5>Customer and Job Detail</h5>
                <p></p>
                {/* form  */}
                <div action="" className="form-timesheet">
                  <div className="form-time1">
                    <div style={{ width: "45%" }}>
                      <label className="lable_bold" htmlFor="">
                        Customer:Project
                      </label>
                      <Form.Select
                        className="area"
                        name="project"
                        aria-label="Default select example"
                        required
                        value={formData.project}
                        onChange={handleInputChange}
                      >
                        <option value="">Select</option>
                        {projectInfo &&
                          projectInfo.map((item, index) => {
                            return (
                              <option key={index} value={item.project}>
                                {item.project}
                              </option>
                            );
                          })}
                      </Form.Select>
                    </div>

                    <div style={{ width: "45%" }}>
                      <label className="lable_bold" htmlFor="">
                        Task
                      </label>
                      <Form.Select
                        className="area"
                        name="task"
                        value={formData.task}
                        aria-label="Default select example"
                        required
                        onChange={handleInputChange}
                      >
                        <option value="">Select</option>
                        {taskInfo &&
                          taskInfo.map((item, index) => {
                            return (
                              <option key={index} value={item.task}>
                                {item.task}
                              </option>
                            );
                          })}
                      </Form.Select>
                    </div>
                  </div>

                  <div className="checkbox-button">
                    <span style={{ fontSize: "14px", display: "flex", alignItems: "center" }} className="lable_bold">
                      <input
                        style={{ marginRight: "5px" }}
                        value={isBillable}
                        onChange={handleChangeBillable}
                        defaultChecked
                        type="checkbox"
                        name="billable"
                        id=""
                      />{" "}
                      Billable
                    </span>
                  </div>

                  <div className="boxContainer">
                    <div className="box-container2">
                      <div
                        className="box1"
                        style={{ cursor: "pointer" }}
                        onClick={makeTheFeildsEmpty}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="19"
                          height="19"
                          viewBox="0 0 19 19"
                          fill="none"
                        >
                          <path
                            d="M9.60218 2.62078C10.0476 2.17554 10.6515 1.92542 11.2813 1.92542C11.9111 1.92542 12.5151 2.17554 12.9604 2.62078L17.5667 7.2271C18.012 7.67247 18.2621 8.27646 18.2621 8.90622C18.2621 9.53599 18.012 10.14 17.5667 10.5853L11.0355 17.1166C10.5902 17.562 9.98621 17.8123 9.35637 17.8125H6.08006C5.45022 17.8123 4.84623 17.562 4.40093 17.1166L1.43218 14.1478C0.98694 13.7025 0.736816 13.0985 0.736816 12.4687C0.736816 11.839 0.98694 11.235 1.43218 10.7896L9.601 2.62078H9.60218ZM10.3859 16.087L4.1005 9.8016L2.27293 11.6292C2.05031 11.8518 1.92525 12.1538 1.92525 12.4687C1.92525 12.7836 2.05031 13.0856 2.27293 13.3083L5.24168 16.277C5.46433 16.4997 5.76633 16.6249 6.08125 16.625H9.35756C9.67248 16.6249 9.97447 16.4997 10.1971 16.277L10.3859 16.087Z"
                            fill="#04542C"
                          />
                        </svg>
                      </div>
                      <div onClick={repeatTimesheet} style={{ cursor: "pointer" }} className="box3">
                        <i class="fa-sharp fa-solid fa-rotate"></i>
                      </div>
                    </div>

                    <div className="box-head">
                      <button type="submit" className="box-button">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
                {/* form en  */}
              </div>
            </div>
          </form>

          {/* Row 5 */}

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
                  {/* <UserPdf userTimesheetInfo={userTimesheetInfo} /> */}
                  <button className='button-container-button' onClick={handleClickOpen2} style={{ cursor: "pointer" }}>Print</button>
                  <button className='button-container-button' onClick={deleteAllTimesheets} style={{ cursor: "pointer" }}>Delete All</button>
                  <ImportTimesheet className='button-container-button' />
                </div>
              </div>
            </Col>
          </Row>

          {/* Row 6 */}
          {/* <Row style={{background: '#F1F1F1'}}>
                <Col md={12}>
                <div className="worksheet2">
                    <ul className="worklist2">
                        <li>Date</li>
                        <li>Customer:Project</li>
                        <li>Task</li>
                        <li>Hours</li>
                        <li>Description</li>
                        <li>Billable</li>
                        <li>Approved or Not</li>
                    </ul>

                    <p className='border1'></p>
                    <p className='border2'></p>
                    <p className='border3'></p>
                
                </div>
                </Col>
            </Row> */}
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

          {/* Row 4 */}
        </Container>
      </div>

      {/* diloag  */}

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <div
          style={{ width: "600px", height: "500px" }}
          className="dialog-main"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <p className="timer">timer</p>
            <DialogActions>
              <Button
                style={{
                  background: "rgb(100, 228, 142)",
                  borderRadius: "10px",
                  color: "#000",
                  fontWeight: "600",
                  padding: "5px 15px",
                }}
                onClick={handleClose}
              >
                Close
              </Button>
            </DialogActions>
          </div>

          <div className="timer-button">
            {/* <button className="btn1" onClick={startStopTimer}>
              {timerRunning ? "Stop Timer" : "Start Timer"}
            </button> */}
            <button className="btn2" onClick={resetTimer}>
              Reset Timer
            </button>
          </div>
          <p>{formatTime(seconds)}</p>

          <div className="border-around">
            <div style={{ display: "flex" }} className="form-time1 ">
              <div style={{ width: "50%" }} className="customer">
                <label className="lable_bold" htmlFor="">
                  Customer:Project
                </label>
                <Form.Select
                  style={{ cursor: "pointer" }}
                  className="area"
                  value={formData1.project}
                  name="project"
                  aria-label="Default select example"
                  required
                  onChange={handleInputChange1}
                >
                  <option value="">Select</option>
                  {projectInfo &&
                    projectInfo.map((item, index) => {
                      return (
                        <option key={index} value={item.project}>
                          {item.project}
                        </option>
                      );
                    })}
                </Form.Select>
              </div>

              <div style={{ width: "50%" }} className="task">
                <label className="lable_bold" htmlFor="">
                  Task
                </label>
                <Form.Select
                  style={{ cursor: "pointer" }}
                  className="area"
                  value={formData1.task}
                  name="task"
                  aria-label="Default select example"
                  required
                  onChange={handleInputChange1}
                >
                  <option value="">Select</option>
                  {taskInfo &&
                    taskInfo.map((item, index) => {
                      return (
                        <option key={index} value={item.task}>
                          {item.task}
                        </option>
                      );
                    })}
                </Form.Select>
              </div>
            </div>

            <div className="textarea">
              <label className="lable_bold" htmlFor="">
                Description
              </label>
              <textarea value={formData1.description} onChange={handleInputChange1} type="text" name="description" id="">
                {" "}
              </textarea>
            </div>

            <div className="strong">
              <strong onClick={handleSubmit1} style={{ display: "flex" }}>Save</strong>
            </div>
          </div>
        </div>
      </Dialog>


      {/* another dailogBox for the Print  */}

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
            <UserPdf userTimesheetInfo={userTimesheetInfo} />
            <UserExcel userTimesheetInfo={userTimesheetInfo} />
            <UserCsv userTimesheetInfo={userTimesheetInfo} />
          </div>
          <div className="button-container">
            <button className='button-container-button' onClick={handleClose2} style={{ cursor: "pointer", background: "rgb(100, 228, 142)", }}>Close</button>
          </div>
        </div>
      </Dialog>
    </AdminLayout>

  );
};

export default AdminDashboard;
