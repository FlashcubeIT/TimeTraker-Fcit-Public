import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import axios from 'axios';
import "./ImportTimesheet.css"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ImportTimesheet = () => {

    const [open, setOpen] = React.useState(false);
    const [fileName, setFileName] = useState('');

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
    }
    if (userLoginInfo) {
        var companyID = userLoginInfo?.companyID;
 var token = userLoginInfo?.token
        var userID = userLoginInfo._id;
    }

    const [jsonData, setJsonData] = useState([])
    const [inputFile, setInputFile] = useState()

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileName(file.name);
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                // Assuming only one sheet exists in the Excel file
                const sheetName = workbook.SheetNames[0];
                const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
                setJsonData(jsonData)

            };

            reader.readAsArrayBuffer(file);
        }
    };


    const config = {
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
        },
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(jsonData)
        handleClose()
        try {
            const { data } = await axios.post(`http://localhost:8000/api/import-timesheet/?userID=${userID}&companyID=${companyID}`, jsonData, config)
            if (data) {
                window.location.reload();
            }
        } catch (error) {
            console.log("error", error)
        }
    }


    const reportFilteredData = [
        { date: '2023-11-19', userName: 'admin', task: 'web dev', project: 'timesheet', hours: 9, billable: 'yes' },
        { date: '2023-11-19', userName: 'admin', task: 'web dev', project: 'timesheet', hours: 9, billable: 'yes' },
        { date: '2023-11-20', userName: 'admin', task: 'web dev', project: 'timesheet', hours: 10, billable: 'yes' }
    ];

    const convertJsonToExcel = () => {
        if (!reportFilteredData || reportFilteredData.length === 0) {
            // Handle the case when there is no data
            return;
        }
        const dataWithHeadings = [
            ...reportFilteredData,
        ];

        // Convert JSON to Excel
        if (dataWithHeadings) {
            const ws = XLSX.utils.json_to_sheet(dataWithHeadings);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

            // Save the Excel file
            XLSX.writeFile(wb, `sample.xlsx`);
        }
    };




    return (

        <div className="button-container" >
            <button className='button-container-button' onClick={handleClickOpen} style={{ cursor: "pointer" }}>Import</button>


            <div>
                <Dialog
                    className='timeBoxsheet'
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                    sx={{ padding: "20px" }}
                >
                    <div className='timeBoxsheet'>
                        <form onSubmit={handleSubmit} >
                            <div className='inputFile' >
                                <h1>Select Excel File to Import</h1>
                                <input required type="file" value={inputFile} accept=".xlsx, .xls" onChange={handleFileChange} placeholder='Import' />

                            </div>
                            {fileName && <p>Selected File: <span style={{ fontWeight: "bold", color: "rgb(4, 84, 44)" }}>{fileName}</span></p>}

                            <div className='clickHead' >
                                <p onClick={convertJsonToExcel}>Download a sample excel file</p>
                            </div>

                            <div className='closeSaveBtn' >
                                <button onClick={handleClose}>Close</button>
                                <button type="submit">Save</button>
                            </div>
                        </form>
                    </div>
                </Dialog>
            </div>

        </div>
    );
};

export default ImportTimesheet;
