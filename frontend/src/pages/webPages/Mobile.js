import React from 'react'
import WebPagesMajor from '../../components/webComponents/WebPagesMajor'
import img13 from '../../components/webComponents/images/img13.png'
import img14 from '../../components/webComponents/images/images14.png'
import img from "../../components/webComponents/images/hero5.png"

const Mobile = () => {
  const data = {
    rev: false,
    hero_head : "“Mobile”",
    hero_text : "“Users have the ability to input and retrieve timesheet and expense data online or via their mobile devices. Our app is accessible on both the iOS and Android app stores.”",
    hero_img : img,
    section3_heading: "“Timesheet Mobile Application”",
    section3_des: "As an employer, a significant responsibility is ensuring regular and fair compensation for everyone. Yet, monitoring the hours worked by employees and contractors can be a considerable challenge. That's why having the ability to oversee everyone's timesheets from a unified, up-to-date platform can be a genuine lifesaver.",
    section_4_head_1 : "Explore the Complete Features of TimeTraker's Solution",
    section_4_head_2: "“Our time-tracking mobile app allows your employees and contractors to clock in or out quickly and easily”",
    section_4_para:"This timesheet mobile app provides multiple benefits such as:",
    section_4_para_data : [
      {
        head: "Convenient Accessibility: ",
        body: "This tool, available as both a web-based application and a mobile app, allows your team to update their hours or expense details instantly from virtually anywhere with an internet or Wi-Fi connection."
      },
      {
        head: "Automated Tracking: ",
        body: "The built-in timer enables users to monitor their time and expense data in real-time."
      },
      {
        head: "Multi-Platform Support: ",
        body: "Accessible from a desktop browser or an iPhone and Android device, this timesheets app ensures flexibility."
      },
      {
        head: "Error Reduction: ",
        body: "You have control over who can access job codes, reducing errors stemming from data entry mistakes."
      },
      {
        head: "Streamlined Communications: ",
        body: "All tasks, including communication with employees and contractors, can be managed through a centralized dashboard, eliminating the need for multiple platforms."
      },
      {
        head: "Data Control: ",
        body: "Easily distinguish billable from non-billable hours and apply various filters. The mobile app allows extensive customization of your reporting within the platform.  "
      },
    ],
    section_4_img : img14,
    section_5_head_2: "“Select TimeTraker and streamline your processes”",
    section_5_para_1 :"Our tracking solution links with your current QuickBooks system quickly, letting you use it right away. It not only tracks time but also provides similar advantages for monitoring your business expenses. The best part is, we offer a free 30-day trial so you can explore all its features without making a full commitment.",
    section_5_para_2:"",
    section_5_img : img13,
  }
  return (
    <div>
      <WebPagesMajor data={data}/>
    </div>
  )
}

export default Mobile
