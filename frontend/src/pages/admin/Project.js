import React, { useState, useEffect, useContext } from "react";
import "./Task.css";
import signupImg1 from "../../img/Vector.png";
import signupImg2 from "../../img/user2.png";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import axios from "axios";
import AdminLayout from "../../hoc/AdminLayout";
import ProjectTable from "../../components/ProjectTable";
import { MyContext } from "../../context/MyProvider";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Task = () => {
  const navigate = useNavigate();

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
  const [projectInfo, setProjectInfo] = useState([]);
  const [newProject, setNewProject] = useState();

  // config

  const config = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`
    },
  };

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
        "http://localhost:8000/api/create-project",
        formData,
        config
      );
      setFromData({
        companyID: formData.companyID,
        project: "",
        billable: "",
        description: ""
      })
      setNewProject(data);
      TimesheetSubmitNotfy()
    } catch (error) {
      console.log("error from create Project Api", error);
    }
  };

  const getAllProject = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/all-project/?companyID=${companyID}`,
        config
      );
      setProjectInfo(data.projects);
    } catch (error) {
      console.log("error from get Project api", error);
    }
  };

  if (projectInfo) {
    console.log("projectInfo ", projectInfo);
  }

  const handleDataFromChild = (deletedProject) => {
    // Do something with the data in the parent component
    console.log("hello2");
    setNewProject(deletedProject);
  };

  useEffect(() => {
    getAllProject();
    if (!forPhoneScreenNoDisplay) {
      setSideBarStatus(false);
    }
  }, []);

  useEffect(() => {
    console.log("hello");
    getAllProject();
  }, [newProject]);



  const TimesheetSubmitNotfy = () => {
    toast.success('Your project has been added', {
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
      <ToastContainer />
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
                    Project
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

          {/* Row 2 
          {/* <Row style={{ background: "#F1F1F1" }}>
            <Col className="task-form">
              <Form style={{ marginTop: "20px" }}>
                <Row className="mb-3">
                  <Form.Group style={{ padding: "0px 44px " }}>
                    <Form.Label
                      style={{ fontSize: "18px" }}
                      className="lable_bold"
                    >
                      Project
                    </Form.Label>
                    <Form.Control
                      className="input_tag"
                      value={formData.project}
                      style={{ fontSize: "20px" }}
                      onChange={handleChange}
                      name="project"
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
                    Add project{" "}
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
          */}

          <Row style={{ background: "#F1F1F1" }}>
            <Col md={12}>
              <div className="adduser peoject_form_padding" style={{ marginBottom: "47px" }}>
                <div  className="adduser-header project-header">
                  <button className="btn1">Project Info</button>
                </div>


                <form
                  onSubmit={handleSubmit}
                  action=""
                  className="adduser-form"
                  style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "20px" }}
                >

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                    <div className="form1 ">
                      <div className="mb-3 projectInput">
                        <label className="lable_bold" htmlFor="">
                          Project
                        </label>
                        <input
                          required
                          value={formData.project}
                          onChange={handleChange}
                          type="text"
                          name="project"
                          id=""
                        />
                      </div>


                    </div>

                    <div className="form2">

                      <div style={{ marginBottom: "13px" }} className="role-border projectInput">
                        <label className="lable_bold" htmlFor="">
                          Billable
                        </label>
                        <Form.Select
                          required
                          onChange={handleChange}
                          value={formData.billable}
                          name="billable"
                          className="role"
                          aria-label="Default select example"
                          style={{ marginLeft: "0px" }}
                        >
                          <option value="">Select</option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </Form.Select>

                        {/* <label htmlFor="">Role</label>
                                    <input type="text" name="role" id="" /> */}
                        {/* <i class="fa-solid fa-sort-down"></i> */}
                      </div>

                    </div>
                  </div>
                  <div style={{ width: "100%" }} className="role-border projectInput">
                    <label className="lable_bold" htmlFor="">
                      Description
                    </label>
                    <textarea
                      onChange={handleChange}
                      value={formData.description}
                      name="description"
                      className="project-textarea" style={{ width: "100%" }} />
                  </div>
                  <div className="adduserBtn ">
                    <button type="submit" className="btn5">
                      Submit
                    </button>
                  </div>

                </form>
              </div>
            </Col>
          </Row>

          {/* Row 3 */}
          <Row style={{ background: "#F1F1F1" }}>
            <Col>
              <div className="table-container">
                <ProjectTable
                  projectInfo={projectInfo}
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
