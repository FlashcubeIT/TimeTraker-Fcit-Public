import React from 'react'
import WebPagesMajor from '../../components/webComponents/WebPagesMajor'
import img7 from '../../components/webComponents/images/img7.png'
import img8 from '../../components/webComponents/images/images8.png'
import img from "../../components/webComponents/images/hero4.png"

const Reporting = () => {
  const data = {
    rev: true,
    hero_head : "“Reporting”",
    hero_text : "“Efficiently access summaries and reports of the time and expense data input by your users in Excel, PDF, or CSV formats.”",
    hero_img : img,
    section3_heading: "“Insightful Reports”",
    section3_des: "Insightful reports for TimeTraker go beyond basic data presentation to provide a comprehensive understanding of time and expense management. These reports offer valuable perspectives, trends, and actionable insights for users. This helps in identifying well-performing projects, areas for improvement, and potential adjustments to resource allocation.",
    section_4_head_1 : "The Advantages of Using TimeTraker",
    section_4_head_2: "“Gain a deeper understanding of your business through profitability reports that span projects, tasks, and employees.”",
    section_4_para:"Some of the numerous benefits our system can offer you are: ",
    section_4_para_data : [
      {
        head: "Detailed Time Reports:",
        body: "Dive deeper into detailed time reports for a comprehensive understanding of how time is allocated across various projects, tasks, and users."
      },
      {
        head: "Employee Performance Reports:",
        body: "Evaluate individual and team performance with reports that highlight time contributions and efficiency across different projects and tasks."
      },
      {
        head: "Task-specific Insights:",
        body: "Drill down into task-specific reports to understand how time is distributed among different tasks within a project."
      },
      {
        head: "User-friendly Interface:",
        body: " Enjoy an intuitive and user-friendly interface that makes generating, viewing, and interpreting reports a seamless experience."
      },
      {
        head: "Expense Tracking Reports:",
        body: "Track and manage expenses efficiently with dedicated reports that provide insights into spending patterns and reimbursement needs."
      },
      {
        head: "Real-time Updates:",
        body: "Access reports with real-time updates, ensuring that you have the latest and most accurate information at your fingertips."
      },
    ],
    section_4_img : img7,
    section_5_head_2: "“Why choose our solution?”",
    section_5_para_1 :"Simply enroll in a 30-day complimentary trial, and afterward, it's just $6 per month per user. That's all—no extra charges for registration, downloading, setup, or updates. You can cancel at any time without affecting your QuickBooks data. With such straightforward access to the tracking you've been seeking, why not begin today?",
    section_5_para_2:"",
    section_5_img : img8,
  }
  return (
    <div>
      <WebPagesMajor data={data}/>
    </div>
  )
}

export default Reporting
