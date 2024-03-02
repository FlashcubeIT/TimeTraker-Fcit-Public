import React, { useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import "./TableDesign.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Form from "react-bootstrap/Form";

const columns = [
    { id: 'hours', label: 'Hours', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 100 },
    { id: 'project', label: 'Project', minWidth: 100 },
    { id: 'task', label: 'Task', minWidth: 100 },
    { id: 'status', label: 'Status', minWidth: 100 },
    { id: 'submit', label: 'Submit', minWidth: 100 },
    { id: 'edit', label: 'Edit', minWidth: 100 },
    { id: 'delete', label: 'Delete', minWidth: 100 },
];


// temporory data

const data = [
    {
        task: 'Development',
        status: 'Active',
        createdAt: '2023-06-07T04:12:17.986Z'
    },
    {
        task: 'Development',
        status: 'Active',
        createdAt: '2023-06-07T04:12:17.986Z'
    },
    {
        task: 'Development',
        status: 'Active',
        createdAt: '2023-06-07T04:12:17.986Z'
    },

];

export default function StickyHeadTable({ userTimesheetInfo, handleDataFromChild }) {

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

    const [projectInfo, setProjectInfo] = useState([]);
    const [taskInfo, setTaskInfo] = useState([]);
    const [selactedTask, setSelactedTask] = useState("")
    const [selactedProject, setSelactedProject] = useState("")
    const [formData, setFormData] = useState({
        userID: userID,
        companyID: companyID,
        date: "",
        hours: "",
        project: "",
        task: "",
    });

    //config 

    const config = {
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    };



    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const handleInputChangeTask = (e) => {
        setSelactedTask(e.target.value)
    }

    const handleInputChangeProject = (e) => {
        setSelactedProject(e.target.value)
    }


    const deleteData = async (itemID) => {
        try {
            const { data } = await axios.delete(`http://localhost:8000/api/delete-timesheet/?timesheetID=${itemID}`, config)
            console.log(data)
            handleDataFromChild(data)
            TimesheetDeleteNotfy()
        } catch (error) {
            console.log(error)
        }

    }



    const submitTimesheet = async (itemID) => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/submit-timesheet/?timesheetID=${itemID}`, config)
            console.log(data)
            handleDataFromChild(data)
            TimesheetSubmitNotfy()
        }
        catch (error) {
            console.log("submitTimesheet error", error)
        }
    }


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






    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };




    const [dataNeedToEdit, setDataNeedToEdit] = useState()

    const handleDailogBoxOpen = async (_id, hours, date, project, task, description) => {
        setDataNeedToEdit({
            _id: _id,
            description: description,
            task: task, 
            project: project, 
            date: date, 
            hours: hours
        })
        setFormData({
            description: description,
            task: task, 
            project: project, 
            date: date, 
            hours: hours
        })
        setSelactedTask(task)
        setSelactedProject(project)
        handleClickOpen()
    }






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
        console.log("formData", formData)
        if (formData.task == "" || formData.project == "" || formData.hours == "" || formData.date == "") {
            alert("all the feilds required");
        } else {
            postTimesheetData();
            // console.log("formData",formData)
        }
    };

    const postTimesheetData = async () => {
        try {
          const { data } = await axios.post(
            `http://localhost:8000/api/edit-timesheet`,
            {
              date: formData.date,
              task: selactedTask,
              project: selactedProject,
              description: formData.description,
              hours: formData.hours,
              _id : dataNeedToEdit._id
            },
            config
          );
          handleClose();
          if (data) {
            handleDataFromChild(data)
            alert("Your timesheet has been successfully updated.");
          }
        } catch (error) {
          console.log("error from post timesheet api", error);
        }
    };

    useEffect(() => {
        getAllTask();
        getAllProject();

    }, []);



    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 360 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead >
                        <TableRow >
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, background: '#04542C', color: '#fff', textAlign: 'center' }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {userTimesheetInfo
                            ? userTimesheetInfo?.map((item, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        <TableCell align="center">{item?.hours}</TableCell>
                                        <TableCell align="center">{item?.date}</TableCell>
                                        <TableCell align="center">{item?.project}</TableCell>
                                        <TableCell align="center">{item?.task}</TableCell>
                                        <TableCell align="center">{item?.state}</TableCell>
                                        <TableCell align="center"> <i onClick={() => (item?.state == 'hold' ?  submitTimesheet(item?._id) : console.log(""))} style={ item?.state == 'hold' ? { color: 'green', paddingLeft: '0px', fontSize: '20px', cursor: 'pointer' } : { color: 'gray', paddingLeft: '0px', fontSize: '20px', cursor: 'pointer' }} class="fa-solid fa-arrow-up-from-bracket userIconsHover "></i></TableCell>
                                        <TableCell align="center"><i onClick={() => (item?.state == 'hold' ? handleDailogBoxOpen
                                        (item?._id, item?.hours, item?.date, item?.project, item?.task, item?.description) : console.log('hello'))} style={ item?.state == 'hold' ? { color: 'green', paddingLeft: '0px', fontSize: '20px', cursor: 'pointer' } : { color: 'gray', paddingLeft: '0px', fontSize: '20px', cursor: 'pointer' }} class="fa-solid fa-pen-to-square userIconsHover"></i></TableCell>
                                        <TableCell align="center"> <i onClick={() => (item?.state == 'hold' ? deleteData(item?._id): console.log('you cant delete this timesheet'))} style={item?.state == 'hold' ? { color: 'red', fontSize: '20px', cursor: 'pointer' } : { color: 'gray', fontSize: '20px', cursor: 'pointer' }} className="fa-sharp fa-solid fa-trash userIconsHover "></i></TableCell>
                                    </TableRow>
                                )


                            })
                            : data?.map((item, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        <TableCell align="center">{item?.hours}</TableCell>
                                        <TableCell align="center">{item?.date}</TableCell>
                                        <TableCell align="center">{item?.project}</TableCell>
                                        <TableCell align="center">{item?.task}</TableCell>
                                        <TableCell align="center">{item?.state}</TableCell>
                                        <TableCell align="center">{item?.createdAt}</TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={userTimesheetInfo?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />




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
                                    defaultValue={dataNeedToEdit?.hours}
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
                                    defaultValue={dataNeedToEdit?.date}
                                    name="date"
                                    type="date"
                                    onChange={handleInputChange}
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
                                    value={selactedProject}
                                    className="area"
                                    name="project"
                                    aria-label="Default select example"
                                    required
                                    onChange={handleInputChangeProject}
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
                                    value={selactedTask}
                                    className="area"
                                    name="task"
                                    aria-label="Default select example"
                                    required
                                    onChange={handleInputChangeTask}
                                >
                                    <option value="">Select</option>
                                    {taskInfo &&
                                        taskInfo.map((item, index) => {
                                            return (
                                                <option  value={item.task}>
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
                            <textarea onChange={handleInputChange} type="text" name="description" id="">
                                {dataNeedToEdit?.description}
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
        </Paper>
    );
}
