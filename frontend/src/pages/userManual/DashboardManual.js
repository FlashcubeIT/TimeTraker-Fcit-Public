import React, { useContext, useEffect } from 'react'
import AdminSideBarManual from '../../hoc/AdminSideBarManual'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/MyProvider';
import './DailyTimesheetManual.css';

const DashboardManual = () => {


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
                                    } >Dashboard</p>

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
                            Filter out the Timesheets
                        </h2>
                        <div className='step_save_div'>
                            <p><span>Step 1 :-</span> You can filter the timesheets by status <strong>( Hold, Submitted, Approved, Total )</strong></p>


                            <div className='note'>
                                <p ><span>Note 1 :- </span> If the dashboard chart is empty, it implies no users have submitted timesheets  </p>
                            </div>
                        </div>

                        <h2>
                            Steps to change the duration of the chart
                        </h2>
                        <div className='step_save_div'>
                            <p><span>Step 1 :-</span> Click on the time duration button <strong> ( 00-00-000 to 00-00-0000 ). </strong></p>
                            <p><span>Step 1 :-</span> Select the time <strong> duration. </strong></p>
                            <p><span>Step 1 :-</span> Click on the <strong> Filter </strong> button and you will get the filtered timesheets.</p>



                        </div>
                    </div>
                </div>
            </AdminSideBarManual>
        </div>
    )
}

export default DashboardManual
