import React, {useContext} from 'react';
import * as XLSX from 'xlsx';
import { MyContext } from '../../context/MyProvider';

const ExpenseExcel = ({companyName}) => {
  const { expenseReportFilteredData } = useContext(MyContext);

  const convertJsonToExcel = () => {
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

    // Convert JSON to Excel
    if (dataWithHeadings) {
      const ws = XLSX.utils.json_to_sheet(dataWithHeadings);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      // Save the Excel file
      XLSX.writeFile(wb, 'output.xlsx');
    }
  };

  return (
    <div>
      <button className="csv_button" onClick={convertJsonToExcel}>Convert to Excel</button>
    </div>
  );
};

export default ExpenseExcel;
