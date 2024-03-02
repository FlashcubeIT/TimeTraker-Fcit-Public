import React from 'react'
import WebPagesMajor from '../../components/webComponents/WebPagesMajor'
import img5 from '../../components/webComponents/images/img5.png'
import img6 from '../../components/webComponents/images/img6.png'
import img from "../../components/webComponents/images/hero3.png"

const SecureData = () => {
  const data = {
    rev: false,
    hero_head : "“Secure Data”",
    hero_text : "“We have a partnership with Amazon Web Services®, the premier cloud hosting provider, and we absolutely support it.”",
    hero_img : img,
    section3_heading: "“Cloud-Based Solutions for Storing Time and Expense Data”",
    section3_des: "Protecting sensitive financial information is paramount to prevent disruptive and costly data breaches in your business. It is essential for both you and any third parties you engage with to adhere to the highest standards of data security. By utilizing TimeTraker's time and expense tracking software, you can rely on us as your trusted and secure cloud storage providers for these critical types of information.",
    section_4_head_1 : "Ensuring a Peaceful State of Mind",
    section_4_head_2: "“Utilize our solution for tracking your time and expenses, you can rest assured that secure online file storage is our highest priority”",
    section_4_para:"We team up with Amazon Web Services®, the top cloud hosting provider worldwide. All our business information stored in the cloud is kept safe at AWS' secure data centers, ensuring your most crucial digital assets are well protected. You can easily get to our cloud storage for time and expense data whenever you need it. AWS promises a 99.9% uptime guarantee, minimizing the chances of disruptions and downtime. We back up everything every night, so we're ready to recover all data if something unexpected occurs.",
    section_4_img : img5,
    section_5_head_2: "“Why TimeTraker is the right choice?”",
    section_5_para_1 :"Our solution makes tracking time and expenses easy and affordable. With our software, your team can save time that would be spent entering data manually into a spreadsheet. It costs just $6 per month per user, fitting easily into your budget. Thanks to its smooth integration with QuickBooks, data can be synced in seconds and kept secure for as long as you need.",
    section_5_para_2:"Setting up with our system is fast and easy, and we offer a free 30-day trial so you can experience the benefits for yourself.",
    section_5_img : img6,
  }
  return (
    <div>
      <WebPagesMajor data={data}/>
    </div>
  )
}

export default SecureData
