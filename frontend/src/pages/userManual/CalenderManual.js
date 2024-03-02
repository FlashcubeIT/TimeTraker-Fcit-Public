import React, { useContext, useEffect } from 'react'
import AdminSideBarManual from '../../hoc/AdminSideBarManual'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/MyProvider';
import './DailyTimesheetManual.css';

const CalenderManual = () => {


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
                  } >Calendar</p>

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
              Steps to Save Timesheet in Calendar View
            </h2>
            <div className='step_save_div step_save_div_last'>
              <p><span>Step 1 :-</span> Go to <strong>My Time </strong> page then click on the <strong>Calendar View  </strong>button to enter the calendar timesheet page.</p>
              <p><span>Step 2 :-</span> Select the month on which you want to add the timesheet (The default week will be the current week).</p>
              <p><span>Step 3 :-</span> Click on the date you want to add the timesheet.</p>
              <p><span>Step 4 :-</span> Enter the number of hours you have worked in the <strong>Hours</strong> field.</p>
              <p><span>Step 5 :-</span> Select a <strong>Project</strong> that you have worked on.</p>
              <p><span>Step 6 :-</span> Select a <strong>Task</strong> that you have worked on.</p>
              <p><span>Step 7 :-</span> You can add the short <strong>Description</strong> if you want to because the description is <strong>optional</strong>.</p>

              <div className='note'>
                <p ><span>Note 1 :- </span> If you are not able to see any Projects then contact the admin to add Project.</p>
                <p ><span>Note 2 :-  </span> If you are not able to see any Tasks then contact the admin to add Task.</p>
              </div>

            </div>
          </div>
        </div>
      </AdminSideBarManual>
    </div>
  )
}

export default CalenderManual
