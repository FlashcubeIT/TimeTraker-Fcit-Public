import { Grid } from '@mui/material'
import React from 'react'
import img1 from "../../img/7830768_optimization_timer_icon 2.svg"
import img2 from "../../img/Group 7.svg"
import img3 from "../../img/9004782_lock_security_secure_protect_icon 2.svg"
import img4 from "../../img/329-Document Report.svg"
import img5 from "../../img/1564515_call_device_mobile_phone_smartphone_icon 2.svg"
import img6 from "../../img/8665100_calculator_icon 2.svg"
import img7 from "../../img/352032_attach_file_icon 2.svg"
import img8 from "../../img/8541866_hand_holding_usd_icon 2.svg"
import "./LeftSideBar.css"

const LeftSideBar = () => {
    return (
        <div style={{padding: "20px"}}>
            <h3 className='left_heading'>“The all-in-one employee management app designed for all types of businesses”</h3>
            <div className='card_parent_for_log'>
                <div className="card_log">
                    <img src={img1} alt="" />
                    <p >Timesheets</p>
                </div>
                <div className="card_log">
                    <img src={img2} alt="" />
                    <p>Expense Tracking</p>
                </div>
                <div className="card_log">
                    <img src={img3} alt="" />
                    <p >Secure Data</p>
                </div>
                <div className="card_log">
                    <img src={img4} alt="" />
                    <p >Reporting</p>
                </div>
            </div>
            <div className='card_parent_for_log'>
                <div className="card_log">
                    <img src={img5} alt="" />
                    <p  >Mobile</p>
                </div>

                <div className="card_log">
                    <img src={img6} alt="" />
                    <p>Mileage Calculator</p>
                </div>

                <div className="card_log">
                    <img src={img7} alt="" />
                    <p>Attach Receipts</p>
                </div>

                <div className="card_log">
                    <img src={img8} alt="" />
                    <p>Simple Pricing</p>
                </div>
            </div>
            <p className='left_side_foot_log'>Begin with Company Name today to save time and money for yourself, your team, and your company.</p>
        </div>
    )
}

export default LeftSideBar
