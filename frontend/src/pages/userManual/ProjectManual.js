import React, { useContext, useEffect } from 'react'
import AdminSideBarManual from '../../hoc/AdminSideBarManual'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/MyProvider';
import './DailyTimesheetManual.css';

const ProjectManual = () => {


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
                                    } >Project</p>

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
                        Steps to Create a Project 

                        </h2>
                        <div className='step_save_div'>
                            <p><span>Step 1 :-</span> Go to the <strong>Project</strong> page </p>
                            <p><span>Step 2 :-</span> Add a project name in the <strong>Project</strong> field </p>
                            <p><span>Step 3 :-</span> Select the project is <strong>Billable</strong>  or not </p>
                            <p><span>Step 4 :-</span> You can add the short <strong>Description</strong>  if you want to because the description is optional. </p>
                            <p><span>Step 5 :-</span> Click on the <strong> Submit </strong> button to add the project.</p>


                            <div className='note'>
                                <p ><span>Note 1 :- </span> You cannot include two identical project names.  </p>
                            </div>
                        </div>

                        <h2>
                        Steps to Delete a Project 
                        </h2>
                        <div className='step_save_div step_save_div_last'>
                            <p><span>Step 1 :-</span> In the table find the  <strong>Project </strong> you want to delete.</p>
                            <p><span>Step 2 :-</span> Click on the <strong>Delete Icon</strong> to delete the project </p>
                        </div>
                    </div>
                </div>
            </AdminSideBarManual>
        </div>
    )
}

export default ProjectManual
