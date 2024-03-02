import React from 'react';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

const UserCsv = ({ userTimesheetInfo }) => {
    const userName = userTimesheetInfo[1]?.userName
    const generateCsv = () => {
        // Convert JSON data to CSV format using papaparse
        if (!userTimesheetInfo || userTimesheetInfo.length === 0) {
            // Handle the case when there is no data
            return;
        }
        const excludeFields = ['_id', 'userID', 'companyID', 'createdAt', 'updatedAt', '__v', 'sendToQb', 'userName', 'fromQb', 'photo', 'description', 'merchant', 'expenseReport', 'paidBy', 'name'];

        const newArray = userTimesheetInfo.map(obj => {
            const filteredObject = Object.fromEntries(
                Object.entries(obj).filter(([key]) => !excludeFields.includes(key))
            );
            return filteredObject;
        });



        const dataWithHeadings = [
            { 'Heading': "User Timesheet Report", "userName": userName, ...newArray[0] }, // Company Name heading and value
            ...newArray,
        ];
        // Convert data to CSV format using papaparse
        const csvData = Papa.unparse(dataWithHeadings, {
            header: true,
        });


        // Create a Blob from the CSV data
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });

        // Trigger a file download
        saveAs(blob, `Timesheet.csv`);
    };

    return (
        <div >
            <button className='button-container-button' onClick={generateCsv}>CSV</button>
        </div>
    );
};

export default UserCsv;
