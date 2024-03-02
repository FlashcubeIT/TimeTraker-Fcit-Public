

import * as React from 'react';
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

const columns = [
    { id: 'task', label: 'Task', minWidth: 100 },
    { id: 'status', label: 'Status', minWidth: 170 },
    {
        id: 'taskcreated',
        label: 'Created Task',
        minWidth: 170,
        align: 'center'
    },
    { id: 'Delete', label: 'Delete', minWidth: 100 }
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

export default function StickyHeadTable({ taskInfo, handleDataFromChild }) {

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
        toast.success('Your task has been deleted', {
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
            const { data } = await axios.delete(`http://localhost:8000/api/delete-task/?taskID=${itemID}`, config)
            console.log(data)
            TimesheetDeleteNotfy()
            handleDataFromChild(data)
        } catch (error) {
            console.log('error', error)
        }
    }


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
                        {taskInfo
                            ? taskInfo?.map((item, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        <TableCell align="center">{item?.task}</TableCell>
                                        <TableCell align="center">{item?.status}</TableCell>
                                        <TableCell align="center">{item?.createdAt}  </TableCell>
                                        <TableCell align="center">  <i onClick={() => (deleteData(item?._id))} style={{ color: 'red', fontSize: '20px' }} className="fa-sharp fa-solid fa-trash userIconsHover" ></i> </TableCell>

                                    </TableRow>
                                );
                            })
                            : data?.map((item, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        <TableCell>{item?.task}</TableCell>
                                        <TableCell>{item?.status}</TableCell>
                                        <TableCell align="center">{item?.createdAt}  </TableCell>
                                        <TableCell align="center">  <i onClick={() => (deleteData(item?._id))} style={{ color: 'red', fontSize: '20px' }} className="fa-sharp fa-solid fa-trash userIconsHover" ></i> </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={taskInfo?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}