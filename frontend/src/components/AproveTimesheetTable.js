

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
import { DialogActions, DialogContent, DialogTitle, Dialog, Button } from '@mui/material';
import "./TableDesign.css"
import './EditAccessibilityTable.css'


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

export default function StickyHeadTable({ userTimesheetInfo, columns, userExpenseInfo , handleClose1}) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    const [expenseId, setExpenseId] = React.useState('')
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };






    const aproveTimesheet = async (itemID) => {
        try{
        const { data } = await axios.get(`http://localhost:8000/api/aprove-timesheet/?timesheetID=${itemID}`, config)
        if(data){
            alert('Timesheet aproved')
            handleClose1()
        }
        }
        catch(error){
            console.log("aproveTimesheet error", error)
        }
    }

    const aproveExpense = async (itemID) => {
        try{
        const { data } = await axios.get(`http://localhost:8000/api/aprove-expense/?expenseID=${itemID}`, config)
   
        if(data){
            alert('Expense aproved')
            handleClose1()
        }
        }
        catch(error){
            console.log("aproveExpense error", error)
        }
    }

    const getImage = async (itemID) => {
        setExpenseId(itemID)
        handleClickOpen()
    }




    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 360 }}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead >
                        <TableRow style={{textAlign: 'center'}} >
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
                    <TableBody>
                        {userTimesheetInfo
                            ? userTimesheetInfo?.map((item, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        <TableCell  style={{textAlign: 'center'}}>{item?.date}</TableCell>
                                        <TableCell  style={{textAlign: 'center'}}>{item?.hours}</TableCell>
                                        <TableCell  style={{textAlign: 'center'}}>{item?.state}</TableCell>
                                        <TableCell  style={{textAlign: 'center'}}>{item?.task}</TableCell>
                                        <TableCell  style={{textAlign: 'center'}}>{item?.project}</TableCell>
                                        <TableCell  style={{textAlign: 'center'}}>{item?.createdAt}  <i onClick={()=>(aproveTimesheet(item?._id))} class="fa-solid fa-thumbs-up"  style={{color: '#73c31d', paddingLeft: '30px', fontSize: '20px'}}></i>  </TableCell>
                                      
                         
                                    </TableRow>
                                )


                            })
                            : userExpenseInfo ? userExpenseInfo?.map((item, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        <TableCell  style={{textAlign: 'center'}}>{item?.date}</TableCell>
                                        <TableCell  style={{textAlign: 'center'}}>{item?.amount}</TableCell>
                                        <TableCell  style={{textAlign: 'center'}}>{item?.state}</TableCell>
                                        <TableCell  style={{textAlign: 'center'}}>{item?.expense}</TableCell>
                                        <TableCell  style={{textAlign: 'center'}}>{item?.project}</TableCell>
                                        <TableCell  style={{textAlign: 'center'}}>{<i style={{color:'#134563', fontSize: '25px'}} onClick={() => (getImage(item?._id))} class="fa-solid fa-paperclip"></i>}</TableCell>
                                        <TableCell  style={{textAlign: 'center'}} >{item?.createdAt}  <i onClick={()=>(aproveExpense(item?._id))} class="fa-solid fa-thumbs-up"  style={{color: '#73c31d', paddingLeft: '30px', fontSize: '20px'}}></i>  </TableCell>
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
                                                <img style={{maxWidth: '100%'}} src={`http://localhost:8000/api/photo/${expenseId}`} alt='Expense Image'/>

                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose}>Close</Button>
                                           
                                            </DialogActions>
                                        </Dialog>

                                    </TableRow>
                                )


                            })
                            : data?.map((item, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>

                                      
                                        <TableCell  style={{textAlign: 'center'}}>{item?.status}</TableCell>
                                        <TableCell  style={{textAlign: 'center'}}>{item?.task}</TableCell>

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
        </Paper>
    );
}
