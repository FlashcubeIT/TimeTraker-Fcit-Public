import React, { useState } from 'react'
import "./Faq.css"


const Faq = () => {
    const[toggle1, setToggle1] = useState(true)
    const[toggle2, setToggle2] = useState(true)
    const[toggle3, setToggle3] = useState(true)
    const[toggle4, setToggle4] = useState(true)
    const[toggle5, setToggle5] = useState(true)
    const[toggle6, setToggle6] = useState(true)

    const handleToggle1 = () => {
        setToggle1(!toggle1)
    }
    const handleToggle2 = () => {
        setToggle2(!toggle2)
    }
    const handleToggle3 = () => {
        setToggle3(!toggle3)
    }
    const handleToggle4 = () => {
        setToggle4(!toggle4)
    }
    const handleToggle5 = () => {
        setToggle5(!toggle5)
    }
    const handleToggle6 = () => {
        setToggle6(!toggle6)
    }


  return (
    <div className='mainContainer1' id='faq' >
        <div style={{display: 'flex'}}>
            <h4 >Frequently Asked Questions (FAQ’s)</h4>             
        </div>

        <div className='headContainer1' onClick={handleToggle1} >
            <div className='headIcon1'>
                <i onClick={handleToggle1} class={toggle1 ? "fa-solid fa-plus" : "fa-solid fa-minus" }></i>
                <h1 onClick={handleToggle1}>What is a "<span style={{color: "#04542C"}}>TIMETRAKER</span>", and how does it work?</h1>
            </div>
            <div className='para1' style={{display : toggle1 ? "none": "block"}}>
                <p>A "<span style={{color: "#04542C"}}>TIMETRAKER</span>" is a software tool or application that helps individuals or businesses monitor and record the time spent on various tasks and activities. It is commonly used for tracking work hours, project management, productivity analysis, and billing purposes.</p>
            </div>
        </div>

        <div className='headContainer1' onClick={handleToggle2}>
            <div className='headIcon1'>
                <i onClick={handleToggle2} class={toggle2 ? "fa-solid fa-plus" : "fa-solid fa-minus" }></i>
                <h1 onClick={handleToggle2}>Why should I use a "<span style={{color: "#04542C"}}>TIMETRAKER</span>" for my business or personal activities?</h1>
            </div>
            <div className='para1' style={{display : toggle2 ? "none": "block"}}>
                <p> In both business and personal contexts, "<span style={{color: "#04542C"}}>TIMETRAKER</span>" provides valuable data that can lead to improved decision-making, increased efficiency, and a better balance between work and personal life. It's a tool that empowers you to make the most of your time and resources.</p>
            </div>
        </div>

        <div className='headContainer1' onClick={handleToggle3}>
            <div className='headIcon1'>
                <i onClick={handleToggle3} class={toggle3 ? "fa-solid fa-plus" : "fa-solid fa-minus" }></i>
                <h1 onClick={handleToggle3}>Is it possible to track time on multiple projects or tasks simultaneously?  </h1>
            </div>
            <div className='para1' style={{display : toggle3 ? "none": "block"}}>
                <p> Integrating a "<span style={{color: "#04542C"}}>TIMETRAKER</span>" with other business tools can lead to increased efficiency, accuracy, and productivity. It streamlines operations, simplifies data management, and enables businesses to make data-driven decisions based on real-time insights.</p>
            </div>
        </div>

        <div className='headContainer1' onClick={handleToggle4} >
            <div className='headIcon1'>
                <i onClick={handleToggle4} class={toggle4 ? "fa-solid fa-plus" : "fa-solid fa-minus" }></i>
                <h1 onClick={handleToggle4}>What are the benefits of integrating a "<span style={{color: "#04542C"}}>TIMETRAKER</span>" with other business tools?</h1>
            </div>
            <div className='para1' style={{display : toggle4 ? "none": "block"}}>
                <p>yes, it is secure and private time "<span style={{color: "#04542C"}}>TIMETRAKER</span>" software.</p>
            </div>
        </div>

        <div className='headContainer1' onClick={handleToggle5}>
            <div className='headIcon1'>
                <i onClick={handleToggle5} class={toggle5 ? "fa-solid fa-plus" : "fa-solid fa-minus" }></i>
                <h1 onClick={handleToggle5}>Is time "<span style={{color: "#04542C"}}>TIMETRAKER</span>" software secure and private?</h1>
            </div>
            <div className='para1' style={{display : toggle5 ? "none": "block"}}>
                <p>Generating reports and analyzing time "<span style={{color: "#04542C"}}>TIMETRAKER</span>" data is an essential part of the process. It helps you gain insights into how time is allocated, assess productivity, and make informed decisions.</p>
            </div>
        </div>

        <div className='headContainer1' onClick={handleToggle6} >
            <div className='headIcon1'>
                <i onClick={handleToggle6} class={toggle6 ? "fa-solid fa-plus" : "fa-solid fa-minus" }></i>
                <h1 onClick={handleToggle6}>How can I generate reports and analyze time "<span style={{color: "#04542C"}}>TIMETRAKER</span>" data?</h1>
            </div>
            <div className='para1' style={{display : toggle6 ? "none": "block"}}>
                <p>Yes, we can incorporate SEO best practices into the website development process to help improve your site's visibility on search engines.</p>
            </div>
        </div>
    </div>
   
  )
}

export default Faq