import React, { useEffect, useState, useContext } from "react";
import AdminLayout from "../../hoc/AdminLayout";
// import ProfileSection from '../../components/ProfileSection'
import "./AdminProfile.css";
import signupImg1 from "../../img/Vector.png";
import signupImg2 from "../../img/user2.png";
import { Col, Container, Row, Form } from "react-bootstrap";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContentText,
  DialogContent,
} from "@mui/material";
import axios from "axios";
import { MyContext } from "../../context/MyProvider";

const AdminProfile = () => {
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
    var profileInfo = adminloginInfo;
    var token = userLoginInfo?.token
  } else {
    var profileInfo = userLoginInfo;
    var token = userLoginInfo?.token
  }

  //config

  const config = {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`
    },
  };

  //for dailog

  const [formData, setFromData] = useState({ userID: profileInfo._id });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFromData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(formData);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const validatePassword = (n_password) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(n_password);
  };


  const handleSubmit = async (e) => {
    if (validatePassword(formData.n_password)) {
      e.preventDefault();
      setOpen(false);
      if (profileInfo.role == "admin") {
        try {
          const { data } = await axios.post(
            "http://localhost:8000/api/admin-update-pass",
            formData,
            config
          );
          if (data) {
            alert("your password is updated");
          }
        } catch (error) {
          console.log(error);
          alert("invalid password");
        }
      } else if (profileInfo.role == "sub-admin") {
        try {
          const { data } = await axios.post(
            "http://localhost:8000/api/sub-admin-update-pass",
            formData,
            config
          );
          if (data) {
            alert("your password is updated");
          }
        } catch (error) {
          console.log(error);
          alert("invalid password");
        }
      } else if (profileInfo.role == "manager") {
        try {
          const { data } = await axios.post(
            "http://localhost:8000/api/manager-update-pass",
            formData,
            config
          );
          if (data) {
            alert("your password is updated");
          }
        } catch (error) {
          console.log(error);
          alert("invalid password");
        }
      } else if (profileInfo.role == "user") {
        try {
          const { data } = await axios.post(
            "http://localhost:8000/api/user-update-pass",
            formData,
            config
          );
          if (data) {
            alert("your password is updated");
          }
        } catch (error) {
          console.log(error);
          alert("invalid password");
        }
      }
    } else {
      e.preventDefault();
      alert("Password must be contain 8 characters with atleast one uppercase letter, one lowercase letter, and one number");
    }

  };

  const handleClose = async () => {
    setOpen(false);
  };

  const handleLogout = () => {
    if (profileInfo.role == "admin") {
      localStorage.removeItem("adminLoginInfo");
      window.location.reload();
    } else {
      localStorage.removeItem("userLoginInfo");
      window.location.reload();
    }
  };

  useEffect(() => {
    if (!forPhoneScreenNoDisplay) {
      setSideBarStatus(false);
    }
  }, []);

  return (
    <AdminLayout>
      <div>
        <Container
          className={sideBarStatus ? "content_right_dashboard_2" : "none"}
          fluid
          style={
            (sideBarStatus == true) & (forPhoneScreenNoDisplay == false)
              ? {
                display: "none",
                padding: "0",
                height: "100vh",
                background: "#F1F1F1",
              }
              : {
                display: "block",
                padding: "0",
                height: "100vh",
                background: "#F1F1F1",
              }
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
            <Col md={12} className="profile-container">
              <div className="profile-top">
                <div className="profile-header1">
                  <h5 style={
                    sideBarStatus == true
                      ? { paddingLeft: "10px", paddingTop: "2px" }
                      : { paddingLeft: "60px", paddingTop: "4px" }
                  } >Profile</h5>
                </div>

                <div className="profile-header2">
                  <abbr title="?"><img src={signupImg1} alt="" /></abbr>
                  <abbr title="Profile"><img src={signupImg2} alt="" /></abbr>
                </div>
              </div>
            </Col>
          </Row>

          {/* Row 2 */}
          <Row style={{ background: "#F1F1F1" }}>
            <Col>
              <h1 className="profile-heading mt-5" style={{ cursor: 'context-menu' }} >My Profile</h1>
            </Col>
          </Row>

          {/* Row 3*/}
          <Row style={{ background: "#F1F1F1" }}>
            <Col>
              <div className="list-profile">
                <div className="info-list">
                  <h2>Personal Information</h2>
                  <ul className="list-menu">
                    <li> <span>Name &nbsp; &nbsp; :- &nbsp;</span> {profileInfo.name}</li>
                    <li><span>Email &nbsp;&nbsp; &nbsp;&nbsp;:-&nbsp;&nbsp;</span>  {profileInfo.email}</li>
                    <li><span>Mobile  &nbsp;
                      :-&nbsp;&nbsp;</span>  {profileInfo.phone} </li>
                    <li><span>Role  &nbsp;&nbsp;  &nbsp;&nbsp;&nbsp; :-&nbsp;&nbsp;</span> {profileInfo.role}</li>
                  </ul>
                </div>

                <div className="pass-logout">
                  <div className="password">
                    {/* <h2>Change Password</h2> */}
                    <div>
                      <Button onClick={handleClickOpen}>Change Password</Button>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {
                            "Please fill the below form to changer your password"
                          }
                        </DialogTitle>
                        <DialogContent>
                          <label>Current Password</label> <br />
                          <input
                            type="password"
                            onChange={handleChange}
                            name="c_password"
                          />
                          <br />
                          <label>New Password</label>
                          <br />
                          <input
                            type="password"
                            onChange={handleChange}
                            name="n_password"
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Close</Button>
                          <Button onClick={handleSubmit} autoFocus>
                            Save
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </div>

                  <div className="logout">
                    {/* <h2>Logout</h2> */}
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;
