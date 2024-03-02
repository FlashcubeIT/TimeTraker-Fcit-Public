import React, {useContext} from 'react';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { MyContext } from '../../context/MyProvider';

const ExpenseCsv = ({companyName}) => {
    const { expenseReportFilteredData } = useContext(MyContext);
  const generateCsv = () => {
    // Convert JSON data to CSV format using papaparse
    if (!expenseReportFilteredData || expenseReportFilteredData.length === 0) {
      // Handle the case when there is no data
      return;
    }
    const headings = Object.keys(expenseReportFilteredData[0]);
    headings.unshift('Company');
    headings.unshift('Duration');
    const dataWithHeadings = [
      { 'Company': companyName,  'Duration' :` ${expenseReportFilteredData[0].Date}  to  ${expenseReportFilteredData[expenseReportFilteredData.length-1].Date}`, ...expenseReportFilteredData[0] }, // Company Name heading and value
      ...expenseReportFilteredData,
    ];

    const csvData = Papa.unparse(dataWithHeadings);

    // Create a Blob from the CSV data
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });

    // Trigger a file download
    saveAs(blob, 'output.csv');
  };

  return (
    <div>
      <button className="csv_button" onClick={generateCsv}>Generate CSV</button>
    </div>
  );
};

export default ExpenseCsv;
