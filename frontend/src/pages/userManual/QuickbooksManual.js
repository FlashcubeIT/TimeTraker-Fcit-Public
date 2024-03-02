import React, { useContext, useEffect } from 'react'
import AdminSideBarManual from '../../hoc/AdminSideBarManual'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/MyProvider';
import './DailyTimesheetManual.css';

const QuickbooksManual = () => {


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
                  } >QuickBooks</p>

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
            Steps to Connect With Your QuickBooks Account.

            </h2>
            <div className='step_save_div'>
              <p><span>Step 1 :-</span> Go to the  <strong> Quickbooks </strong> page.</p>
              <p><span>Step 2 :-</span> Click on the <strong> Connect To QuickBooks </strong> button.</p>
              <p><span>Step 3 :-</span> Sign in with <strong> Intuit. </strong></p>
              <p><span>Step 4 :-</span> Select your <strong> Company </strong> and you are ready to go.</p>
              <div className='note'>
                <p ><span>Note 1 :- </span> If you have already connected with QuickBooks then you will be not able to see the "Connect To QuickBooks" button</p>
              </div>

            </div>

            <h2>
            Steps to Sync Data From Quickbooks
            </h2>
            <div className='step_save_div'>
              <p><span>Step 1 :-</span> You can click the <strong> Sync All </strong> button to sync all the data from the QuickBooks.</p>
              <p><span>Step 2 :-</span> If You want to sync any particular field then you can click on the respected <strong>Sync</strong>  button.</p>
             
            </div>

            <h2>
            Steps to Download Data in Quickbooks.
            </h2>

            <div className='step_save_div'>
              <p><span>Step 1 :-</span> To send the data from TimeTraker to Quickbooks you can click on the respected <strong>Download</strong> button.</p>
            </div>

            <h2>
            Steps to Disconnect From Quickbooks.
            </h2>

            <div className='step_save_div step_save_div_last'>
            <p><span>Step 1 :-</span> You can see a <strong>Disconnect</strong> button at the top, just click on the button to disconnect your Quickbooks button from TimeTraker.</p>

            <div className='note'>
                <p ><span>Note 1 :- </span> If you have not connected with QuickBooks then you will be not able to see the "Disconnect" button</p>
              </div>
            </div>

          </div>
        </div>
      </AdminSideBarManual>
    </div>
  )
}

export default QuickbooksManual
