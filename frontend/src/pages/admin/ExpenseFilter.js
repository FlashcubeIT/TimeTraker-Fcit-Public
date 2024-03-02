import React, { useState, useEffect, useContext } from 'react';
import { MyContext } from '../../context/MyProvider';

const ExpenseFilter = ({ allUserExpenseInfo }) => {

    const [filteredData, setFilteredData] = useState(allUserExpenseInfo);
    const { setExpenseReportFilteredData } = useContext(MyContext);
    if (filteredData) {
        setExpenseReportFilteredData(filteredData)
    }


    const [selectedProperties, setSelectedProperties] = useState({
        Date: true,
        Expense: true,
        Project: true,
        Amount: true,
        State: true,
        UserName: true,
        Billable: true,
        Exported: true,
        Description: true,
    });

    const data = {

    }


    const handleCheckboxChange = (property) => {
        setSelectedProperties(prevState => ({
            ...prevState,
            [property]: !prevState[property],
        }));
    };

    useEffect(() => {
        const filteredResults = allUserExpenseInfo && allUserExpenseInfo.map(item => {
            const newItem = {};
            Object.keys(selectedProperties).forEach(property => {
                if (selectedProperties[property]) {
                    newItem[property] = item[property];
                }
            });
            return newItem;
        });

        setFilteredData(filteredResults);
    }, [selectedProperties]);

    useEffect(() => {
        setFilteredData(allUserExpenseInfo);
    }, [allUserExpenseInfo])

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "80%" }}>
                {/* Checkboxes for selecting properties */}
                {Object.keys(selectedProperties).map(property => (
                    <label className='left_box_check' key={property}>
                        <input
                            type="checkbox"
                            defaultChecked
                            className='input_check'
                            checked={selectedProperties[property]}
                            onChange={() => handleCheckboxChange(property)}
                        />
                        {property}
                    </label>
                ))}
                {Object.keys(data).map(property => (
                    <label className='left_box_check' key={property}>
                        <input
                            type="checkbox"
                            defaultChecked
                            className='input_check'
                            checked={data[property]}
                        />
                        {property}
                    </label>
                ))}


            </div>
        </div>
    );
};

export default ExpenseFilter;
