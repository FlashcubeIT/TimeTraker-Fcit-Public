

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import "./TableDesign.css"

const columns = [
    { id: 'Employee', label: 'Employee', minWidth: 100 },
    { id: 'Hours', label: 'Hours', minWidth: 100 }
];

// temporory data

const data = [
    {
        employee: 'Employee',
        hours: 'Hours',
    },
    {
        employee: 'Employee',
        hours: 'Hours',
    },
    {
        employee: 'Employee',
        hours: 'Hours',
    }

];

export default function StickyHeadTable({ newArray }) {





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


    return (
        <Paper style={{width: '97%'}} sx={{ width: '100%', overflow: 'hidden', marginTop:'30px' }}>
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
                    <TableBody style={{ overflow: 'hidden'}}>
                        {newArray
                            ? newArray?.map((item, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        <TableCell align="center">{item?.UserName}</TableCell>
                                        <TableCell align="center">{item?.Hours}</TableCell>
                                      
                                   
                                    </TableRow>
                                );
                            })
                            : data?.map((item, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        <TableCell align="center">{item?.userName}</TableCell>
                                        <TableCell align="center">{item?.hours}</TableCell>
                                     
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={newArray?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}