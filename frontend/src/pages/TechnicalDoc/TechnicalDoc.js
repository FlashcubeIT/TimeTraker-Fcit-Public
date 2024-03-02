import React, { useContext, useEffect } from 'react'
import AdminTechnicalSideBar from '../../hoc/AdminTechnicalSideBar';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/MyProvider';
import '../userManual/DailyTimesheetManual.css';
import "./TechnicalDoc.css"

const TechnicalDoc = () => {


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
            <AdminTechnicalSideBar>
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
                                    } >Technical Doc</p>

                                </div>

                                <div className="dash-header2">
                                    <div className="nav-button">
                                        <button onClick={() => { navigate('/login') }} className='nav-btn1'>Sign In</button>
                                        <button onClick={() => { navigate('/signup') }} className='nav-btn2'>Try Free</button>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className='technical_doc' style={{ padding: "0px 20px 30px 20px" }}>
                            <h2>Developer</h2>

                            <p>Developer documentation - run, develop, extend and build for TimeTraker</p>

                            <p>This page is for all developers who want to contribute to TimeTraker. You rock!</p>

                            <h2>Setting Up Your Environment</h2>

                            <p>All you need is:</p>
                            <p className='need_steps'> <span> 1. </span> A recent node.js version. </p>
                            <p className='need_steps'> <span> 2. </span> A MongoDB account. </p>
                            <p className='need_steps'> <span> 3. </span> And a GitHub account. </p>

                            <h2>Development Installation</h2>

                            <p>Clone the repository and install all dependencies:</p>

                            <div className='code_box'>
                                <p>git clone https://github.com/TimeTraker-Fcit</p>
                                <p>cd TimeTraker-Fcit</p>
                                <p>npm install</p>
                            </div>

                            <p>You need to change your environment to dev and configure your database connection in your .env file:</p>

                            <div className='code_box'>
                                <p>MONGO_URI = "YOUR MONGO URI"</p>
                            </div>

                            <h2>Frontend Installation</h2>

                            <p>Enter in the TimeTraker-Fcit folder</p>
                            <div className='code_box'>
                                <p>cd frontend</p>
                                <p>npm install</p>
                            </div>

                            <h2>Start The App</h2>
                            <div className='code_box'>
                                <p>cd ..</p>
                                <p>npm start</p>
                            </div>

                            <h2>Private Route For Frontend</h2>


                            <p>You can create your own private route or We can customise it for you. Contact us at <a href="mailto: support@flashcubeit.com"> support@flashcubeit.com </a></p>

                            {/* <div className='code_box'>
                                <p>cd ..</p>
                                <p>npm start</p>
                            </div> */}

                            <h2>The Complete Guide For “.env” File.</h2>

                            <div className='code_box'>
                                <p>PORT = "YOUR BACKEND PORT"</p>
                                <p> MONGO_URI = "YOUR MONGO URI"</p>
                                <p> MONGO_URI = "YOUR MONGO URI"</p>
                                <p> JWT_SECRET = "YOUR JWT SECRET"</p>
                                
                            </div> 
                        </div>
                    </div>


                </div>
            </AdminTechnicalSideBar>
        </div>
    )
}

export default TechnicalDoc
