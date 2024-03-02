import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import UserTimeSheetTable from './UserTimeSheetTable'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

function WeeklyTimesheet() {



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
    dynamicData: {},
  });

  const [task, setTask] = useState('');
  const [project, setProject] = useState('');
  const [hours, setHours] = useState('');
  const [state, setState] = useState('hold');
  const [date, setDate] = useState('');


  //config 

  const config = {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  };


  const addTask = () => {
    if (!date) {
      alert('Please select a date.');
      return;
    }

    if (!formData.dynamicData[date]) {
      formData.dynamicData[date] = [];
    }

    formData.dynamicData[date].push({
      task,
      project,
      hours: parseInt(hours),
      state,
    });

    // Clear input fields after adding a task
    setTask('');
    setProject('');
    setHours('');
    setState('hold');
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

      <h1>Task Form</h1>
      <div>

        <FormControl sx={{ width: '100%', mt: 1 }} error>
          <InputLabel id="demo-simple-select-error-label">task</InputLabel>
          <Select
            labelId="demo-simple-select-error-label"
            id="demo-simple-select-error"
            label="task"
            name="task"
            onChange={(e) => setTask(e.target.value)}>
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
      </div>
      <div>


        <FormControl sx={{ width: '100%', mt: 1 }} error>
          <InputLabel id="demo-simple-select-error-label">Project</InputLabel>
          <Select
            labelId="demo-simple-select-error-label"
            id="demo-simple-select-error"
            label="project"
            name="project"
            onChange={(e) => setProject(e.target.value)}>
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
      </div>
      {/* 
      <div>
        <label htmlFor="state">State: </label>
        <select name="state" value={state} onChange={(e) => setState(e.target.value)}>
          <option value="hold">Hold</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div> */}



      <Grid container sx={{ marginTop: '50px' }}>
        <Grid item>
          <div>
            <label htmlFor="date">Date: </label>
            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="hours">Hours: </label>
            <input
              type="number"
              name="hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
          </div>
          <button onClick={addTask}>Add Task</button>
        </Grid>
        <Grid item>
          <div>
            <label htmlFor="date">Date: </label>
            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="hours">Hours: </label>
            <input
              type="number"
              name="hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
          </div>
          <button onClick={addTask}>Add Task</button>
        </Grid>
        <Grid item>
          <div>
            <label htmlFor="date">Date: </label>
            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="hours">Hours: </label>
            <input
              type="number"
              name="hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
          </div>
          <button onClick={addTask}>Add Task</button>
        </Grid>
      </Grid>
      <button onClick={postTimesheetData}>save data </button>

      <div style={{ marginTop: '50px' }}>
        <UserTimeSheetTable userTimesheetInfo={userTimesheetInfo} />
      </div>
    </div>
  );
}

export default WeeklyTimesheet;
