import React from 'react';
import * as XLSX from 'xlsx';

const UserExcel = ({ userTimesheetInfo }) => {

    const userName = userTimesheetInfo[1]?.userName
    const convertJsonToExcel = () => {
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

        // Convert JSON to Excel
        if (dataWithHeadings) {
            const ws = XLSX.utils.json_to_sheet(dataWithHeadings);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

            // Save the Excel file
            XLSX.writeFile(wb, `Timesheet.xlsx`);
        }
    };

    return (
        <div>
            <button className='button-container-button' onClick={convertJsonToExcel}>EXCEL</button>
        </div>
    );
};

export default UserExcel;
