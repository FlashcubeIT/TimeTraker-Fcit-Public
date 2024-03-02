
import React from 'react';
import jsPDF from 'jspdf';

const UserPdf = ({ userTimesheetInfo }) => {

  userTimesheetInfo.sort((a, b) => a.date.localeCompare(a.date));

  const generatePDF = () => {
    const pdf = new jsPDF();

    // Exclude specific fields from headers and data
    const excludeFields = ['_id', 'userID', 'companyID', 'createdAt', 'updatedAt', '__v', 'sendToQb', 'userName', 'fromQb', 'photo', 'description', 'merchant', 'expenseReport', 'paidBy','name'];
    const headers = Object.keys(userTimesheetInfo[0]).filter(key => !excludeFields.includes(key));
    const tableData = userTimesheetInfo.map(entry =>
      headers.map(header => entry[header])
    );


    const userName  = userTimesheetInfo[1].userName
    pdf.text(`User Timesheet Report`, 75, 10);
    pdf.text(`User Name:- ${userName}`, 75, 20);

    pdf.autoTable({
      head: [headers],
      body: tableData,
      startY: 30 
    });

    // Save the PDF or open in a new tab
    pdf.save('timesheets.pdf');
  };

  return (
    <div>
      <button className='button-container-button' onClick={generatePDF}>PDF</button>
    </div>
  );
};

export default UserPdf;

