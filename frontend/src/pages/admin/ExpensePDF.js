import React,{useContext} from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { MyContext } from '../../context/MyProvider';

const ExpensePdf = ({companyName}) => {
    const { expenseReportFilteredData } = useContext(MyContext);
 
      const generatePdf = () => {

        console.log("expenseReportFilteredData", expenseReportFilteredData)

        if (!expenseReportFilteredData || expenseReportFilteredData.length === 0) {
          // Handle the case when there is no data
          return;
        }
        const doc = new jsPDF();
    
        // Define columns and rows
        const columns = Object.keys(expenseReportFilteredData[0]);
        const rows = expenseReportFilteredData.map(item => Object.values(item));
    
        // Set font size for the table
        doc.setFontSize(12);
    
        // Add table headers
        doc.text(`Company:- ${companyName}`, 20, 10);
        doc.text(`Duration:- ${expenseReportFilteredData[0]?.Date}  to  ${expenseReportFilteredData[expenseReportFilteredData.length-1]?.Date}`, 20, 20);
        
        // Create table using autoTable method
        doc.autoTable({ 
          head: [columns],
           body: rows, 
           startY: 40,
           styles: {
            fontSize: 8, // Set font size for the table
            cellPadding: 2, // Set padding for cells
          },
          columnStyles: {
            0: { fontStyle: 'bold', cellWidth: 20 }, // Customize style and width of the first column
            1: { cellWidth: 20 },
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
        doc.save('output.pdf');
      };
    
  return (
    <div>
      <button className="csv_button" onClick={generatePdf}>Generate PDF</button>
    </div>
  );
};

export default ExpensePdf;
