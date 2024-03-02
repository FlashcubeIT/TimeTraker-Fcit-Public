import React from 'react'
import WebPagesMajor from '../../components/webComponents/WebPagesMajor'
import img11 from '../../components/webComponents/images/images11.png'
import img12 from '../../components/webComponents/images/img12.png'
import img from "../../components/webComponents/images/hero6.png"

const Calculator = () => {
  const data = {
    rev: true,
    hero_head : "“Mileage Calculator”",
    hero_text : "“Searching for a convenient method to oversee your employees' mileage? Automatically determine trip distances and costs based on the current IRS reimbursement rate.",
    hero_img : img,
    section3_heading: "“Distance Refund Calculator”",
    section3_des: "Keeping track of how much your employees travel is a big job. It's even harder when you have lots of vehicles and drivers moving around every day. It's really important to keep a record of every mile they drive. This helps make sure your staff gets paid back correctly and on time. It's also important for keeping good records and managing money. Tracking mileage helps you make smart choices about travel and costs. If you have a good mileage calculator, it can make a big difference in how much money you make.",
    section_4_head_1 : "TimeTraker offers the solution",
    section_4_head_2: "“TimeTraker offers a mileage reimbursement calculator as a feature of our all-inclusive expense-tracking platform.”",
    section_4_para:"Here are some advantages of using our travel reimbursement software: ",
    section_4_para_data : [
      {
        head: "Accessible Anywhere:",
        body: "Our web-based tools allow you and your team to track and calculate mileage from any location with internet or Wi-Fi access, including your cell phone."
      },
      {
        head: "Flexible Reimbursement Rates:",
        body: "Customize reimbursement rates by setting a company-wide standard or creating unique rates for each user."
      },
      {
        head: "User-Friendly Interface:",
        body: "Our solution features an intuitive interface, ensuring you won't waste time navigating complicated menus."
      },
      {
        head: "Automatic Updates:",
        body: "The mileage compensation calculator automatically retrieves the latest rates from the IRS, providing the most accurate assessment for reimbursing your workers."
      },
      {
        head: "Quick Responses:",
        body: "With our always-connected product, managers can respond promptly the moment they receive a compensation request from an employee."
      },
      {
        head: "Smooth Integration:",
        body: "Our solution seamlessly integrates with your existing QuickBooks setup, simplifying the invoicing process."
      },
    ],
    section_4_img : img11,
    section_5_head_2: "“Try out the advantages for yourself”",
    section_5_para_1 :"We have a tool, the reimbursement calculator, which is one of the many tools we offer to track and manage your business expenses and your staff's time. You can link it to your QuickBooks in just a few seconds, and you're free to cancel anytime without losing your data. The best part is, we're giving you a free 30-day trial so you can try it out without making a commitment right away.",
    section_5_para_2:"",
    section_5_img : img12,
  }
  return (
    <div>
      <WebPagesMajor data={data}/>
    </div>
  )
}

export default Calculator
