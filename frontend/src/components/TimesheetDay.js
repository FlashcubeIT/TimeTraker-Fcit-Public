
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import UserTimeSheetTable from './UserTimeSheetTable'


function TimesheetDay() {

  const [click, setClick] = useState(true)

  localStorage.setItem('state', JSON.stringify(click));
  //config 

  const config = {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  };

  const adminloginInfo = JSON.parse(localStorage.getItem('adminLoginInfo'));
  const userLoginInfo = JSON.parse(localStorage.getItem('userLoginInfo'));
  if (adminloginInfo) {
    var companyID = adminloginInfo._id
    var userID = adminloginInfo._id
    var token = adminloginInfo?.token
  }
  if (userLoginInfo) {
    var companyID = userLoginInfo.companyID
    var userID = userLoginInfo._id
    var token = adminloginInfo?.token
  }
  const [projectInfo, setProjectInfo] = useState([])
  const [taskInfo, setTaskInfo] = useState([])
  const [userTimesheetInfo, setUserTimesheetInfo] = useState([])
  const [formData, setFormData] = useState({
    userID: userID,
    companyID: companyID,
    selectedDate: '',
    task: '',
    project: '',
    hours: '',
    state: 'hold',
    dynamicData: {}
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedDate = formData.selectedDate;

    // Create a new data entry
    const newData = {
      task: formData.task,
      project: formData.project,
      hours: formData.hours,
      state: formData.state
    };

    // Add the data entry to the selected date's array
    if (!formData.dynamicData[selectedDate]) {
      formData.dynamicData[selectedDate] = [newData];
    } else {
      formData.dynamicData[selectedDate].push(newData);
    }

    // Clear the input fields
    setFormData((prevData) => ({
      ...prevData,
      task: '',
      project: '',
      hours: '',
      state: 'hold'
    }));



    postTimesheetData()
  };

  // get all project 

  const getAllProject = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/all-project/?companyID=${companyID}`, config)
      setProjectInfo(data.projects)
    } catch (error) {
      console.log('error', error)
    }
  }

  // get all task 

  const getAllTask = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/all-task/?companyID=${companyID}`, config)
      setTaskInfo(data.tasks)
    } catch (error) {
      console.log('error', error)
    }
  }


  // post Timesheet data

  const postTimesheetData = async () => {
    try {
      const { data } = await axios.post(`http://localhost:8000/api/create-timesheet-entry`, formData, config)
      // console.log(data)
    } catch (error) {
      console.log('error', error)
    }
  }

  // get all the timesheets of this user 

  const getUserTimesheet = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/user-Timesheet/?userID=${userID}`, config)
      setUserTimesheetInfo(data.timesheets)
    } catch (error) {
      console.log('error', error)
    }
  }



  useEffect(() => {
    getAllTask()
    getAllProject()
    getUserTimesheet()
  }, [])


  return (

    <div>
      <form onSubmit={handleSubmit}>

        <input
          type="date"
          name="selectedDate"
          placeholder="Selected Date"
          value={formData.selectedDate}
          onChange={handleInputChange}
        />


        <FormControl sx={{ width: '100%', mt: 1 }} error>
          <InputLabel id="demo-simple-select-error-label">task</InputLabel>
          <Select
            labelId="demo-simple-select-error-label"
            id="demo-simple-select-error"
            label="task"
            name="task"
            onChange={handleInputChange}>
            {taskInfo &&
              taskInfo.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.task}>
                    {item.task}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>



        <FormControl sx={{ width: '100%', mt: 1 }} error>
          <InputLabel id="demo-simple-select-error-label">Project</InputLabel>
          <Select
            labelId="demo-simple-select-error-label"
            id="demo-simple-select-error"
            label="project"
            name="project"
            onChange={handleInputChange}>
            {projectInfo &&
              projectInfo.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.project}>
                    {item.project}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>

        <input
          type="number"
          name="hours"
          placeholder="Hours"
          value={formData.hours}
          onChange={handleInputChange}
        />
        {/* <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleInputChange}
        /> */}
        <button type="submit">Submit</button>
      </form>

      <UserTimeSheetTable userTimesheetInfo={userTimesheetInfo} />
    </div>
  );
}

export default TimesheetDay;
