import React, {useContext} from 'react';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { MyContext } from '../../context/MyProvider';

const Csv = ({companyName}) => {
    const { reportFilteredData, setReportFilteredData } = useContext(MyContext);

  const generateCsv = () => {
    // Convert JSON data to CSV format using papaparse
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

    // Convert data to CSV format using papaparse
    const csvData = Papa.unparse(dataWithHeadings, {
      header: true,
    });


    // Create a Blob from the CSV data
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });

    // Trigger a file download
    saveAs(blob, `${companyName}.csv`);
  };

  return (
    <div >
      <button className="csv_button" onClick={generateCsv}>Export CSV</button>
    </div>
  );
};

export default Csv;
