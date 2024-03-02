import React, { useContext, useEffect } from 'react'
import AdminTechnicalSideBar from '../../hoc/AdminTechnicalSideBar';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/MyProvider';
import FrontFile from "../../img/FrontFile.png";
import '../userManual/DailyTimesheetManual.css';
import "./TechnicalDoc.css"

const BackendFile = () => {


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
                                    } >Frontend File Structure</p>

                                </div>

                                <div className="dash-header2">
                                    <div className="nav-button">
                                        <button onClick={() => { navigate('/login') }} className='nav-btn1'>Sign In</button>
                                        <button onClick={() => { navigate('/signup') }} className='nav-btn2'>Try Free</button>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className='technical_doc backend_file_structure' style={{ padding: "0px 20px 30px 20px" }}>
                            <h2>Here is The Creare Image of The File Structure.</h2>
                            <p>Click <a href='https://drive.google.com/file/d/1EqXSuTsvFHSztKWxpAA5Lv9OO8eBB0IX/view?usp=sharing'>Here</a> to download the PDF of this file structure.</p>
                            <div>
                                <img src={FrontFile} alt='Frontend File Structure' />
                            </div>
                        </div>

                    </div>


                </div>
            </AdminTechnicalSideBar>
        </div>
    )
}

export default BackendFile
