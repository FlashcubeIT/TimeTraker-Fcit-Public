import React from 'react'
import WebPagesMajor from '../../components/webComponents/WebPagesMajor'
import img1 from '../../components/webComponents/images/img1.png'
import img2 from '../../components/webComponents/images/images2.png'
import img from "../../components/webComponents/images/hero1.png"

const Timesheet = () => {
  const data = {

    rev: false,
    hero_head : "“Timesheets”",
    hero_text : " “Workers, whether employees or contractors, have the flexibility to monitor their hours worked at any time, using a computer or mobile app from any location.”",
    hero_img : img,
    section3_heading: "“Online Time Tracking Platforms”",
    section3_des: "Maintaining precise documentation of the hours worked by your employees and contractors is essential for the smooth functioning of your operations. Discrepancies or disputes in this regard can result in considerable challenges for your office, potentially leading to legal complications. Nevertheless, processing payroll using traditional paper records or spreadsheets can be a laborious and time-intensive task. Thankfully, the web-based timesheet feature of TimeTraker offers a solution to these challenges, simplifying your entire operational process.",
    section_4_head_1 : "Crafted to meet the needs of both you and your team",
    section_4_head_2: "“Improve the accuracy of your books and cut down on the amount of time and effort your staff needs to spend on this aspect of your accounting.”",
    section_4_para:"Our system offers many benefits, including: ",
    section_4_para_data : [
      {
        head: "Versatility:",
        body: "Created with managers, employees and contractors in mind, our web-based employee timesheet app allows your workers to track their time from wherever they are, at any time."
      },
      {
        head: "Customization:",
        body: "You can customize permissions for users and manage employee preferences without hassle."
      },
      {
        head: "Syncing with QuickBooks:",
        body: "Export all timesheet data and get reports on job costing without leaving QuickBooks."
      },
      {
        head: "Accessibility:",
        body: "Because all information is stored securely in the cloud, you can access our online timesheet software no matter where you are. "
      },
      {
        head: "Ease of use:",
        body: "Our solution is simple to understand, so practically anyone can jump in and start using it immediately."
      }
    ],
    section_4_img : img1,
    section_5_head_2: "“What makes TimeTraker the ideal choice?”",
    section_5_para_1 :"At TimeTraker, we provide the easiest, most affordable way to track and manage your time and expenses. Using our desktop and mobile platforms means you can save a significant amount of time compared to entering information by hand into a spreadsheet or ledger.",
    section_5_para_2:"Moreover, our system seamlessly integrates with QuickBooks in a matter of seconds, allowing you to incorporate it into your current suite with minimal effort. For those who prefer to test the waters before making a purchase decision, we provide a 30-day free trial, enabling you to explore the full range of features our apps offer for your business without an immediate commitment.",
    section_5_img : img2,
  }
  return (
    <div>
      <WebPagesMajor data={data}/>
    </div>
  )
}

export default Timesheet
