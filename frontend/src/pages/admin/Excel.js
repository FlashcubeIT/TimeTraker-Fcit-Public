import React, {useContext} from 'react';
import * as XLSX from 'xlsx';
import { MyContext } from '../../context/MyProvider';

const Excel = ({companyName}) => {
  const { reportFilteredData, setReportFilteredData } = useContext(MyContext);

  const convertJsonToExcel = () => {
    if (!reportFilteredData || reportFilteredData.length === 0) {
      // Handle the case when there is no data
      return;
    }
    const headings = Object.keys(reportFilteredData[0]);
    headings.unshift('Company');
    headings.unshift('Duration');
    const dataWithHeadings = [
      { 'Company': companyName,  'Duration' :` ${reportFilteredData[0].Date}  to  ${reportFilteredData[reportFilteredData.length-1].Date}`, ...reportFilteredData[0] }, // Company Name heading and value
      ...reportFilteredData,
    ];

    // Convert JSON to Excel
    if (dataWithHeadings) {
      const ws = XLSX.utils.json_to_sheet(dataWithHeadings);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      // Save the Excel file
      XLSX.writeFile(wb, `${companyName}.xlsx`);
    }
  };

  return (
    <div>
      <button className="csv_button" onClick={convertJsonToExcel}>Export Excel</button>
    </div>
  );
};

export default Excel;
