import React from 'react'
import "./Blog.css"
import blogImg1 from "../img/image 1.jpg"
import blogImg2 from "../img/image 2.jpg"
import blogImg3 from "../img/image 3.jpg"

const Blog = () => {
  return (
    <div className='blog' id='blog' >
        <h1> “Featured Blog”</h1>

        <div className="blog-container">
            <div className="blog-text">
                <img src={blogImg1} alt="" />
                <span> <i class="fa-regular fa-clock"></i> 10 mins 01 Nov, 2023</span>
                <h5>Make the Switch from Paper Timesheets to Save Time, Money, and Hand Sanitizer</h5>
                <p>If you’re still using paper timesheets at your business, save yourself the time, trouble and hand sanitizer by shifting your employee timekeeping to a digital service like TimeTraker.</p>
            </div>  

            <div className="blog-text">
                <img src={blogImg2} alt="" />
                <span> <i class="fa-regular fa-clock"></i>7 mins, 28 Oct, 2023</span>
                <h5>Ensuring Employee and Admin Satisfaction During Month-End Close</h5>
                <p style={{marginBottom: '0px'}}>If you've faced the grueling end-of-month close, you understand the frustration of collecting receipts and reports for timely book closure. Don't worry, we'll share tips to not just endure but conquer this monthly challenge.</p>
            </div> 
                       
            <div className="blog-text">
                <img src={blogImg3} alt="" />
                <span> <i class="fa-regular fa-clock"></i> 15 mins, 25 Oct, 2022</span> 
                <h5>Manage Your Spend on the Road With TimeTraker</h5>
                <p>In this article, we'll delve into how TimeTraker can enhance your upcoming business trip, whether you're globe-trotting or on a road journey.</p>
            </div>            
        </div>
    </div>
  )
}

export default Blog