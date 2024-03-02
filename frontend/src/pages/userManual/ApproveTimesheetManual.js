import React, { useContext, useEffect } from 'react'
import AdminSideBarManual from '../../hoc/AdminSideBarManual'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/MyProvider';
import './DailyTimesheetManual.css';

const ApproveTimesheetManual = () => {


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
                            <div style={{ margin: "0" }} className="header-top">
                                <div className="dash-header1">
                                    <p style={
                                        sideBarStatus == true
                                            ? { paddingLeft: "0px", paddingTop: "2px", fontSize: "22px" }
                                            : { paddingLeft: "30px", paddingTop: "4px", fontSize: "22px" }
                                    } >Timesheet Aprove</p>

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
                            Steps to Approve The Timesheet.

                        </h2>
                        <div className='step_save_div'>
                            <p><span className='process'>Process 1 :-</span> </p>
                            <p className='inside_process'><span>Step 1 :-</span> Go to the <strong>Timesheet</strong> page. </p>
                            <p className='inside_process'><span>Step 2 :-</span> Click on the  <strong>User</strong>, which will open all the <strong>Submitted Timesheets</strong>  by this user</p>
                            <p className='inside_process'><span>Step 3 :-</span> Click on the <strong> Thumb Up Icon </strong> to approve the timesheet </p>
                            {/* <div className='note'>
                                <p ><span>Note 1 :- </span> You cannot include two identical User names.  </p>
                                <p ><span>Note 2 :- </span> You cannot add two users with same email.  </p>
                            </div> */}
                        </div>

                        <div className='step_save_div'>
                            <p><span className='process'>Process 2 :-</span> </p>
                            <p className='inside_process'><span>Step 1 :-</span> Go to the <strong>Timesheet</strong> page. </p>
                            <p className='inside_process'><span>Step 2 :-</span> Select <strong> By Status </strong> in the top right corner. It will show you all the <strong> Submitted Timesheets</strong>.</p>
                            <p className='inside_process'><span>Step 3 :-</span> Click on the <strong> Thumb Up Icon </strong> to approve the timesheet </p>
                            <div className='note'>
                                <p ><span>Note 1 :- </span>  If you are not able to see any timesheet on the approved timesheet page it means no one has submitted any new timesheet  </p>
                            </div>
                        </div>


                    </div>
                </div>
            </AdminSideBarManual>
        </div>
    )
}

export default ApproveTimesheetManual
