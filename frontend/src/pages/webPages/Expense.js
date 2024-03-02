import React from 'react'
import WebPagesMajor from '../../components/webComponents/WebPagesMajor'
import img3 from '../../components/webComponents/images/img3.png'
import img4 from '../../components/webComponents/images/img4.png'
import img from "../../components/webComponents/images/hero2.png"

const Expense = () => {
  const data = {
    rev: true,
    hero_head : "“Expense Tracking”",
    hero_text : "“Easily monitor both reimbursable and corporate credit card expenses for your team, whether online or on your device.”",
    hero_img : img,
    section3_heading: "“Online Expense Management Platform”",
    section3_des: "Effectively monitoring the expenses of your employees and contractors is highly crucial. It's not just about maintaining accurate records and organized accounting; tracking expenses also provides essential data for making well-informed decisions. With TimeTraker web-based expense tracking, you have a quick and convenient solution to stay on top of every dollar spent within your organization.",
    section_4_head_1 : "How TimeTracker Benefits You",
    section_4_head_2: "“One of the key features of our platform is online expense tracking, providing complete visibility and a host of other advantages.”",
    section_4_para:"Some of the numerous benefits our system can offer you are: ",
    section_4_para_data : [
      {
        head: "Tracking anytime, anywhere:",
        body: "Our web-based expense software ensures you can stay connected no matter your location, 24/7."
      },
      {
        head: "Universal accessibility:",
        body: "As an internet-based finance tracker, our online platform is compatible with a variety of devices."
      },
      {
        head: "User-friendly interface:",
        body: "Our platform is designed for ease of use, eliminating any steep learning curves."
      },
      {
        head: "Diverse options:",
        body: "Gain a comprehensive overview or focus on specific data points, such as distinguishing between employee and contractor expenses."
      },
      {
        head: "Data sharing capabilities:",
        body: "Exercise control by filtering, exporting, or downloading data in a way that aligns with your specific needs."
      },
      {
        head: "Seamless QuickBooks integration:",
        body: "Whether it's for invoicing or reimbursement purposes, our online expense manager effortlessly integrates with QuickBooks, streamlining your financial processes."
      },
    ],
    section_4_img : img4,
    section_5_head_2: "“What makes our solution the right choice?”",
    section_5_para_1 :"If you're seeking an efficient way to manage your time and resources, integrating our software is the optimal solution. Setting it up is a breeze, seamlessly connecting to your current QuickBooks configuration in mere seconds. Employees can effortlessly log their time and expenses from their computers or other connected devices, regardless of the ecosystem they operate within.",
    section_5_para_2:"Simply enroll in a 30-day complimentary trial, and afterward, it's just $6 per month per user. That's all—no extra charges for registration, downloading, setup, or updates. You can cancel at any time without affecting your QuickBooks data. With such straightforward access to the tracking you've been seeking, why not begin today?",
    section_5_img : img3,
  }
  return (
    <div>
      <WebPagesMajor data={data}/>
    </div>
  )
}

export default Expense
