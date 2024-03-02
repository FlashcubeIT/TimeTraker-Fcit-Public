import React, { useContext, createContext, useState } from 'react';

const MyContext = createContext();

const MyProvider = ({ children }) => {

  const screenWidth = window.innerWidth;
  if (screenWidth >= 840) {
    var setTrueAcordingToScreen = true
  } else {
    var setTrueAcordingToScreen = false
  }

  
  const [loading, setLoading] = useState(false)
  const [sideBarStatus, setSideBarStatus] = useState(setTrueAcordingToScreen);
  const [reportFilteredData, setReportFilteredData] = useState();
  const [expenseReportFilteredData, setExpenseReportFilteredData] = useState();
  const [sendPass, setSendPass] = useState(false)

  return (
    <MyContext.Provider value={{ sideBarStatus, setSideBarStatus , setReportFilteredData, reportFilteredData, setExpenseReportFilteredData, expenseReportFilteredData, loading, setLoading, setSendPass, sendPass}}>
      {children}
    </MyContext.Provider>
  );
};

export { MyProvider, MyContext };
