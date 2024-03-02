import React, { useContext, useEffect } from 'react'
import AdminSideBarManual from '../../hoc/AdminSideBarManual'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/MyProvider';
import './DailyTimesheetManual.css';

const WeeklyTimesheetManual = () => {


  const { sideBarStatus, setSideBarStatus } = useContext(MyContext);

  const handleClick = () => {
    if (sideBarStatus == true) {
      setSideBarStatus(false)
    } else {
      setSideBarStatus(true)
    }
  }
  const navigate = useNavigate()


  const screenWidth = window.innerWidth;
  if (screenWidth >= 840) {
    var forPhoneScreenNoDisplay = true
  } else {
    var forPhoneScreenNoDisplay = false
  }

  useEffect(() => {
    // Scroll to the top of the page on component mount (page reload)
    window.scrollTo(0, 0);
  }, []); 
  return (
    <div>
      <AdminSideBarManual>
        <div className={sideBarStatus ? 'content_right_dashboard_3' : "none"} fluid style={sideBarStatus == true & forPhoneScreenNoDisplay == false ? { display: 'none' } : { display: 'block' }}>
          {/* Row 1 */}
          <div className="hamburgar" style={sideBarStatus ? { display: 'none' } : { display: 'block' }}>
            <i onClick={handleClick} className='fas fa-bars'></i>
          </div>

          <div>
            <div md={12} className='dash-container1' >
              <div style={{margin:"0"}} className="header-top">
                <div className="dash-header1">
                  <p style={
                    sideBarStatus == true
                      ? { paddingLeft: "0px", paddingTop: "2px", fontSize: "22px" }
                      : { paddingLeft: "30px", paddingTop: "4px", fontSize: "22px" }
                  } >Weekly Timehseet</p>

                </div>

                <div className="dash-header2">
                  <div className="nav-button">
                    <button onClick={() => { navigate('/login') }} className='nav-btn1'>Sign In</button>
                    <button onClick={() => { navigate('/signup') }} className='nav-btn2'>Try Free</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='user_manual' style={{ padding: "0px 20px" }}>
            <h2>
              Steps to Save Weekly Timehseet
            </h2>
            <div className='step_save_div'>
              <p><span>Step 1 :-</span> Go to <strong>My Time </strong> page then click on the <strong>Week View  </strong>button to enter the weekly timesheet page.</p>
              <p><span>Step 2 :-</span> Select the week on which you want to add the timesheet by the <strong> Choose Date button </strong> (The default week will be the current week).</p>
              <p><span>Step 3 :-</span> Select a <strong>Project</strong> that you have worked on.</p>
              <p><span>Step 4 :-</span> Select a <strong>Task</strong> that you have worked on.</p>
              <p><span>Step 5 :-</span> If the Timesheet is <strong>Billable</strong> then select the checkbox.</p>
              <p><span>Step 6 :-</span> Then enter the <stront>Hours </stront>  on the respective date column and it will auto save your timesheet.</p>
              <div className='note'>
                <p ><span>Note 1 :- </span> If you are not able to see any Projects then contact the admin to add Project.</p>
                <p ><span>Note 2 :-  </span> If you are not able to see any Tasks then contact the admin to add Task.</p>
              </div>

            </div>

            <h2>
              Steps to Submit Your Timesheet
            </h2>

            <div className='step_save_div'>
              <p><span>Process 1 :-</span> Click on the <strong>Submit All</strong> button to submit all the hold timesheets.</p>
              <p><span>Process 2 :-</span> If you want to submit any particular timesheet then click on the <strong>Submit Icon</strong> on the bellow table.</p>
              <p><span>Process 3 :-</span> Click on the <strong>Submit Week</strong> button to submit the hold timesheets for this week.</p>
              <div className='note'>
                <p ><span>Note 1 :- </span> You can’t submit the timesheets that are already Submitted or Approved </p>
              </div>
            </div>

            <h2>
              Steps to Edit Your Timesheet
            </h2>
            <div className='step_save_div'>
              <p><span>Step 1 :-</span> Click on the <strong>Edit Icon</strong></p>
              <p><span>Step 2 :-</span> Edit the required details.</p>
              <p><span>Step 2 :-</span> Click on the save button to save the changes.</p>
              <div className='note'>
                <p ><span>Note 1 :- </span> You can’t Edit the timesheets that are already Submitted or Approved </p>
              </div>
            </div>

            <h2>
              Steps to Delete Your Timesheet
            </h2>

            <div className='step_save_div'>
              <p><span>Process 1 :-</span> Click on the <strong>Delete All</strong> button to Delete all the hold timesheets.</p>
              <p><span>Process 2 :-</span> If you want to Delete any particular timesheet then click on the <strong>Delete Icon</strong> on the bellow table.</p>
              <p><span>Process 3 :-</span> Click on the <strong>Delete Week</strong> button to Delete the hold timesheets for this week.</p>

              <div className='note'>
                <p ><span>Note 1 :- </span> You can’t Delete the timesheets that are already Submitted or Approved </p>
              </div>
            </div>

            <h2>
              Additional Features in Weekly Timehseet Page
            </h2>

            <div className='step_save_div step_save_div_last'>
              <p><span>Filter :- </span> You can filter your timesheet table by <strong> Projects, Tasks and Status</strong></p>
            </div>

          </div>
        </div>
      </AdminSideBarManual>
    </div>
  )
}

export default WeeklyTimesheetManual
