import React from 'react'
import "./Price.css"
import { useNavigate } from 'react-router-dom'

const Price = () => {
  const navigate = useNavigate()
  return (
    <div className='price-container' id='price' >
      <h1>“Pricing”</h1>
      <div className="price-card-container">
        <div className="price-card price-card_1">
            <h2>Free</h2>
            <p className='dollar'>$ 0.00 <strong className='dollar1'> /Month </strong> </p>
            <div className="price-text">
              <p> <i className="fa-regular fa-square-check"></i> <span style={{marginLeft: '10px'}} >Unlimited user</span></p>
              <p> <i className="fa-regular fa-square-check"></i> <span style={{marginLeft: '10px'}} >Timesheets</span> </p>
              <p><span >Employee Expenses</span></p>
              <p><span>Quick-book Integration</span></p>
              <p> <i className="fa-regular fa-square-check"></i> <span style={{marginLeft: '10px'}} >Customizable</span></p>
              <p><span>Approve Workflow</span></p>
              <p><span>Project Assignment</span> </p>
              <p><span>   Budgeting </span></p>
              <p><span>Value pricing</span></p>
            </div>
            <p className='para-last'>Add Invoicing $2 per user/month</p>
            <div className="price-btn">
              <button onClick={()=>{navigate('/signup')}}>Free Trial</button>
            </div>
        </div>
        <div className="price-card price-card_2 price-card-middle">
            <h2>Professional</h2>
            <p className='dollar'>$ 6.00 <strong className='dollar1'> /Month </strong> </p>
            <div className="price-text">
              <p> <i className="fa-regular fa-square-check"></i> <span style={{marginLeft: '10px'}} >Unlimited user</span></p>
              <p> <i className="fa-regular fa-square-check"></i> <span style={{marginLeft: '10px'}} >Timesheets</span> </p>
              <p> <i className="fa-regular fa-square-check"></i> <span style={{marginLeft: '10px'}} >Employee Expenses</span></p>
              <p> <i className="fa-regular fa-square-check"></i> <span style={{marginLeft: '10px'}} >Quick-book Integration</span></p>
              <p> <i className="fa-regular fa-square-check"></i> <span style={{marginLeft: '10px'}} >Customizable</span></p>
              <p><span>Approve Workflow</span></p>
              <p><span>Project Assignment</span> </p>
              <p><span>   Budgeting </span></p>
              <p> <i className="fa-regular fa-square-check"></i> <span style={{marginLeft: '10px'}} >Value pricing</span></p>
            </div>
            <p className='para-last'>Add Invoicing $2 per user/month</p>
            <div className="price-btn">
              <button onClick={()=>{navigate('/signup')}}>Free Trial</button>
            </div>
        </div>
        <div className="price-card price-card_3">
            <h2>Enterprise</h2>
            <p className='dollar'>$ 10.00 <strong className='dollar1'> /Month </strong> </p>
            <div className="price-text">
              <p> <i className="fa-regular fa-square-check"></i> <span style={{marginLeft: '10px'}} >Unlimited user</span></p>
              <p> <i className="fa-regular fa-square-check"></i> <span style={{marginLeft: '10px'}} >Timesheets</span> </p>
              <p> <i className="fa-regular fa-square-check"></i> <span style={{marginLeft: '10px'}} >Employee Expenses</span></p>
              <p> <i className="fa-regular fa-square-check"></i> <span style={{marginLeft: '10px'}} >Quick-book Integration</span></p>
              <p> <i className="fa-regular fa-square-check"></i> <span style={{marginLeft: '10px'}} >Customizable</span></p>
              <p> <i className="fa-regular fa-square-check"></i> <span style={{marginLeft: '10px'}} >Approve Workflow</span></p>
              <p> <i className="fa-regular fa-square-check"></i> <span style={{marginLeft: '10px'}} >Project Assignment</span> </p>
              <p> <i className="fa-regular fa-square-check"></i> <span style={{marginLeft: '10px'}} >Budgeting </span></p>
              <p> <i className="fa-regular fa-square-check"></i> <span style={{marginLeft: '10px'}} >Value pricing</span></p>
            </div>
            <p className='para-last'>Add Invoicing $2 per user/month</p>
            <div className="price-btn">
              <button onClick={()=>{navigate('/signup')}}>Free Trial</button>
            </div>
        </div>
      </div>
        
    </div>
  )
}

export default Price