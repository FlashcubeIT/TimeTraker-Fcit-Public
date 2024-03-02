import React, { useState, useEffect, useContext } from "react";
import "./Task.css";
import signupImg1 from "../../img/Vector.png";
import signupImg2 from "../../img/user2.png";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import TaskTable from "../../components/Table";
import axios from "axios";
import AdminLayout from "../../hoc/AdminLayout";
import { MyContext } from "../../context/MyProvider";
import { useNavigate } from "react-router-dom";
import { Cursor } from "mongoose";
import {ToastContainer,  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Task = () => {
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

  const adminloginInfo = JSON.parse(localStorage.getItem("adminLoginInfo"));
  const userLoginInfo = JSON.parse(localStorage.getItem("userLoginInfo"));
  if (adminloginInfo) {
    var companyID = adminloginInfo?._id;
 var token = adminloginInfo?.token
  }
  if (userLoginInfo) {
    var companyID = userLoginInfo?.companyID;
 var token = userLoginInfo?.token
  }

  const [formData, setFromData] = useState({ companyID: companyID });
  const [taskInfo, setTaskInfo] = useState([]);
  const [newTask, setNewTask] = useState();

  // config

  const config = {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`
    },
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFromData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/create-task`,
        formData,
        config
      );
      setNewTask(data);
      TimesheetSubmitNotfy()
      setFromData({
        companyID: companyID,
        task: ""
      })
    } catch (error) {
      console.log("error from create task api", error);
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
      console.log("error from task api", error);
    }
  };

  const handleDataFromChild = (data) => {
    // Do something with the data in the parent component
    setNewTask(data);
  };

  useEffect(() => {
    getAllTask();
    if (!forPhoneScreenNoDisplay) {
      setSideBarStatus(false);
    }
  }, []);

  useEffect(() => {
    getAllTask();
  }, [newTask]);



  const TimesheetSubmitNotfy = () => {
    toast.success('Your task has been added', {
      position: 'top-right',
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <AdminLayout>
            <ToastContainer/>
      <div
        className={sideBarStatus ? "content_right_dashboard_2" : "none"}
        fluid
        style={
          (sideBarStatus == true) & (forPhoneScreenNoDisplay == false)
            ? { display: "none" }
            : { display: "block", minHeight: "100vh", background: "#f1f1f1" }
        }
      >
        <Container fluid className="dash3" style={{ padding: "0" }}>
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
                <div className="task-header1">
                  <h5
                    style={
                      sideBarStatus == true
                        ? { paddingLeft: "10px", paddingTop: "2px" }
                        : { paddingLeft: "60px", paddingTop: "4px" }
                    }
                  >
                    Task
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

          {/* Row 2 */}
          <Row style={{ background: "#F1F1F1" }}>
            <Col className="task-form">
              <Form style={{ marginTop: "20px" }}>
                <Row className="mb-3">
                  <Form.Group style={{ padding: "0px 44px " }}>
                    <Form.Label
                      style={{ fontSize: "18px" }}
                      className="lable_bold"
                    >
                      Task
                    </Form.Label>
                    <Form.Control
                      className="input_tag "
                      style={{ fontSize: "20px" }}
                      value={formData.task}
                      onChange={handleChange}
                      name="task"
                      required
                      type="text"
                    />
                  </Form.Group>
                </Row>
                <div className="text-center task-btn">
                  <Button
                    onClick={handleSubmit}
                    className="mt-3 mb-5"
                    type="submit"
                  >
                    Add Task{" "}
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>

          {/* Row 3 */}
          <Row style={{ background: "#F1F1F1" }}>
            <Col>
              <div className="table-container">
                <TaskTable
                  taskInfo={taskInfo}
                  handleDataFromChild={handleDataFromChild}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </AdminLayout>
  );
};

export default Task;
