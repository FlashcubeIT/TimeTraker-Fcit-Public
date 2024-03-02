import React, { useEffect, useState, useContext } from "react";
import "./TimesheetAprove.css";
import AdminLayout from "../../hoc/AdminLayout";
import axios from "axios";
import { Col, Container, Row, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import signupImg1 from "../../img/Vector.png";
import signupImg2 from "../../img/user2.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { MyContext } from "../../context/MyProvider";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import AproveTimesheetTable from "../../components/AproveTimesheetTable.js";

const columns = [
  { id: "name", label: "Name", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "phone", label: "Phone", minWidth: 170 },
  { id: "role", label: "Role", minWidth: 170 },
  {
    id: "createdAt",
    label: "Open Folder",
    minWidth: 170,
    align: "center",
  },
];

const columnsForTimesheetTable = [
  { id: "date", label: "Date", minWidth: 100 },
  { id: "hours", label: "Hours", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 170 },
  { id: "task", label: "Task", minWidth: 100 },
  { id: "project", label: "Project", minWidth: 100 },
  {
    id: "taskcreated",
    label: "Created Task",
    minWidth: 170,
    align: "center",
  },
];

const columnsForAllSubmitedTimesheetTable = [
  { id: "date", label: "Date", minWidth: 100 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "hours", label: "Hours", minWidth: 50 },
  { id: "status", label: "Status", minWidth: 170 },
  { id: "task", label: "Task", minWidth: 100 },
  { id: "project", label: "Project", minWidth: 100 },
  {
    id: "taskcreated",
    label: "Created Task",
    minWidth: 170,
    align: "center",
  },
  { id: "aprove", label: "Aprove", minWidth: 100 },
];

// temporory data

const data = [
  {
    task: "Development",
    status: "Active",
    createdAt: "2023-06-07T04:12:17.986Z",
  },
  {
    task: "Development",
    status: "Active",
    createdAt: "2023-06-07T04:12:17.986Z",
  },
  {
    task: "Development",
    status: "Active",
    createdAt: "2023-06-07T04:12:17.986Z",
  },
];

const TimesheetAprove = () => {
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

  const navigate = useNavigate();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };



  const adminloginInfo = JSON.parse(localStorage.getItem("adminLoginInfo"));
  const userLoginInfo = JSON.parse(localStorage.getItem("userLoginInfo"));

  if (adminloginInfo) {
    var companyID = adminloginInfo?._id;
    var token = adminloginInfo?.token
  } else if (userLoginInfo) {
    var companyID = userLoginInfo?.companyID;
    var token = userLoginInfo?.token
  }



  //     // config


  const config = {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`
    },
  };


  let allTheEmployee = [];

  const [allUser, setAllUser] = useState([]);
  const [superAdmin, setSuperAdmin] = useState([]);
  const [allManager, setAllManager] = useState([]);
  const [allSubAdmin, setAllSubAdmin] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [newData, setNewData] = useState();

  const handleClickForOneUser = async (userID) => {
    handleClickOpen();
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/user-submited-Timesheet/?userID=${userID}`,
        config
      );
      console.log("this user Timesheet", data.allTimesheetData);
      setTableData(data.allTimesheetData);
    } catch (error) {
      console.log("error from get timesheet api", error);
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

  const getSuperAdmin = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/super-admin/?companyID=${companyID}`,
        config
      );
      allTheEmployee.push(...data.superAdmin);
      setSuperAdmin(data.superAdmin);
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

  useEffect(() => {
    getAllUser();
    getAllManager();
    getAllSubAdmin();
    getSuperAdmin()
  }, []);

  // dailog

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose1 = () => {
    setOpen(false);
  };

  const [aproveFilterBy, setAproveFilterBy] = useState("byEmployee")
  const [allsubmitedTimesheet, setAllsubmitedTimesheet] = useState([])

  const handleChangeForFilter = (e) => {
    setAproveFilterBy(e.target.value)
  }



  const aproveTimesheet = async (itemID) => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/aprove-timesheet/?timesheetID=${itemID}`, config)
      if (data.updatedTimesheet) {
        TimesheetAprovedNotfy()
        // handleClose1()
        setNewData(data)
      }
    }
    catch (error) {
      console.log("aproveTimesheet error", error)
    }
  }


  useEffect(() => {
    const getAllSubmitedTimesheet = async () => {

      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/all-submited-timesheet/?companyID=${companyID}`,
          config
        );
        setAllsubmitedTimesheet(data.allTimesheetData);
      } catch (error) {
        console.log("error from get timesheet api", error);
      }
    }
    if (aproveFilterBy != "byEmployee") {
      getAllSubmitedTimesheet()
    }
  }, [aproveFilterBy, newData])


  const TimesheetAprovedNotfy = () => {
    toast.success('Timesheet has been aproved', {
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
      {/* Row 1 */}
      <ToastContainer />

      <div
        className={sideBarStatus ? "content_right_dashboard" : "none"}
        style={
          (sideBarStatus == true) & (forPhoneScreenNoDisplay == false)
            ? { display: "none" }
            : { display: "block" }
        }
      >
        <Row>
          <div
            className="hamburgar"
            style={sideBarStatus ? { display: "none" } : { display: "block" }}
          >
            <i onClick={handleClick} className="fas fa-bars"></i>
          </div>
          <Col md={12} className="dash-container3">
            <div className="header-top3">
              <div className="dash-header1">
                <h5 style={
                  sideBarStatus == true
                    ? { paddingLeft: "10px", paddingTop: "2px" }
                    : { paddingLeft: "60px", paddingTop: "4px" }
                }>
                  Timesheets
                </h5>
              </div>

              <div className="dash-header2">
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
        <div className="adminlayout">
          <div className="mainContainer">
            {/*
            <Row>
              <Col md={12}>
                <div className="expense-calender">
                  <div className="calender1">
                    <div className="time-div1">
                      <div>
                        <i className="fa-sharp fa-solid fa-angle-left time1"></i>
                      </div>

                      <div className="middle-text-bill">
                        <p>
                          <span> Oct 14, 2023 -Oct 09, 2023</span>{" "}
                        </p>
                      </div>
                      <div className="calender">
                        <i class="fa-solid fa-calendar-days"></i>
                      </div>

                      <div>
                        <i className="fa-sharp fa-solid fa-angle-right time3"></i>
                      </div>
                    </div>

                    <div className="time-div2">
                      <Form.Select
                        className="drop-div"
                        aria-label="Default select example"
                      >
                        <option value="selected">Select</option>
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value="3"></option>
                      </Form.Select>
                    </div>
                  </div>

                  <div className="list">
                    <div className="list1">
                      <p className="para1">Send to Quickbooks</p>
                      <p>Move to Archieve</p>
                      <p>Reject</p>
                      <p>Delete</p>
                      <p>Print</p>
                    </div>

                    <div className="searchbar2">
                      <p>Search</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                      >
                        <path
                          d="M26.7592 24.6908L21.2461 19.1777C22.5734 17.4108 23.2899 15.26 23.2875 13.05C23.2875 7.40508 18.6949 2.8125 13.05 2.8125C7.40508 2.8125 2.8125 7.40508 2.8125 13.05C2.8125 18.6949 7.40508 23.2875 13.05 23.2875C15.26 23.2899 17.4108 22.5734 19.1777 21.2461L24.6908 26.7592C24.9699 27.0086 25.3339 27.1418 25.708 27.1313C26.0822 27.1209 26.4382 26.9676 26.7029 26.7029C26.9676 26.4382 27.1209 26.0822 27.1313 25.708C27.1418 25.3339 27.0086 24.9699 26.7592 24.6908ZM5.7375 13.05C5.7375 11.6037 6.16637 10.1899 6.96988 8.98739C7.77339 7.78486 8.91544 6.8476 10.2516 6.29413C11.5878 5.74067 13.0581 5.59585 14.4766 5.87801C15.8951 6.16016 17.198 6.85661 18.2207 7.87928C19.2434 8.90195 19.9398 10.2049 20.222 11.6234C20.5041 13.0419 20.3593 14.5122 19.8059 15.8484C19.2524 17.1846 18.3151 18.3266 17.1126 19.1301C15.9101 19.9336 14.4963 20.3625 13.05 20.3625C11.1113 20.3602 9.25271 19.589 7.88185 18.2182C6.51099 16.8473 5.73983 14.9887 5.7375 13.05Z"
                          fill="#C1C1C1"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Col>
            </Row> */}

            <div className="admin">
              <div className="aproveFilterBy_parent">
                <h1 style={aproveFilterBy == "byEmployee" ? { display: "block", marginTop: "30px" } : { display: "none" }}>Super Admin</h1>
                <h1 style={aproveFilterBy == "byEmployee" ? { display: "none" } : { display: "block", marginTop: "30px" }}>Submited</h1>
                <Form.Select
                  className="input-menu-focus submit_data_filter"
                  style={{ cursor: 'pointer' }}
                  name="state"
                  aria-label="Default select example"
                  onChange={handleChangeForFilter}
                >
                  <option default value="byEmployee">By Employee</option>
                  <option value="byStatus">By Status</option>
                </Form.Select>
              </div>


              {/* Table for super admin */}



              <Paper style={aproveFilterBy == "byEmployee" ? { display: "block" } : { display: "none" }} sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 360 }}>
                  <Table
                    stickyHeader
                    aria-label="sticky table"
                    style={{ overflow: "hidden", cursor: "pointer" }}
                  >
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              minWidth: column.minWidth,
                              background: "#04542C",
                              color: "#fff",
                              textAlign: "center",
                            }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody
                      style={{ overflow: "hidden", cursor: "pointer" }}
                    >
                      {superAdmin
                        ? superAdmin?.map((item, index) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={index}
                              onClick={() => handleClickForOneUser(item?._id)}
                            >
                              <TableCell align="center">{item?.name}</TableCell>
                              <TableCell align="center">{item?.email}</TableCell>
                              <TableCell align="center">{item?.phone}</TableCell>
                              <TableCell align="center">{item?.role}</TableCell>
                              <TableCell align="center">
                                {/* {item?.createdAt}{" "} */}
                                <i
                                  className="fa-regular fa-folder-open userIconsHover"
                                  style={{
                                    color: "#FF9E00",
                                    marginLeft: "10px",
                                    fontSize: "25px",
                                    cursor: "pointer",
                                  }}
                                ></i>
                              </TableCell>
                            </TableRow>
                          );
                        })
                        : data?.map((item, index) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={index}
                            >
                              <TableCell align="center">{item?.name}</TableCell>
                              <TableCell align="center">{item?.email}</TableCell>
                              <TableCell align="center">{item?.phone}</TableCell>
                              <TableCell align="center">{item?.role}</TableCell>
                              <TableCell align="center">
                                {item?.createdAt}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Dialog
                  style={{ padding: "40px" }}
                  open={open}
                  keepMounted
                  onClose={handleClose1}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <AproveTimesheetTable
                    columns={columnsForTimesheetTable}
                    userTimesheetInfo={tableData}
                    handleClose1={handleClose1}
                  />
                </Dialog>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={allUser?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>

              {/* Table for all submited timesheet  */}

              <Paper style={aproveFilterBy == "byEmployee" ? { display: "none" } : { display: "block" }} sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 360 }}>
                  <Table
                    stickyHeader
                    aria-label="sticky table"
                    style={{ overflow: "hidden", cursor: "pointer" }}
                  >
                    <TableHead>
                      <TableRow>
                        {columnsForAllSubmitedTimesheetTable.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              minWidth: column.minWidth,
                              background: "#04542C",
                              color: "#fff",
                              textAlign: "center",
                            }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody
                      style={{ overflow: "hidden", cursor: "pointer" }}
                    >
                      {allsubmitedTimesheet
                        ? allsubmitedTimesheet?.map((item, index) => {
                          return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                              <TableCell style={{ textAlign: 'center' }}>{item?.date}</TableCell>
                              <TableCell style={{ textAlign: 'center' }}>{item?.userName}</TableCell>
                              <TableCell style={{ textAlign: 'center' }}>{item?.hours}</TableCell>
                              <TableCell style={{ textAlign: 'center' }}>{item?.state}</TableCell>
                              <TableCell style={{ textAlign: 'center' }}>{item?.task}</TableCell>
                              <TableCell style={{ textAlign: 'center' }}>{item?.project}</TableCell>
                              <TableCell style={{ textAlign: 'center' }}>{item?.createdAt}  </TableCell>
                              <TableCell style={{ textAlign: 'center' }}> <i onClick={() => (aproveTimesheet(item?._id))} class="fa-solid fa-thumbs-up" style={{ color: '#73c31d', paddingLeft: '30px', fontSize: '20px' }}></i>  </TableCell>

                            </TableRow>
                          );
                        })
                        : data?.map((item, index) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={index}
                            >
                              <TableCell align="center">{item?.name}</TableCell>
                              <TableCell align="center">{item?.email}</TableCell>
                              <TableCell align="center">{item?.phone}</TableCell>
                              <TableCell align="center">{item?.role}</TableCell>
                              <TableCell align="center">
                                {item?.createdAt}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Dialog
                  style={{ padding: "40px" }}
                  open={open}
                  keepMounted
                  onClose={handleClose1}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <AproveTimesheetTable
                    columns={columnsForTimesheetTable}
                    userTimesheetInfo={tableData}
                    handleClose1={handleClose1}
                  />
                </Dialog>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={allUser?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </div>

            <div style={aproveFilterBy == "byEmployee" ? { display: "block" } : { display: "none" }} className="admin">
              <h1>Admin</h1>
              {/* Table  */}

              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 360 }}>
                  <Table
                    stickyHeader
                    aria-label="sticky table"
                    style={{ overflow: "hidden", cursor: "pointer" }}
                  >
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              minWidth: column.minWidth,
                              background: "#04542C",
                              color: "#fff",
                              textAlign: "center",
                            }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody
                      style={{ overflow: "hidden", cursor: "pointer" }}
                    >
                      {allSubAdmin
                        ? allSubAdmin?.map((item, index) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={index}
                              onClick={() => handleClickForOneUser(item?._id)}
                            >
                              <TableCell align="center">{item?.name}</TableCell>
                              <TableCell align="center">{item?.email}</TableCell>
                              <TableCell align="center">{item?.phone}</TableCell>
                              <TableCell align="center">{item?.role}</TableCell>
                              <TableCell align="center">
                                {/* {item?.createdAt}{" "} */}
                                <i
                                  className="fa-regular fa-folder-open userIconsHover"
                                  style={{
                                    color: "#FF9E00",
                                    marginLeft: "10px",
                                    fontSize: "25px",
                                    cursor: "pointer",
                                  }}
                                ></i>
                              </TableCell>
                            </TableRow>
                          );
                        })
                        : data?.map((item, index) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={index}
                            >
                              <TableCell align="center">{item?.name}</TableCell>
                              <TableCell align="center">{item?.email}</TableCell>
                              <TableCell align="center">{item?.phone}</TableCell>
                              <TableCell align="center">{item?.role}</TableCell>
                              <TableCell align="center">
                                {item?.createdAt}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Dialog
                  style={{ padding: "40px" }}
                  open={open}
                  keepMounted
                  onClose={handleClose1}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <AproveTimesheetTable
                    columns={columnsForTimesheetTable}
                    userTimesheetInfo={tableData}
                    handleClose1={handleClose1}
                  />
                </Dialog>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={allUser?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </div>

            <div style={aproveFilterBy == "byEmployee" ? { display: "block" } : { display: "none" }} className="manager">
              <h1>Manager</h1>
              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 360 }}>
                  <Table
                    stickyHeader
                    aria-label="sticky table"
                    style={{ overflow: "hidden" }}
                  >
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              minWidth: column.minWidth,
                              background: "#04542C",
                              color: "#fff",
                              textAlign: "center",
                            }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody
                      style={{ overflow: "hidden", cursor: "pointer" }}
                    >
                      {allManager
                        ? allManager?.map((item, index) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={index}
                              onClick={() => handleClickForOneUser(item?._id)}
                            >
                              <TableCell align="center">{item?.name}</TableCell>
                              <TableCell align="center">{item?.email}</TableCell>
                              <TableCell align="center">{item?.phone}</TableCell>
                              <TableCell align="center">{item?.role}</TableCell>
                              <TableCell align="center">
                                {/* {item?.createdAt}{" "} */}
                                <i
                                  className="fa-regular fa-folder-open userIconsHover"
                                  style={{
                                    color: "#FF9E00",
                                    marginLeft: "10px",
                                    fontSize: "25px",
                                  }}
                                ></i>
                              </TableCell>
                            </TableRow>
                          );
                        })
                        : data?.map((item, index) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={index}
                            >
                              <TableCell align="center">{item?.name}</TableCell>
                              <TableCell align="center">{item?.email}</TableCell>
                              <TableCell align="center">{item?.phone}</TableCell>
                              <TableCell align="center">{item?.role}</TableCell>
                              <TableCell align="center">
                                {item?.createdAt}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={allUser?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </div>
            <div style={aproveFilterBy == "byEmployee" ? { display: "block" } : { display: "none" }} className="user">
              <h1>User</h1>
              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 360 }}>
                  <Table
                    stickyHeader
                    aria-label="sticky table"
                    style={{ overflow: "hidden" }}
                  >
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              minWidth: column.minWidth,
                              background: "#04542C",
                              color: "#fff",
                              textAlign: "center",
                            }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody
                      style={{ overflow: "hidden", cursor: "pointer" }}
                    >
                      {allUser
                        ? allUser?.map((item, index) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={index}
                              onClick={() => handleClickForOneUser(item?._id)}
                            >
                              <TableCell align="center">{item?.name}</TableCell>
                              <TableCell align="center">{item?.email}</TableCell>
                              <TableCell align="center">{item?.phone}</TableCell>
                              <TableCell align="center">{item?.role}</TableCell>
                              <TableCell align="center">
                                {/* {item?.createdAt}{" "} */}
                                <i
                                  className="fa-regular fa-folder-open userIconsHover"
                                  style={{
                                    color: "#FF9E00",
                                    marginLeft: "10px",
                                    fontSize: "25px",
                                  }}
                                ></i>
                              </TableCell>
                            </TableRow>
                          );
                        })
                        : data?.map((item, index) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={index}
                            >
                              <TableCell align="center">{item?.name}</TableCell>
                              <TableCell align="center">{item?.email}</TableCell>
                              <TableCell align="center">{item?.phone}</TableCell>
                              <TableCell align="center">{item?.role}</TableCell>
                              <TableCell align="center">
                                {item?.createdAt}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={allUser?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TimesheetAprove;
