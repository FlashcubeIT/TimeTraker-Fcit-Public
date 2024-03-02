

import * as React from 'react';
import { useState, useEffect } from 'react';
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
import { DialogActions, DialogContent, DialogTitle, Dialog, Button } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form } from "react-bootstrap";

const columns = [
    { id: 'date', label: 'Date', minWidth: 110 },
    { id: 'type', label: 'Type', minWidth: 100 },
    { id: 'status', label: 'Status', minWidth: 100 },
    { id: 'project', label: 'Project', minWidth: 100 },
    { id: 'amount', label: 'Amount', minWidth: 100 },
    { id: 'description', label: 'Description', minWidth: 100 },
    { id: 'billable', label: 'Billable', minWidth: 110 },
    {
        id: 'receipt',
        label: 'Receipt',
        minWidth: 100,
        align: 'center'
    },
    { id: 'submit', label: 'Submit', minWidth: 100 },
    { id: 'edit', label: 'Edit', minWidth: 100 },
    { id: 'delete', label: 'Delete', minWidth: 100 },
];


// temporory data

const data = [
    {
        date: '01-12-2023',
        type: 'Meals & Entertainment',
        status: 'submitted',
        project: 'timesheet',
        amount: '5000',
        description: 'Inner pages design',
        billable: 'yes',
    },
    {
        date: '01-12-2023',
        type: 'Parking',
        status: 'hold',
        project: 'buzzmails landing',
        amount: '6000',
        description: 'web development',
        billable: 'yes',
    }

];

export default function StickyHeadTable({ userExpenseInfo, handleDataFromChild }) {


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





    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [expenseId, setExpenseId] = React.useState('')

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };



    const deleteData = async (itemID) => {
        console.log("itemID", itemID)
        try {
            const { deletedExpense } = await axios.delete(`http://localhost:8000/api/delete-expense/?expenseID=${itemID}`, config)
            console.log(deletedExpense)
            TimesheetDeleteNotfy()
            handleDataFromChild(deletedExpense)
        } catch (error) {
            console.log("error", error)
        }
    }

    const submitExpense = async (itemID) => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/submit-expense/?expenseID=${itemID}`, config)
            console.log(data)
            handleDataFromChild(data)
            TimesheetSubmitNotfy()
        } catch (error) {
            console.log("error", error)
        }
    }

    const getImage = async (itemID) => {
        setExpenseId(itemID)
        handleClickOpen()
    }


    // edit section

    const [selectProject, setSelectProject] = useState("");
    const [selectExpense, setSelectExpense] = useState("");
    const [selectPaidBy, setSelectPaidBy] = useState("");


    const [open2, setOpen2] = React.useState(false);

    const handleClickOpenEdit = () => {
        setOpen2(true);
    };

    const handleCloseEdit = () => {
        setOpen2(false);
    };

    const [formData, setFormData] = useState({
        userID: userID,
        companyID: companyID,
        date: "",
        hours: "",
        project: "",
        task: "",
    });
    console.log("formData", formData);

    const [dataNeedToEdit, setDataNeedToEdit] = useState()


    const handleDailogBoxOpen = async (item) => {
        setDataNeedToEdit({
            _id: item._id,
            description: item.description,
            project: item.project,
            date: item.date,
            amount: item.amount,
            expense: item.expense,
            paidBy: item.paidBy
        })
        setFormData({
            _id: item._id,
            description: item.description,
            project: item.project,
            date: item.date,
            amount: item.amount,
            expense: item.expense,
            paidBy: item.paidBy
        })
        setSelectPaidBy(item.paidBy)
        setSelectExpense(item.expense)
        setSelectProject(item.project)

        handleClickOpenEdit()
    }


    const [projectInfo, setProjectInfo] = useState([]);
    const [chartOfAccount, setChartOfAccount] = useState([]);


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
            handleCloseEdit();
            const { data } = await axios.post(
                `http://localhost:8000/api/edit-expense`,
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


    const TimesheetEditNotfy = () => {
        toast.success('Your expense has been updated', {
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
        getAllProject()
        getAllChartOfAccount()
    }, [])
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
                    <TableBody style={{ overflow: 'hidden', cursor: 'context-menu' }}>
                        {userExpenseInfo
                            ? userExpenseInfo?.map((item, index) => {

                                return (

                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        <TableCell style={{ width: '110px', textAlign: 'center' }} >{item?.date}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item?.expense}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item?.state}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item?.project ? item?.project : "NA"}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item?.amount}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item?.description ? item?.description : "NA"}</TableCell>
                                        <TableCell style={{ textAlign: 'center', minWidth: '110px' }}>{item?.billable == true ? "Billable" : "Not Billable"}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{<i style={{ color: '#134563', fontSize: '25px' }} onClick={() => (getImage(item?._id))} class="fa-solid fa-paperclip userIconsHover "></i>}</TableCell>
                                        {/* <TableCell  style={{textAlign: 'center'}}> <i onClick={() => (submitExpense(item?._id))} style={{ color: 'green', fontSize: '20px' }} class="fa-solid fa-arrow-up-from-bracket userIconsHover "></i>   </TableCell> */}
                                        <TableCell align="center"> <i onClick={() => (item?.state == 'hold' ? submitExpense(item?._id) : console.log(""))} style={item?.state == 'hold' ? { color: 'green', paddingLeft: '0px', fontSize: '20px', cursor: 'pointer' } : { color: 'gray', paddingLeft: '0px', fontSize: '20px', cursor: 'pointer' }} class="fa-solid fa-arrow-up-from-bracket userIconsHover "></i></TableCell>

                                        {/* <TableCell style={{ textAlign: 'center' }}>{<i onClick={() => (deleteData(item?._id))} style={{ color: 'red',  fontSize: '20px' }} className="fa-sharp fa-solid fa-trash userIconsHover "></i>}</TableCell> */}

                                        <TableCell align="center"><i onClick={() => (item?.state == 'hold' ? handleDailogBoxOpen
                                            (item) : console.log('hello'))} style={item?.state == 'hold' ? { color: 'green', paddingLeft: '0px', fontSize: '20px', cursor: 'pointer' } : { color: 'gray', paddingLeft: '0px', fontSize: '20px', cursor: 'pointer' }} class="fa-solid fa-pen-to-square userIconsHover"></i></TableCell>

                                        <TableCell align="center"> <i onClick={() => (item?.state == 'hold' ? deleteData(item?._id) : console.log('you cant delete this timesheet'))} style={item?.state == 'hold' ? { color: 'red', fontSize: '20px', cursor: 'pointer' } : { color: 'gray', fontSize: '20px', cursor: 'pointer' }} className="fa-sharp fa-solid fa-trash userIconsHover "></i></TableCell>
                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">
                                                {"Receipt Image"}
                                            </DialogTitle>
                                            <DialogContent>
                                                <img style={{ maxWidth: '100%' }} src={`http://localhost:8000/api/photo/${expenseId}`} alt='Expense Image' />

                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose}>Close</Button>

                                            </DialogActions>
                                        </Dialog>

                                    </TableRow>
                                );
                            })
                            :
                            data?.map((item, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        <TableCell>{item?.date}</TableCell>
                                        <TableCell>{item?.type}</TableCell>
                                        <TableCell>{item?.status}</TableCell>
                                        <TableCell>{item?.project}</TableCell>
                                        <TableCell>{item?.amount}</TableCell>
                                        <TableCell>{item?.description}</TableCell>
                                        <TableCell>{item?.billable}</TableCell>
                                        <TableCell style={{ textAlign: 'right' }}>{<i style={{ color: '#134563', fontSize: '25px' }} onClick={() => (getImage(item?._id))} class="fa-solid fa-paperclip"></i>}</TableCell>
                                        <TableCell align="center"> <i onClick={() => (submitExpense(item?._id))} style={{ color: 'green', paddingLeft: '30px', fontSize: '20px' }} class="fa-solid fa-arrow-up-from-bracket"></i>   </TableCell>
                                        <TableCell style={{ textAlign: 'right' }}>{<i onClick={() => (deleteData(item?._id))} style={{ color: 'red', paddingLeft: '30px', fontSize: '20px' }} className="fa-sharp fa-solid fa-trash"></i>}</TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={userExpenseInfo?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <Dialog
                open={open2}
                onClose={handleCloseEdit}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='expense-edit'
            >
                <div className="expense">
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
                                    defaultValue={formData.date}
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

                        </div>

                        <div className="form2">

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

                                    onChange={handleChange}
                                    type="text"
                                    name="description"
                                    id=""
                                    className="text-area"
                                >
                                    {dataNeedToEdit?.description}
                                </textarea>
                            </div>

                            <div className="expenseBtn expenseBtn_1">
                                <button type="submit" className="btn5" style={{ height: '40px' }} >
                                    Update
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </Dialog>

        </Paper>
    );
}
