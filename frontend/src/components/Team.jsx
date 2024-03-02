import React from 'react'
import "./Team.css"
import IconImg from "../img/timeIcon.png"
import timeImg1 from "../img/teamImg1.png"
import timeImg2 from "../img/teamImg2.png"
import arrow1 from '../img/arrow1.svg'
import { useNavigate } from 'react-router-dom'
import img3 from "../img/landingImg3.png"

const Team = () => {
    const navigate = useNavigate()
  return (
    <div className='team-container'>
        <div className="team-text">
            <div className='icon-img'>
                <h6>Scheduling for Staff and Teams</h6>
                <img src={IconImg} alt="" />
            </div>
            <h5>“Scheduling field work has never been easier than click, drag, done”</h5>
            <p>Generate staff schedules, manage job assignments, tasks, and provide job site instructions. Effortlessly adjust schedules or reassign tasks to another team member with the ease of a simple click, drag, and drop.</p>
            <button onClick={()=>{navigate('/signup')}}>Start a free trial</button>
        </div>

        <div className="time-img">
            <div className="time-img1">
            <img src={img3} alt="" />
                <div className="timeImg2">
                    <img src={arrow1} alt="" />
                </div>
            </div>

           
        </div> 
    </div>
  )
}

export default Team