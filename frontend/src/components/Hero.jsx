import React from 'react'
import "./Hero.css"
import heroImg1 from "../img/HeroImg1.png"
import heroImg2 from "../img/HeroImg2.png"
import heroImg3 from "../img/HeroImg3.png"
import heroImg5 from "../img/HeroImg5.png"
import arrowbtn1 from "../img/arrow-btn1.png"
import arrowbtn2 from "../img/arrow-btn3.svg"
import arrowbtn3 from "../img/arrow3.svg"
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const navigate = useNavigate()
  return (
    <div className='hero-container'>
        <div className="hero-text">
            <h1 id='home' >“Time management solutions tailored to match your business needs and financial constraints”</h1>
            <p>Begin with TimeTraker today to save time and money for yourself, your team, and your company.</p>
            <button onClick={()=>{navigate('/signup')}}>Start a free trial</button>
        </div>

        <div className="hero-img">
            <div className="img1">
                <img  className='arrow-btn1' src={arrowbtn1} alt="" />
                <img  className='arrow-btn2' src={arrowbtn2} alt="" />
                <img src={heroImg1} alt="" />
            </div>

            <div className="img2">
                <div className="img2-child1">
                    <img src={heroImg2} alt="" />
                </div>
                <div className="img2-child2">
                    <img src={heroImg3} alt="" />
                    <p>Everything you need to automate timesheets, finish jobs, and get paid faster</p>
                </div>
            </div>

            <div className="img3">
                <img src={heroImg5} alt="" />
                <img className='arrow-btn3' src={arrowbtn3} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Hero