

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

const columns = [
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'phone', label: 'Phone', minWidth: 170 },
    { id: 'role', label: 'Role', minWidth: 170 },
    {
        id: 'createdAt',
        label: 'Created At',
        minWidth: 170,
        align: 'center'
    },
    {
        id: 'Delete',
        label: 'Delete',
        minWidth: 100,
        align: 'center'
    }
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

export default function StickyHeadTable({ allUser, handleDataFromChild }) {

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


    const deleteData = async (itemID, ItemRole) => {
        console.log(ItemRole)
        if (ItemRole == 'sub-admin') {
            try {
                const { deletedSubAdmin } = await axios.delete(`http://localhost:8000/api/delete-sub-asmin/?userID=${itemID}`, config)
                console.log(deletedSubAdmin)
                adminDeleteNotfy()
                handleDataFromChild(deletedSubAdmin)
            } catch (error) {
                console.log(error)
            }
        } else if (ItemRole == "manager") {
            try {
                const { deletedManager } = await axios.delete(`http://localhost:8000/api/delete-manager/?userID=${itemID}`, config)
                console.log(deletedManager)
                managerDeleteNotfy()
                handleDataFromChild(deletedManager)
            } catch (error) {
                console.log(error)
            }
        }
        else if (ItemRole == "user") {
            try {
                const { deletedUser } = await axios.delete(`http://localhost:8000/api/delete-user/?userID=${itemID}`, config)
                console.log(deletedUser)
                userDeleteNotfy()
                handleDataFromChild(deletedUser)
            } catch (error) {
                console.log(error)
            }
        } else {
            alert("you cant delete this user")
        }
    }


    const userDeleteNotfy = () => {
        toast.success('User has been deleted', {
            position: 'top-right',
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    
    const adminDeleteNotfy = () => {
        toast.success('Admin has been deleted', {
            position: 'top-right',
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const managerDeleteNotfy = () => {
        toast.success('Manager has been deleted', {
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
                    </TableHead  >
                    <TableBody style={{ overflow: 'hidden' }}>
                        {allUser
                            ? allUser?.map((item, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        <TableCell style={{ textAlign: 'center' }}>{item?.name}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item?.email}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item?.phone}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item?.role}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item?.createdAt} </TableCell>
                                        <TableCell> <i onClick={() => (deleteData(item?._id, item?.role))} style={{ color: 'red', fontSize: '20px' }} className="fa-sharp fa-solid fa-trash deleteIcon "></i> </TableCell>
                                    </TableRow>
                                );
                            })
                            : data?.map((item, index) => {
                                return (
                                    <TableRow style={{ textAlign: 'center' }} hover role="checkbox" tabIndex={-1} key={index}>
                                        <TableCell style={{ textAlign: 'center' }}>{item?.name}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item?.email}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item?.phone}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item?.role}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item?.createdAt}</TableCell>
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
    );
}