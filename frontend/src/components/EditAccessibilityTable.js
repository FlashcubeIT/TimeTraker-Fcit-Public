import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import "./TableDesign.css";
import { useState } from "react";
import {
  DialogTitle,
  Checkbox,
  Dialog,
  FormControlLabel,
  DialogActions,
  DialogContent,
  Button,
  Grid,
} from "@mui/material";
import { EightK } from "@mui/icons-material";

const columns = [
  { id: "Role", label: "Role", minWidth: 170 },
  { id: "Edit", label: "Edit", minWidth: 170 },
];

// temporory data

export default function StickyHeadTable() {


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



  //config

  const config = {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`
    },
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // console.log('taskInfo in table', projectInfo.project);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [role, setRole] = useState("");
  const [accessibility, setAcceessibility] = useState({
    project: false,
    employe: false,
    task: false,
    myTimesheets: false,
    myExpenses: false,
    expenses: false,
    timesheets: false,
    dashboard: false,
    sync: false,
    download: false,
    setupCustomization: false,
    reports: false,
    role: false,
    profile: false,
  });

  console.log("accessibility", accessibility);

  const handleCheckboxChange = (checkboxName) => {
    setAcceessibility((prevValues) => ({
      ...prevValues,
      [checkboxName]: !prevValues[checkboxName],
    }));
  };

  const handleEmployee = async () => {
    setRole("user");
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/get-accessibility-user",
        config
      );
      console.log("accessibility from backend", data);
      setAcceessibility(data.result);
    } catch (error) {
      console.log("error from edit accessibility", error);
    }
    handleClickOpen();
  };
  const handleManager = async () => {
    setRole("manager");
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/get-accessibility-manager",
        config
      );
      console.log("accessibility from backend", data);
      setAcceessibility(data.result);
    } catch (error) {
      console.log("error from edit accessibility", error);
    }
    handleClickOpen();
  };
  const handleAdmin = async () => {
    setRole("sub-admin");
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/get-accessibility-sub-admin",
        config
      );
      console.log("accessibility from backend", data);
      setAcceessibility(data.result);
    } catch (error) {
      console.log("error from edit accessibility", error);
    }
    handleClickOpen();
  };

  const handleSave = async () => {
    if (role === "user") {
      try {
        const { data } = await axios.post(
          "http://localhost:8000/api/update-user-accessibility",
          accessibility,
          config
        );
        console.log("data from update user", data);
      } catch (error) {
        console.log("error from edit accessibility", error);
      }
    } else if (role === "manager") {
      try {
        const { data } = await axios.post(
          "http://localhost:8000/api/update-manager-accessibility",
          accessibility,
          config
        );
        console.log("data from update manager", data);
      } catch (error) {
        console.log("error from edit accessibility", error);
      }
    } else if (role === "sub-admin") {
      try {
        const { data } = await axios.post(
          "http://localhost:8000/api/update-sub-admin-accessibility",
          accessibility,
          config
        );
        console.log("data from update manager", data);
      } catch (error) {
        console.log("error from edit accessibility", error);
      }
    }
    handleClose();
    setAcceessibility({
      project: false,
      employe: false,
      task: false,
      myTimesheets: false,
      myExpenses: false,
      expenses: false,
      timesheets: false,
      dashboard: false,
      sync: false,
      download: false,
      setupCustomization: false,
      reports: false,
      role: false,
      profile: false,
    });
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        background: "#fff",
        padding: "50px",
        borderRadius: "50px",
        height: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TableContainer sx={{ maxHeight: 360 }}>
        <Table
          stickyHeader
          aria-label="sticky table"
          style={{ overflow: "hidden", border: '1px solid lightgray', borderRadius: '20px' }}
        >
          <TableHead>
            <TableRow style={{ borderRadius: "50px" }}>
              {columns.map((column) => {
                let left = ""
                if (column.id == "Role") {
                  left = { background: '#04542C', borderTopLeftRadius: '15px', textAlign: 'center', fontSize: '18px', color: "#fff" }
                } else if (column.id == "Edit") {
                  left = { background: '#04542C', borderTopRightRadius: '15px', textAlign: 'center', fontSize: '18px', color: "#fff" }
                } else {

                }

                return (
                  <TableCell
                    className="lable_bold"
                    key={column.id}
                    align={column.align}
                    style={left}

                  >
                    {column.label}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>

          <TableBody style={{ overflow: "hidden" }}>
            <TableRow
              onClick={handleEmployee}
              hover
              role="checkbox"
              tabIndex={-1}
              style={{ cursor: "pointer" }}
            >
              <TableCell align="center" className="lable_bold" style={{ fontSize: "16px" }}>
                {" "}
                Employee
              </TableCell>
              <TableCell align="center" >
                {" "}
                <i
                  class="fa-solid fa-pen-to-square userIconsHover"
                  style={{ color: "#73C31D", fontSize: "23px" }}
                ></i>
              </TableCell>
            </TableRow>
            <TableRow
              onClick={handleManager}
              hover
              role="checkbox"
              tabIndex={-1}
              style={{ cursor: "pointer" }}
            >
              <TableCell align="center" className="lable_bold" style={{ fontSize: "16px" }}>
                Manager{" "}
              </TableCell>
              <TableCell align="center">
                <i
                  class="fa-solid fa-pen-to-square userIconsHover"
                  style={{ color: "#73C31D", fontSize: "23px" }}
                ></i>
              </TableCell>
            </TableRow>
            <TableRow
              onClick={handleAdmin}
              hover
              role="checkbox"
              tabIndex={-1}
              style={{ cursor: "pointer" }}
            >
              <TableCell className="lable_bold" align="center" style={{ fontSize: "16px" }}>
                Admin{" "}
              </TableCell>
              <TableCell align="center">
                <i
                  class="fa-solid fa-pen-to-square userIconsHover"
                  style={{ color: "#73C31D", fontSize: "23px" }}
                ></i>
              </TableCell>
            </TableRow>
            <TableRow
              style={{ height: "56px" }}
              hover
              role="checkbox"
              tabIndex={-1}
            >
              <TableCell> </TableCell>
              <TableCell style={{ textAlign: "right" }}></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div
            style={{
              width: "100%",
              display: "flex",
              margin: "20px 0px 30px 0px",
            }}
          >
            <p
              style={{
                widthL: "200px",
                background: "#73C31D",
                borderRadius: "10px",
                color: "black",
                padding: "6px 30px",
              }}
            >
              Role Permission
            </p>
          </div>
          <div
            style={{ width: "100%", padding: "0px 30px", margin: "10px 0px" }}
          >
            <p style={{ textAlign: "center" }}>
              You have the option to choose which features this user may view or
              update. Once selected, these preferences will be applied to all
              users holding this assigned role.
            </p>
          </div>
          <Grid container>
            <Grid className="gridItem" xs={12} md={6} lg={6} item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  color: "white",
                  background: "#04542C",
                  borderRadius: "10px",
                }}
              >
                <p style={{ color: "white", margin: "0px", padding: "6px" }}>
                  Maintain
                </p>
                <p style={{ color: "white", margin: "0px", padding: "6px" }}>
                  Accessibility
                </p>
              </div>
              <FormControlLabel
                className="accessibility_lable"
                control={<Checkbox />}
                checked={accessibility.project}
                label="Project"
                labelPlacement="Project"
                onChange={() => handleCheckboxChange("project")}
              />
              <FormControlLabel
                className="accessibility_lable"
                control={<Checkbox />}
                checked={accessibility.employe}
                label="Employe"
                labelPlacement="Employe"
                onChange={() => handleCheckboxChange("employe")}
              />
              <FormControlLabel
                className="accessibility_lable"
                control={<Checkbox />}
                checked={accessibility.task}
                label="Task"
                labelPlacement="Task"
                onChange={() => handleCheckboxChange("task")}
              />
              <FormControlLabel
                className="accessibility_lable"
                control={<Checkbox />}
                checked={accessibility.myTimesheets}
                label="My Timesheets"
                labelPlacement="My Timesheets"
                onChange={() => handleCheckboxChange("myTimesheets")}
              />
              <FormControlLabel
                className="accessibility_lable"
                control={<Checkbox />}
                checked={accessibility.myExpenses}
                label="My Expenses"
                labelPlacement="My Expenses"
                onChange={() => handleCheckboxChange("myExpenses")}
              />
              <FormControlLabel
                className="accessibility_lable"
                control={<Checkbox />}
                checked={accessibility.expenses}
                label="Expenses"
                labelPlacement="Expenses"
                onChange={() => handleCheckboxChange("expenses")}
              />
              <FormControlLabel
                className="accessibility_lable"
                control={<Checkbox />}
                checked={accessibility.timesheets}
                label="Timesheets"
                labelPlacement="Timesheets"
                onChange={() => handleCheckboxChange("timesheets")}
              />
              <FormControlLabel
                className="accessibility_lable"
                control={<Checkbox />}
                checked={accessibility.dashboard}
                label="Dashboard"
                labelPlacement="Dashboard"
                onChange={() => handleCheckboxChange("dashboard")}
              />
            </Grid>
            <Grid className="gridItem" xs={12} md={6} lg={6} item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  color: "white",
                  background: "#04542C",
                  borderRadius: "10px",
                }}
              >
                <p style={{ color: "white", margin: "0px", padding: "6px" }}>
                  Other
                </p>
                <p style={{ color: "white", margin: "0px", padding: "6px" }}>
                  Accessibility
                </p>
              </div>
              <FormControlLabel
                className="accessibility_lable"
                control={<Checkbox />}
                checked={accessibility.sync}
                label="Sync"
                labelPlacement="Sync"
                onChange={() => handleCheckboxChange("sync")}
              />
              <FormControlLabel
                className="accessibility_lable"
                control={<Checkbox />}
                checked={accessibility.download}
                label="Download"
                labelPlacement="Download"
                onChange={() => handleCheckboxChange("download")}
              />
              <FormControlLabel
                className="accessibility_lable"
                control={<Checkbox />}
                checked={accessibility.setupCustomization}
                label="Setup Customization"
                labelPlacement="Setup Customization"
                onChange={() => handleCheckboxChange("setupCustomization")}
              />
              <FormControlLabel
                className="accessibility_lable"
                control={<Checkbox />}
                checked={accessibility.reports}
                label="Reports"
                labelPlacement="Reports"
                onChange={() => handleCheckboxChange("reports")}
              />
              <FormControlLabel
                className="accessibility_lable"
                control={<Checkbox />}
                checked={accessibility.role}
                label="Role"
                labelPlacement="Role"
                onChange={() => handleCheckboxChange("role")}
              />
              <FormControlLabel
                className="accessibility_lable"
                control={<Checkbox />}
                checked={accessibility.profile}
                label="Profile"
                labelPlacement="Profile"
                onChange={() => handleCheckboxChange("profile")}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSave} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
