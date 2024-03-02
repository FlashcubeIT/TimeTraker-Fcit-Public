import React, { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarView.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { MyContext } from "../../context/MyProvider";
import { Col, Container, Row } from "react-bootstrap";
import AdminLayout from "../../hoc/AdminLayout";
import signupImg1 from "../../img/Vector.png";
import signupImg2 from "../../img/user2.png";
import { useNavigate } from "react-router-dom";

const CalendarView = () => {
  const { sideBarStatus, setSideBarStatus } = useContext(MyContext);
  const [currentDate2, setCurrentDate2] = useState("");

  const handleClick = () => {
    if (sideBarStatus == true) {
      setSideBarStatus(false);
    } else {
      setSideBarStatus(true);
    }
  };

  const navigate = useNavigate();

  const screenWidth = window.innerWidth;
  if (screenWidth >= 840) {
    var forPhoneScreenNoDisplay = true;
  } else {
    var forPhoneScreenNoDisplay = false;
  }

  const [selectedDate, setSelectedDate] = useState(null);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateClick = (date) => {
    setSelectedDate(formatDate(date));
    handleClickOpen();
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const adminloginInfo = JSON.parse(localStorage.getItem("adminLoginInfo"));
  const userLoginInfo = JSON.parse(localStorage.getItem("userLoginInfo"));
  if (adminloginInfo) {
    var companyID = adminloginInfo?._id;
    var token = adminloginInfo?.token
    var userID = adminloginInfo._id;
  }
  if (userLoginInfo) {
    var companyID = userLoginInfo?.companyID;
    var token = userLoginInfo?.token
    var userID = userLoginInfo._id;
  }





  const config = {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`
    },
  };

  const [projectInfo, setProjectInfo] = useState([]);
  const [taskInfo, setTaskInfo] = useState([]);
  const [formData, setFormData] = useState({
    userID: userID,
    companyID: companyID,
    date: selectedDate,
    hours: "",
    project: "",
    task: "",
  });

  // get all project

  const getAllProject = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/all-project/?companyID=${companyID}`,
        config
      );
      setProjectInfo(data.projects);
    } catch (error) {
      console.log("error", error)
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
      console.log("error", error)
    }
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

    if (formData.task == "" || formData.project == "" || formData.hours == "") {
      alert("all the feilds required");
    } else {
      postTimesheetData();
      // console.log("formData",formData)
    }
  };

  const postTimesheetData = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/create-timesheet-entry`,
        {
          userID: formData.userID,
          companyID: formData.companyID,
          date: selectedDate,
          task: formData.task,
          project: formData.project,
          description: formData.description,
          hours: formData.hours,
        },
        config
      );
      handleClose();
      if (data) {
        alert("Your timesheet has been successfully added.");
      }
    } catch (error) {
      console.log("error from post timesheet api", error);
    }
  };

  useEffect(() => {
    getAllTask();
    getAllProject();
    if (!forPhoneScreenNoDisplay) {
      setSideBarStatus(false);
    }
  }, []);

  return (
    <>
      <AdminLayout>
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

            <div
              className="hamburgar"
              style={sideBarStatus ? { display: "none" } : { display: "block" }}
            >
              <i onClick={handleClick} className="fas fa-bars"></i>
            </div>

            {/* Row 1 */}
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

                  {/* <div onClick={handleClickOpen} className="header-icon">
                    <p style={{ cursor: "pointer" }}>
                      <i class="fa-sharp fa-solid fa-play"></i>
                      <span>Start Timer</span>
                    </p>
                  </div> */}

                  <div
                    className="dash-header2"
                    style={{ cursor: "context-menu", marginBottom: "10px" }}
                  >
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
                      style={{ cursor: "pointer" }}
                      className="para2"
                      onClick={() => {
                        navigate("/weekly-timesheet");
                      }}
                    >
                      Week View
                    </p>
                    <p
                      style={{ backgroundColor: "#64E48E", cursor: "pointer" }}
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

            <div className="full-screen-calendar">
              <Calendar
                onChange={() => { }}
                value={selectedDate}
                onClickDay={handleDateClick}
              />
            </div>
          </Container>
        </div>
      </AdminLayout>
      {/* <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
          <div>
            <input    defaultValue={selectedDate} />
          </div>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog> */}
      {/* diloag  */}

      {/* dialog box */}
      <Dialog
        open={open}
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

          <div className="border-around">
            <div style={{ display: "flex" }} className="form-time1 ">
              <div style={{ width: "50%", display: 'flex', flexDirection: 'column', gap: '5px' }} className="customer">
                <label className="lable_bold" htmlFor="">
                  Hours
                </label>
                <input
                  style={{ height: '40px' }}
                  name="hours"
                  required
                  onChange={handleInputChange}
                  type="number"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: "50%" }} className="task">
                <label className="lable_bold" htmlFor="">

                  Date
                </label>
                <input
                  style={{ fontFamily: 'Inter', fontSize: '15px', height: '40px' }}
                  disabled
                  defaultValue={selectedDate}
                  name="date"
                  type="date"
                />
              </div>
            </div>

            <div style={{ display: "flex" }} className="form-time1 ">
              <div style={{ width: "50%" }} className="customer">
                <label className="lable_bold" htmlFor="">
                  Customer:Project
                </label>
                <Form.Select
                  style={{ cursor: "pointer" }}
                  className="area"
                  name="project"
                  aria-label="Default select example"
                  required
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

              <div style={{ width: "50%" }} className="task">
                <label className="lable_bold" htmlFor="">
                  Task
                </label>
                <Form.Select
                  style={{ cursor: "pointer" }}
                  className="area"
                  name="task"
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

            <div className="textarea">
              <label className="lable_bold" htmlFor="">
                Description
              </label>
              <textarea onChange={handleInputChange} type="text" name="" id="">
                {" "}
              </textarea>
            </div>

            <div className="strong">
              <strong onClick={handleSubmit} style={{ display: "flex" }}>
                Save
              </strong>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CalendarView;
