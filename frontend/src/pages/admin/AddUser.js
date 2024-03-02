import React, { useContext } from "react";
import "./AddUser.css";
import { Col, Form, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import signupImg1 from "../../img/Vector.png";
import signupImg2 from "../../img/user2.png";
import { useEffect, useState } from "react";
import AllUsersTable from "../../components/AllUsersTable.js";
import axios from "axios";
import AdminLayout from "../../hoc/AdminLayout";
import { MyContext } from "../../context/MyProvider";
import { ToastContainer, toast } from 'react-toastify';

const AddUser = () => {
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
  } else if (userLoginInfo) {
    var companyID = userLoginInfo?.companyID;
    var token = userLoginInfo?.token
  }

  let allTheEmployee = [];

  const [allUser, setAllUser] = useState([]);
  const [allManager, setAllManager] = useState([]);
  const [allSubAdmin, setAllSubAdmin] = useState([]);
  const [newSubAdmin, setNewSubAdmin] = useState();
  const [newManager, setNewManager] = useState();
  const [newUser, setNewUser] = useState();

  const [formDataUser, setFromDataUser] = useState({
    companyID: companyID,
  });
  console.log("formDataUser====>", formDataUser);

  // config

  const config = {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`
    },
  };

  const handleChangeUser = (e) => {
    const { name, value } = e.target;
    setFromDataUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(formDataUser);

  const isPasswordValid = (password) => {
    // The regular expression to enforce the criteria
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    // Check if the password matches the criteria
    return passwordRegex.test(password);
  };

  const isPhoneNumberValid = (phoneNumber) => {
    // The regular expression to enforce the phone number pattern
    const phoneRegex = /^[0-9]{10}$/;

    // Check if the phone number matches the criteria
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    const validatePass = isPasswordValid(formDataUser.password)
    const validatePhone = isPhoneNumberValid(formDataUser.phone)

    if (validatePass == true) {
      if (validatePhone == true) {
        if (formDataUser.role == "sub-admin") {
          try {
            const { data } = await axios.post(
              "http://localhost:8000/api/sub-asmin-register",
              formDataUser,
              config
            );
            if (data?.message == "email exist") {
              alert("Email already exist, Please try with another email address")
            }
            else if (data?.message == "name exist") {
              alert("name already exist, Please chnage the name")
            } else {
              adminAddNotfy()
              setFromDataUser({
                companyID: formDataUser.companyID,
                name: "",
                email: "",
                phone: "",
                password: "",
                role: ""
              })
              setNewSubAdmin(data);
            }
          } catch (error) {
            console.log("add user api", error);
          }
        } else if (formDataUser.role == "manager") {
          try {
            const { data } = await axios.post(
              "http://localhost:8000/api/manager-register",
              formDataUser,
              config
            );
            if (data?.message == "email exist") {
              alert("Email already exist, Please try with another email address")
            }
            else if (data?.message == "name exist") {
              alert("name already exist, Please chnage the name")
            } else {
              managerAddNotfy()
              setFromDataUser({
                companyID: formDataUser.companyID,
                name: "",
                email: "",
                phone: "",
                password: "",
                role: ""
              })
              setNewManager(data);
            }
          } catch (error) {
            console.log("add user api", error);
          }
        } else if (formDataUser.role == "user") {
          try {
            const { data } = await axios.post(
              "http://localhost:8000/api/user-register",
              formDataUser,
              config
            );
            if (data?.message == "email exist") {
              alert("Email already exist, Please try with another email address")
            }
            else if (data?.message == "name exist") {
              alert("name already exist, Please chnage the name")
            } else {
              userAddNotfy()
              setFromDataUser({
                companyID: formDataUser.companyID,
                name: "",
                email: "",
                phone: "",
                password: "",
                role: ""
              })
              setNewUser(data);
            }
          } catch (error) {
            console.log("add user api", error);
          }

        }
      } else {
        alert("Please enter a valid number")
      }

    } else {
      alert("Password must have at least 1 uppercase, 1 lowercase, and 1 number")
    }

  };

  const getAllUser = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/all-users/?companyID=${companyID}`,
        config
      );
      allTheEmployee.push(...data.allUsers);
      setAllUser(data.allUsers);
    } catch (error) {
      console.log("error from get all user api", error);
    }
  };

  const getAllManager = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/all-manager/?companyID=${companyID}`,
        config
      );
      allTheEmployee.push(...data.allManager);
      setAllManager(data.allManager);
    } catch (error) {
      console.log("error from get all user api", error);
    }
  };

  const getAllSubAdmin = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/all-sub-asmin/?companyID=${companyID}`,
        config
      );
      allTheEmployee.push(...data.allSubAdmin);
      setAllSubAdmin(data.allSubAdmin);
    } catch (error) {
      console.log("error from get all user api", error);
    }
  };

  const handleDataFromChild = (data) => {
    // Do something with the data in the parent component
    setNewSubAdmin(data);
    setNewManager(data);
    setNewUser(data);
  };

  useEffect(() => {
    getAllUser();
    getAllManager();
    getAllSubAdmin();
    if (!forPhoneScreenNoDisplay) {
      setSideBarStatus(false);
    }
  }, []);

  useEffect(() => {
    getAllUser();
  }, [newUser]);
  useEffect(() => {
    getAllManager();
  }, [newManager]);
  useEffect(() => {
    getAllSubAdmin();
  }, [newSubAdmin]);

  const adminAddNotfy = () => {
    toast.success('Admin has been added', {
      position: 'top-right',
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };


  const managerAddNotfy = () => {
    toast.success('Manager has been added', {
      position: 'top-right',
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };


  const userAddNotfy = () => {
    toast.success('User has been added', {
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
        <div
          className="hamburgar"
          style={sideBarStatus ? { display: "none" } : { display: "block" }}
        >
          <i onClick={handleClick} className="fas fa-bars"></i>
        </div>
        <Container fluid className="dash3" style={{ padding: "0" }}>
          {/* Row 1 */}
          <Row>
            <Col md={12} className="adduser-container">
              <div className="adduser-top">
                <div className="adduser-header1">
                  <h5
                    style={
                      sideBarStatus == true
                        ? { paddingLeft: "10px", paddingTop: "2px" }
                        : { paddingLeft: "60px", paddingTop: "4px" }
                    }
                  >
                    Add User
                  </h5>
                </div>

                <div className="adduser-header2">
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
            <Col md={12}>
              <div className="adduser">
                <div className="adduser-header">
                  <button className="btn1">User Info</button>
                </div>

                <form
                  onSubmit={handleSubmitUser}
                  action=""
                  className="adduser-form"
                >
                  <div className="form1">
                    <div className="mb-3">
                      <label className="lable_bold" htmlFor="">
                        Name
                      </label>
                      <input
                        required
                        onChange={handleChangeUser}
                        type="text"
                        name="name"
                        id=""
                        value={formDataUser.name}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="lable_bold" htmlFor="">
                        Email
                      </label>
                      <input
                        required
                        onChange={handleChangeUser}
                        type="email"
                        name="email"
                        id="amount"
                        className="amount"
                        value={formDataUser.email}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="lable_bold" htmlFor="">
                        Phone
                      </label>
                      <input
                        required
                        onChange={handleChangeUser}
                        type="number"
                        name="phone"
                        id=""
                        value={formDataUser.phone}
                      />
                    </div>
                  </div>

                  <div className="form2">
                    <div className="mb-3">
                      <label className="lable_bold" htmlFor="">
                        Password
                      </label>
                      <input
                        required
                        onChange={handleChangeUser}
                        type="text"
                        name="password"
                        id=""
                        value={formDataUser.password}
                      />
                    </div>
                    <div className="role-border">
                      <label className="lable_bold" htmlFor="">
                        Role
                      </label>
                      <Form.Select
                        required
                        onChange={handleChangeUser}
                        name="role"
                        className="role"
                        aria-label="Default select example"
                        value={formDataUser.role}
                      >
                        <option value="">Select</option>
                        <option value="sub-admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="user">User</option>
                      </Form.Select>

                      {/* <label htmlFor="">Role</label>
                                    <input type="text" name="role" id="" /> */}
                      {/* <i class="fa-solid fa-sort-down"></i> */}
                    </div>
                    <div className="adduserBtn ">
                      <button type="submit" className="btn5">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </Col>
          </Row>

          {/* Row 3 */}
          <Row style={{ background: "#F1F1F1" }}>
            <Col md={12}>
              <div className="admin-container">
                <div className="admin">
                  <button className="admin-btn">Admin</button>
                </div>
                <AllUsersTable
                  allUser={allSubAdmin}
                  handleDataFromChild={handleDataFromChild}
                />
              </div>
            </Col>
          </Row>
          <Row style={{ background: "#F1F1F1" }}>
            <Col>
              <div className="admin-container">
                <div className="admin">
                  <button className="admin-btn">Manager</button>
                </div>
                <AllUsersTable
                  allUser={allManager}
                  handleDataFromChild={handleDataFromChild}
                />
              </div>
            </Col>
          </Row>
          <Row style={{ background: "#F1F1F1", paddingBottom: "50px" }}>
            <Col>
              <div className="admin-container">
                <div className="admin">
                  <button className="admin-btn">User</button>
                </div>
                <AllUsersTable
                  allUser={allUser}
                  handleDataFromChild={handleDataFromChild}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>


      {/* loder   */}
      {/* <div className="div1">
        <div className="div2">
          <div className="div3">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none" class="ng-tns-c57-0 another"><rect x="29" y="10" width="6" height="15" fill="#222222" class="logo-hands-color ng-tns-c57-0"></rect>
              <rect x="29" y="10" width="6" height="15" fill="#222222" class="logo-hands-color ng-tns-c57-0"></rect>
            </svg>
          </div>
          <div className="div4">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none" class="ng-tns-c57-0"><rect x="29" y="10" width="6" height="15" fill="#222222" class="logo-hands-color ng-tns-c57-0"></rect></svg>
          </div>
          <div className="div5">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none" class="ng-tns-c57-0"><path d="M32 37C29.25 37 27 34.75 27 32C27 29.25 29.25 27 32 27C34.75 27 37 29.25 37 32C37 34.75 34.75 37 32 37Z" fill="#222222" class="logo-hands-color ng-tns-c57-0"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M32 64C49.6731 64 64 49.6731 64 32C64 14.3269 49.6731 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64ZM32 56C45.2548 56 56 45.2548 56 32C56 18.7452 45.2548 8 32 8C18.7452 8 8 18.7452 8 32C8 45.2548 18.7452 56 32 56Z" fill="#03A9F4" class="ng-tns-c57-0"></path></svg>
          </div>
        </div>
      </div> */}
    </AdminLayout>
  );
};

export default AddUser;
