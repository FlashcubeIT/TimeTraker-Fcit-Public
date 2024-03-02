import React from 'react'
import WebPagesMajor from '../../components/webComponents/WebPagesMajor'
import img9 from '../../components/webComponents/images/img9.png'
import img10 from '../../components/webComponents/images/images10.png'
import img from "../../components/webComponents/images/hero7.png"

const Receipt = () => {
  const data = {
    rev: false,
    hero_head : "“Attach Receipts”",
    hero_text : "“Upload your expense receipts effortlessly by taking a photo with your phone and attaching the receipt directly to your expense entry on your computer or mobile app.”",
    hero_img : img,
    section3_heading: "“Software to Track Receipts”",
    section3_des: "Keeping an eye on your business expenses is really important. If you don't have a clear record for every dollar you spend, getting your money back might take a long time, or they might not give it back at all, which can be a big problem for your money flow. And if someone checks your finances, It could cause even more problems. So, you have to keep all the receipts for the things your company buys. But this brings its own problems. It's not only boring and takes a lot of time to keep track of and store all the paper receipts, but it's also easy to make mistakes, even if you have the actual pieces of paper.",
    section_4_head_1 : "Count on TimeTraker for the answer",
    section_4_head_2: "“TimeTraker provides tools, including software for tracking receipts, to make the process quick and easy.”",
    section_4_para:"Here are some benefits of our software for managing receipts and expenses:",
    section_4_para_data : [
      {
        head: "Easy to Use:",
        body: "Adding your receipts is simple. Just take a picture of each document with your phone, and our system automatically puts it in the right expense category."
      },
      {
        head: "Access Anywhere:",
        body: "Whether you're on a computer or using our app on Android or iOS, our receipt tracking app for small businesses lets you stay updated wherever you are."
      },
      {
        head: "Full Access:",
        body: "Being able to check your entries anytime makes expense management much easier. No need to sort through multiple invoices, and you can filter, export, and download all the data you need."
      }
    ],
    section_4_img : img9,
    section_5_head_2: "“Take charge with TimeTraker”",
    section_5_para_1 :"Getting our software ready is super simple. Also, take advantage of a 30-day trial to discover its capabilities. Following that, our software is only $6 per month for each user, with no commitments and no disruption to your systems if you decide to cancel for any reason. Click the link below to begin and experience the advantages for your operations.",
    section_5_para_2:"",
    section_5_img : img10,
  }
  return (
    <div>
      <WebPagesMajor data={data}/>
    </div>
  )
}

export default Receipt
