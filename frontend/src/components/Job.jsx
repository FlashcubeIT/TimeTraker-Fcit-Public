import React from 'react'
import "./Job.css"
import IconImg from "../img/timeIcon.png"
import arrow1 from '../img/arrow2.svg'
import { useNavigate } from 'react-router-dom'
import img2 from "../img/landingImg2.png"

const Job = () => {
    const navigate = useNavigate()
    return (
        <div className='job-container'>
            <div className="job-text">
                <div className='icon-img'>
                    <h6>Paperless Job Management</h6>
                    <img src={IconImg} alt="" />
                </div>
                <h5>“Centralize job details in one location”</h5>
                <p>Accessing a comprehensive suite of job management tools enables you to maximize daily productivity and accomplish more tasks, all without the necessity of expanding your workforce. Engage the appropriate team members at each phase of the process to ensure efficient task completion and timely payments.</p>
                <button onClick={() => { navigate('/signup') }}>Start a free trial</button>
            </div>



            <div className="time-img">
                <div className="time-img1">
                    <img src={img2} alt="" />
                    <div className="timeImg_new timeImg2">
                        <img src={arrow1} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Job