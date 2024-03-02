import React from 'react'
import "./LeftSide1.css"
import {Container, Col, Row} from 'react-bootstrap'
import { Form , Button} from 'react-bootstrap'
import img1 from "../img/7830768_optimization_timer_icon 2.svg"
import img2 from "../img/Group 7.svg"
import img3 from "../img/9004782_lock_security_secure_protect_icon 2.svg"
import img4 from "../img/329-Document Report.svg"
import img5 from "../img/1564515_call_device_mobile_phone_smartphone_icon 2.svg"
import img6 from "../img/8665100_calculator_icon 2.svg"
import img7 from "../img/352032_attach_file_icon 2.svg"
import img8 from "../img/8541866_hand_holding_usd_icon 2.svg"


const LeftSide1 = () => {
  return (
    <div >       
                 
            {/* column left */}
            <div xs={12} sm={12} md={12} lg={7} className='header-left'>
             <h1>“The all-in-one employee management app designed for all types of businesses”</h1>
             
             <div className="img-container">                    
             <div className="img">
                        <img src={img1} alt="" />
                        <p className='mt-3'>Timesheets</p>
                    </div>                    
                <div className="img">
                        <img src={img2} alt="" />
                        <p>Expense Tracking</p>
                    </div>                   
                <div className="img">
                        <img src={img3} alt="" />
                        <p  className='mt-4'>Secure Data</p>
                    </div>                   
                <div className="img">
                        <img src={img4} alt="" />
                        <p className='mt-4'>Reporting</p>
                    </div>
             </div>

            <div className="img-container">                
            <div className="img">
                        <img src={img5} alt="" />
                        <p className='mt-3' >Mobile</p>
                    </div>
               
                <div className="img">
                        <img src={img6} alt="" />
                        <p>Mileage Calculator</p>
                    </div>
               
                <div className="img">
                        <img src={img7} alt="" />
                        <p>Attach Receipts</p>
                    </div>
              
                <div className="img">
                        <img src={img8} alt="" />
                        <p>Simple Pricing</p>
                    </div>
            </div>              

            <p className='header-left-para'>Begin with Company Name today to save time and money for yourself, your team, and your company.</p>

            </div>
           
        
</div>
  )
}

export default LeftSide1