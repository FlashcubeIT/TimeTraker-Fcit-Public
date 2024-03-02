import React, { useContext, useEffect } from 'react'
import AdminSideBarManual from '../../hoc/AdminSideBarManual'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/MyProvider';
import './DailyTimesheetManual.css';

const DailyTimesheetManual = () => {


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
                  } >Daily Timehseet</p>

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
              Steps to Save Your Daily Timesheet
            </h2>
            <div className='step_save_div'>
              <p><span>Step 1 :-</span> Enter the number of hours you have worked in the <strong>Hours</strong> field.</p>
              <p><span>Step 2 :-</span> In the <strong>Date</strong> field, the default date will be the current date. Feel free to change the date if required.</p>
              <p><span>Step 3 :-</span> You can add the short <strong>Description</strong> if you want to because the description is <strong>optional</strong>.</p>
              <p><span>Step 4 :-</span> Select a <strong>Project</strong> that you have worked on.</p>
              <p><span>Step 5 :-</span> Select a <strong>Task</strong> that you have worked on.</p>
              <p><span>Step 6 :-</span> If the Timesheet is <strong>Billable</strong> then select the checkbox.</p>
              <p><span>Step 7 :-</span> Click on the <strong>Save</strong> button to save the timesheet</p>
              <div className='note'>
                <p ><span>Note 1 :- </span> If you are not able to see any Projects then contact the admin to add Project.</p>
                <p ><span>Note 2 :-  </span> If you are not able to see any Tasks then contact the admin to add Task.</p>
                <p ><span>Note 3 :- </span> If you want to add a timesheet with less than 1 hour then it will ask you “Are you sure you want to add less than 1 hour”,  Click OK to save the timesheet click cancel if you don’t want to save the timesheet.</p>
              </div>

            </div>

            <h2>
              Steps to Submit Your Timesheet
            </h2>

            <div className='step_save_div'>
              <p><span>Process 1 :-</span> Click on the <strong>Submit All</strong> button to submit all the hold timesheets.</p>
              <p><span>Process 2 :-</span> If you want to submit any particular timesheet then click on the <strong>Submit Icon</strong> on the bellow table.</p>
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
              <div className='note'>
                <p ><span>Note 1 :- </span> You can’t Delete the timesheets that are already Submitted or Approved </p>
              </div>
            </div>

            <h2>
              Additional Features in Daily Timesheet Page
            </h2>

            <div className='step_save_div step_save_div_last'>
              <p><span>Eraser :- </span> You can clear the input fields by clicking the <strong>Eraser</strong> icon</p>
              <p><span>Repeat :- </span> You can Repeat your previous timesheet entry bu clicking on the <strong>Repeat</strong> icon</p>
              <p><span>Filter :- </span> You can filter your timesheet table by <strong> Projects, Tasks and Status</strong></p>
            </div>

          </div>
        </div>
      </AdminSideBarManual>
    </div>
  )
}

export default DailyTimesheetManual
