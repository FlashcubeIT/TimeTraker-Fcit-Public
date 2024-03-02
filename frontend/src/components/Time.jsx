import React from 'react'
import "./Time.css"
import IconImg from "../img/timeIcon.png"
// import img1 from "../img/landingImg1.svg"
import img1 from "../img/landingImg1.png"
import arrow1 from '../img/arrow1.svg'
import { useNavigate } from 'react-router-dom'

const Time = () => {
    const navigate = useNavigate()
  return (
    <div className='time-container'>
        <div className="time-text">
            <div className='icon-img'>
                <h6>On-the-Go Time Management</h6>
                <img src={IconImg} alt="" />
            </div>
            <h5>"Managing employee timesheets and tracking labor costs has never been this simple."</h5>
            <p>With our app, your dedicated team can effortlessly clock in and out with a single tap, capturing accurate timesheet data crucial for payroll and job costing. This ensures you have a precise record of the tasks completed, who performed them, and the time it took to finish each job with 99.9% accuracy.</p>
            <button onClick={()=>{navigate('/signup')}}>Start a free trial</button>
        </div>

        <div className="time-img">
            <div className="time-img1">
            <img src={img1} alt="" />
                <div className="timeImg2">
                    <img src={arrow1} alt="" />
                </div>
            </div>

           
        </div>
    </div>
  )
}

export default Time