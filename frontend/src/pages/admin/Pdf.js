import React, { useContext } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { MyContext } from '../../context/MyProvider';

const Pdf = ({ companyName }) => {
  const { reportFilteredData, setReportFilteredData } = useContext(MyContext);

  const generatePdf = () => {
    if (!reportFilteredData || reportFilteredData.length === 0) {
      // Handle the case when there is no data
      return;
    }
    const doc = new jsPDF();

    // Define columns and rows
    const columns = Object.keys(reportFilteredData[0]);
    const rows = reportFilteredData.map(item => Object.values(item));

    // Set font size for the table
    doc.setFontSize(12);

    // Add table headers
    doc.text(`Company:- ${companyName}`, 20, 10);
    doc.text(`Duration:- ${reportFilteredData[0].Date}  to  ${reportFilteredData[reportFilteredData.length - 1].Date}`, 20, 20);

    // Create table using autoTable method
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 30,
      styles: {
        fontSize: 8, // Set font size for the table
        cellPadding: 2, // Set padding for cells
      },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 20 }, // Customize style and width of the first column
        1: { cellWidth: 15 },
        2: { cellWidth: 15 },
        3: { cellWidth: 15 },
        4: { cellWidth: 15 },
        5: { cellWidth: 25 },
        6: { cellWidth: 15 },
        7: { cellWidth: 20 },
        8: { cellWidth: 30 },
      },
    });

    // Save the PDF
    doc.save(`${companyName}.pdf`);
  };

  return (
    <div>
      <button className="csv_button" onClick={generatePdf}>Export PDF</button>
    </div>
  );
};

export default Pdf;