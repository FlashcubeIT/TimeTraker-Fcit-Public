import React, { useState, useEffect, useContext } from "react";
import AdminLayout from "../../hoc/AdminLayout";
import "./AdminExpense.css";
// import TableDesign from '../components/TableDesign'
import { Col, Container, Row, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import signupImg1 from "../../img/Vector.png";
import signupImg2 from "../../img/user2.png";
import ExpenseTable from "../../components/ExpenseTable";
import axios from "axios";
import { MyContext } from "../../context/MyProvider";
import UserPdf from "./UserPdf";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminExpense = () => {
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

  // config

  const navigate = useNavigate();

  const config = {
    headers: {
      Accept: "application/json",
      "Content-type": "multipart/form-data",
      Authorization: `Bearer ${token}`
    },
  };

  const [userExpenseInfo, setUserExpenseInfo] = useState([]);
  const [taskInfo, setTaskInfo] = useState([]);
  const [newExpense, setNewExpense] = useState();
  const [projectInfo, setProjectInfo] = useState([]);
  const [chartOfAccount, setChartOfAccount] = useState([]);
  const [formData, setFromData] = useState({
    companyID: companyID,
    userID: userID,
    userName: userName,
  });
  console.log("formData", formData);
  const handleChange = (e) => {
    const { name } = e.target;
    const value = name === "photo" ? e.target.files[0] : e.target.value;

    // console.log("value", e.target.files)
    setFromData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      date,
      expense,
      companyID,
      amount,
      description,
      userID,
      photo,
      userName,
      project,
      paidBy,
    } = formData;
    const productFormData = new FormData();
    productFormData.set("date", date);
    productFormData.set("description", description);
    productFormData.set("expense", expense);
    productFormData.set("companyID", companyID);
    productFormData.set("amount", amount);
    productFormData.set("photo", photo);
    productFormData.set("userID", userID);
    productFormData.set("userName", userName);
    productFormData.set("project", project);
    productFormData.set("paidBy", paidBy);

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/add-expense",
        productFormData,
        {
          headers: {
            Accept: "application/json",
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          },
        }
      );
      setNewExpense(data);
      setFromData({
        companyID: formData.companyID,
        userID: formData.userID,
        userName: formData.userName,
        expense: "",
        amount: "",
        description: "",
        photo: "",
        project: "",
        paidBy: "",
        date: currentDate2
      })
      TimesheetAddNotfy()
    } catch (error) {
      console.log("error from create expense api", error);
    }
  };

  const handleDataFromChild = (data) => {
    // Do something with the data in the parent component
    setNewExpense(data);
  };

  // get user Expense data

  const getUsersExpress = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/user-expense/?userID=${userID}`,
        config
      );
      setUserExpenseInfo(data.expenses);
    } catch (error) {
      console.log("error from get user expense api", error);
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
      console.log(error);
    }
  };

  const getAllChartOfAccount = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/get-chart-of-account-for-expense/?companyID=${companyID}`,
        config
      );
      setChartOfAccount(data.chartOfAccount);
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    getUsersExpress();
    getAllTask();
    getAllProject();
    getAllChartOfAccount();
    if (!forPhoneScreenNoDisplay) {
      setSideBarStatus(false);
    }
  }, []);

  useEffect(() => {
    getUsersExpress();
  }, [newExpense]);






  // submitAllTimesheets

  const submitAllExpences = async () => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
    };

    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/submitAll-expense/?userID=${userID}`,
        config
      );
      if (data) {
        TimesheetSubmitNotfy()
        setNewExpense(data);
      }
    } catch (error) {
      console.log("error from submitAllExpences", error)
    }
  }



  const deleteAllExpences = async () => {

    const config = {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
    };

    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/deleteAll-expense/?userID=${userID}`,
        config
      );
      if (data) {
        TimesheetDeleteNotfy()
        setNewExpense(data);
      }
    } catch (error) {
      console.log("error from deleteAllExpences", error)
    }
  }


  const TimesheetAddNotfy = () => {
    toast.success('Your expense has been added', {
      position: 'top-right',
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };




  const TimesheetSubmitNotfy = () => {
    toast.success('Your expense has been submited', {
      position: 'top-right',
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };


  const TimesheetDeleteNotfy = () => {
    toast.success('Your expense has been deleted', {
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






  const [formDataForUserFilter, setFormDataForUserFilter] = useState({ userID: userID })

  console.log("formDataForUserFilter", formDataForUserFilter)
  const handleChangeForFilterForUser = async (e) => {
    const { name, value } = e.target;
    setFormDataForUserFilter((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }


  useEffect(() => {

    const config = {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
    };

    const filterExpenseForUser = async () => {

      try {
        const { data } = await axios.post(

          `http://localhost:8000/api/filter-user-expense`, { formDataForUserFilter },
          config
        );
        if (data) {
          setUserExpenseInfo(data.filteredExpense);
        }
      } catch (error) {
        console.log("error from filteruserTimesheet", error)
      }
    }
    filterExpenseForUser()
  }, [formDataForUserFilter])



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
        <div
          className="hamburgar"
          style={sideBarStatus ? { display: "none" } : { display: "block" }}
        >
          <i onClick={handleClick} className="fas fa-bars"></i>
        </div>
        <Container fluid className="dash3" style={{ padding: "0" }}>
          {/* Row 1 */}
          <Row>
            <Col md={12} className="dash-container3">
              <div className="header-top3">
                <div className="dash-header1">
                  <h5
                    style={
                      sideBarStatus == true
                        ? { paddingLeft: "10px", paddingTop: '3px' }
                        : { paddingLeft: "60px", paddingTop: '5px' }
                    }
                  >
                    My Expense
                  </h5>
                </div>

                <div className="dash-header2">
                  <abbr title="?" ><img src={signupImg1} alt="" /></abbr>
                  <abbr title="Profile" ><img
                    onClick={() => {
                      navigate("/profile");
                    }}
                    src={signupImg2}
                    alt=""
                  /></abbr>
                </div>
              </div>
            </Col>
          </Row>

          {/* Row 2 */}
          <Row style={{ background: "#F1F1F1" }}>
            <Col md={12}>
              <div className="expense">
                <div className="expense-header">
                  <button className="btn1" style={{ cursor: 'context-menu' }} >Expense Info</button>
                  <button className="btn2" style={{ cursor: 'context-menu' }}>Cancel</button>
                </div>

                <form onSubmit={handleSubmit} action="" className="signup-form">
                  <div className="form1">
                    <div className="mb-3 expense-dropdown1 space_input">
                      <label
                        className="lable_bold"
                        style={{ fontSize: "16px" }}
                        htmlFor=""
                      >
                        Expense Type
                      </label>
                      <Form.Select
                        style={{ cursor: "pointer" }}
                        value={formData.expense}
                        name="expense"
                        onChange={handleChange}
                        type="selact"
                        required
                        className="drop-area1"
                        aria-label="Default select example"
                      >
                        <option value="">Select</option>
                        {chartOfAccount &&
                          chartOfAccount.map((item, index) => {
                            return (
                              <option key={index} value={item.name}>
                                {item.name}
                              </option>
                            );
                          })}
                      </Form.Select>
                    </div>

                    <div className="mb-3 space_input">
                      <label
                        className="lable_bold"
                        style={{
                          fontSize: "16px",
                          display: "flex",
                          alignItems: "center",
                        }}
                        htmlFor=""
                      >
                        Expense Date
                      </label>
                      <input
                        style={{ cursor: "pointer" }}
                        defaultValue={currentDate2}
                        onChange={handleChange}
                        required
                        type="date"
                        name="date"
                        id=""
                        className="expense-date"
                      />
                    </div>
                    <div className="mb-3 space_input">
                      <label
                        className="lable_bold"
                        style={{
                          fontSize: "16px",
                          display: "flex",
                          alignItems: "center",
                        }}
                        htmlFor=""
                      >
                        Amount
                      </label>
                      <input
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        type="text"
                        name="amount"
                        id="amount"
                        className="amount"
                      />
                    </div>

                    <div className="space_input">
                      <label
                        className="lable_bold"
                        style={{
                          fontSize: "16px",
                          display: "flex",
                          alignItems: "center",
                        }}
                        htmlFor=""
                      >
                        Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={handleChange}
                        type="text"
                        name="description"
                        id=""
                        className="text-area"
                      ></textarea>
                    </div>
                  </div>

                  <div className="form2">
                    <div className="mb-3 expense-dropdown4 space_input">
                      <label
                        className="lable_bold"
                        style={{
                          fontSize: "16px",
                          display: "flex",
                          alignItems: "center",
                        }}
                        htmlFor=""
                      >
                        Project
                      </label>
                      <Form.Select
                        value={formData.project}
                        style={{ cursor: "pointer" }}
                        onChange={handleChange}
                        name="project"
                        required
                        className="drop-area4"
                        aria-label="Default select example"
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
                    <div className="mb-3 expense-dropdown5 space_input">
                      <label
                        className="lable_bold"
                        style={{
                          fontSize: "16px",
                          display: "flex",
                          alignItems: "center",
                        }}
                        htmlFor=""
                      >
                        Paid by
                      </label>
                      <Form.Select
                        value={formData.paidBy}
                        style={{ cursor: "pointer" }}
                        onChange={handleChange}
                        name="paidBy"
                        required
                        className="drop-area5"
                        aria-label="Default select example"
                      >
                        <option value="">Select</option>
                        <option value="Paid by Me">Paid by Me</option>
                        <option value="Paid by Company">Paid by Company</option>
                      </Form.Select>
                    </div>

                    <div className="mb-3 expense-dropdown5 space_input">
                      <label
                        className="lable_bold"
                        style={{
                          fontSize: "16px",
                          display: "flex",
                          alignItems: "center",
                        }}
                        htmlFor=""
                      >
                        Add Receipt
                      </label>
                      <div className="expenseBtn">
                        <div className="expeseBtn1">
                          <input

                            className="fileSelaction"
                            onChange={handleChange}
                            name="photo"
                            required
                            type="file"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="expenseBtn expenseBtn_1">
                      <button type="submit" className="btn5" style={{ height: '40px' }} >
                        Add Expense
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </Col>
          </Row>

          {/* Row 3  */}
          <Row style={{ background: "#F1F1F1" }}>
            <Col md={12}>
              <div className="time">
                <div className="text-time">
                  {/* <input type="text" name="" id="" placeholder="Search" /> */}

                  <Form className="input-menu input-menu_expense" >
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
                      name="type"
                      aria-label="Default select example"
                      onChange={handleChangeForFilterForUser}


                    >
                      <option value="">Type</option>
                      {chartOfAccount &&
                        chartOfAccount.map((item, index) => {
                          return (
                            <option key={index} value={item.name}>
                              {item.name}
                            </option>
                          );
                        })}
                    </Form.Select>

                    <Form.Select
                      className="input-menu-focus input-menu-focus"
                      style={{ cursor: 'pointer' }}
                      name="state"
                      aria-label="Default select example"
                      onChange={handleChangeForFilterForUser}
                    >
                      <option value="">Status</option>
                      <option value="hold">Hold</option>
                      <option value="submited">Submited</option>
                      <option value="aproved">Approved</option>
                    </Form.Select>
                  </Form>
                </div>

                <div className="button-container">
                  <button className='button-container-button' onClick={submitAllExpences} style={{ cursor: "pointer" }}>Submit All</button>
                  {/* <UserPdf className='button-container-button' userTimesheetInfo={userExpenseInfo} /> */}
                  <button className='button-container-button' onClick={deleteAllExpences} style={{ cursor: "pointer" }}>Delete All</button>
                </div>
              </div>
            </Col>
          </Row>

          <Row style={{ background: "#F1F1F1" }}>
            <Col>
              <div className="myexpense-table">
                {/* <TableDesign /> */}
                <ExpenseTable
                  userExpenseInfo={userExpenseInfo}
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

export default AdminExpense;
