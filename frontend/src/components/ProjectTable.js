


import * as React from 'react';
import { useState } from 'react';
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
import Dialog from "@mui/material/Dialog";
import { Form } from "react-bootstrap";

const columns = [
    { id: 'Project', label: 'Project', minWidth: 100 },
    { id: 'status', label: 'Status', minWidth: 170 },
    {
        id: 'taskcreated',
        label: 'Created Project',
        minWidth: 170,
        align: 'center'
    },
    { id: 'Edit', label: 'Edit', minWidth: 100 },
    { id: 'Delete', label: 'Delete', minWidth: 100 }
];

// temporory data

const data = [
    {
        project: 'Development',
        status: 'Active',
        createdAt: '2023-06-07T04:12:17.986Z'
    },
    {
        project: 'Development',
        status: 'Active',
        createdAt: '2023-06-07T04:12:17.986Z'
    },
    {
        project: 'Development',
        status: 'Active',
        createdAt: '2023-06-07T04:12:17.986Z'
    },

];

export default function StickyHeadTable({ projectInfo, handleDataFromChild }) {

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
            Accept: 'application/json',
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    };


    const TimesheetDeleteNotfy = () => {
        toast.success('Your project has been deleted', {
            position: 'top-right',
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
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


    const deleteData = async (itemID) => {
        try {
            const { deletedProject } = await axios.delete(`http://localhost:8000/api/delete-project/?projectID=${itemID}`, config)

            handleDataFromChild(deletedProject)
            TimesheetDeleteNotfy()
        } catch (error) {
            console.log('error', error)
        }
    }


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [formData, setFormData] = useState({
         companyID: companyID 
    });

    console.log("formData", formData)
    const handleDailogBoxOpen = async (item) => {
        // setDataNeedToEdit({
        //     _id: _id,
        //     description: description,
        //     task: task, 
        //     project: project, 
        //     date: date, 
        //     hours: hours
        // })
        setFormData({
            _id: item._id,
            project: item.project,
            billable: item.billable,
            description: item.description
        })
        handleClickOpen()
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            handleClose();
            const { data } = await axios.post(
                `http://localhost:8000/api/edit-project`,
                formData,
                config
            );
      
            if (data) {
                handleDataFromChild(data)
                TimesheetEditNotfy()
            }
        } catch (error) {
            console.log("error from post timesheet api", error);
        }
    };

    const TimesheetEditNotfy = () => {
        toast.success('Your Project has been updated', {
            position: 'top-right',
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };


    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 360 }}>
                <Table stickyHeader aria-label="sticky table" style={{ overflow: 'hidden' }}>
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
                    <TableBody style={{ overflow: 'hidden' }}>
                        {projectInfo
                            ? projectInfo?.map((item, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        <TableCell>{item?.project}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item?.status}</TableCell>
                                        <TableCell align="center">{item?.createdAt} </TableCell>
                                        <TableCell align="center"><i onClick={()=>(handleDailogBoxOpen(item))}
                                            style={{ color: 'green', paddingLeft: '0px', fontSize: '20px', cursor: 'pointer' }} class="fa-solid fa-pen-to-square userIconsHover"></i></TableCell>
                                        <TableCell align="center"> <i onClick={() => (deleteData(item?._id))} style={{ color: 'red', fontSize: '20px' }} className="fa-sharp fa-solid fa-trash userIconsHover"></i> </TableCell>

                                    </TableRow>
                                );
                            })
                            : data?.map((item, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        <TableCell align="center">{item?.task}</TableCell>
                                        <TableCell align="center">{item?.status}</TableCell>
                                        <TableCell align="center">{item?.createdAt} </TableCell>
                                        <TableCell align="center"> <i onClick={() => (deleteData(item?._id))} style={{ color: 'red', fontSize: '20px' }} className="fa-sharp fa-solid fa-trash userIconsHover"></i> </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={projectInfo?.length}
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
                <div className="adduser " style={{ padding: "20px 50px", marginBottom: "47px" }}>
                    <form
                        onSubmit={handleSubmit}
                        action=""
                        className="adduser-form"
                        style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "20px" }}
                    >

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                            <div className="form1">
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

                            <div className="form2 ">

                                <div style={{ marginBottom: "13px", marginLeft: "10px" }} className="role-border projectInput">
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
                                className="project-textarea" style={{ width: "100%" }} ></textarea>
                        </div>
                        <div className="adduserBtn ">
                            <button type="submit" className="btn5">
                                Submit
                            </button>
                        </div>

                    </form>
                </div>
            </Dialog>
        </Paper>
    );
}
