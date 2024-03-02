import React, { useContext, useEffect } from 'react'
import AdminSideBarManual from '../../hoc/AdminSideBarManual'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/MyProvider';
import './DailyTimesheetManual.css';

const TaskManual = () => {


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
                                    } >Task</p>

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
                        Steps to Create a Task 

                        </h2>
                        <div className='step_save_div'>
                            <p><span>Step 1 :-</span> Go to the <strong>Task</strong> page. </p>
                            <p><span>Step 2 :-</span> Add a task name in the <strong>Task</strong> field. </p>
                            <p><span>Step 3 :-</span> Click on the <strong> Submit </strong> button to add the task.</p>


                            <div className='note'>
                                <p ><span>Note 1 :- </span> You cannot include two identical task names.  </p>
                            </div>
                        </div>

                        <h2>
                        Steps to Delete a Task 
                        </h2>
                        <div className='step_save_div step_save_div_last'>
                            <p><span>Step 1 :-</span> In the table find the  <strong>Task </strong> you want to delete.</p>
                            <p><span>Step 2 :-</span> Click on the <strong>Delete Icon</strong> to delete the task </p>
                        </div>
                    </div>
                </div>
            </AdminSideBarManual>
        </div>
    )
}

export default TaskManual
