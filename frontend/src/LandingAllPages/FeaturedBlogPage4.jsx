import React from "react";
import "./FeaturedBlogPage1.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import makeImg from "../img/ImmersiveImg.png";
import TimeSavingImg1 from "../img/RiseImg1.png";
import TimeSavingImg2 from "../img/RiseImg2.png";
import TimeSavngImg3 from "../img/TimeSavigImg3.png";
import EnhanceImg1 from "../img/EducationalImg1.png";
import EnhanceImg2 from "../img/EducationalImg2.png";
import { useNavigate } from "react-router-dom";

const FeaturedBlogPage4 = () => {
  const navigate = useNavigate();
  return (
    <div style={{ background: "#fff" }}>
      {/* navbar */}
      <div className="contactNavbar">
        <Navbar />
      </div>

      {/* hero */}
      <div className="MakeContainer">
        <h1>
        “Immersive Webinar: Exploring the Transformative Impact of the Advisory Trend on Tax Season”
        </h1>

        <img src={makeImg} alt="" />

        <p>
        As we approach another tax season, professionals in the financial and advisory sectors find themselves amidst a rapidly evolving landscape. The traditional approach to tax preparation is undergoing a significant transformation, driven by the increasing prominence of advisory services. In this immersive webinar, we delve into the transformative impact of the advisory trend on tax season, shedding light on the crucial changes shaping the industry.
        </p>
      </div>

      {/* Time Saving */}
      <div className="TimeSaving TimeSavingReverse ">
        <div className="TimeSavingLeft">
          <h1>
            <span>Rise of Advisory Services:</span> Explore the growing shift from conventional tax preparation to advisory services. Uncover the reasons behind this trend and how it has become a game-changer for both clients and financial professionals. 
          </h1>

          <h1>
            <span>Client-Centric Approach:</span> Dive into the strategies and methodologies that revolve around a client-centric approach. Understand how advisory services empower professionals to offer personalized solutions that go beyond mere compliance.
          </h1>

          <h1>
            <span>Technology Integration:</span> Examine the role of technology in enhancing advisory services during tax season. From AI-powered analytics to cloud-based collaboration, discover the tools that are streamlining processes and improving overall efficiency.
          </h1>
          
          <h1>
            <span>Navigating Regulatory Changes:</span> Stay informed about the latest regulatory developments impacting the tax and advisory landscape. Gain insights into how professionals can adapt to changes seamlessly and maintain compliance with evolving standards
          </h1>
        </div>

        <div className="TimeSavingRight">
          <img src={TimeSavingImg1} alt="" />

          <div className="dotImgContainer">
            <img className="img-fluid" src={TimeSavingImg2} alt="" />
            <img src={TimeSavngImg3} alt="" />
          </div>
        </div>
      </div>

      {/* Enhanced Accessibility*/}
      <div className="TimeSaving">
        <div className="TimeSavingRight">
          <img src={EnhanceImg1} alt="" />

          <div className="dotImgContainer">
            <img src={TimeSavngImg3} alt="" />
            <img className="img-fluid" src={EnhanceImg2} alt="" />
          </div>
        </div>

        <div className="TimeSavingLeft">
          <h1>
            <span>Educational Initiatives:</span> Highlight the importance of ongoing education in the face of a dynamic financial environment. Explore how professionals are upskilling to stay ahead of the curve and provide valuable insights to their clients.
          </h1>

          <h1>
            <span>Client Empowerment: </span>
            Understand the role of advisory services in empowering clients to make informed financial decisions. Learn how professionals are becoming trusted advisors, guiding clients through complex tax scenarios and helping them achieve their financial goals.
          </h1>

          <h1>
            <span>Collaboration and Networking Opportunities: </span>
            Explore how webinars and virtual events foster collaboration among professionals in the industry. Discover networking opportunities that arise from sharing insights and experiences related to the advisory trend.
          </h1>
        </div>
      </div>

      <div className="bottomTextBtn">
        <p>
        The Immersive Webinar on the transformative impact of the advisory trend on tax season offers a comprehensive exploration of the changing dynamics in the financial and advisory sectors. As professionals adapt to a new era of client-focused services, the webinar provides valuable insights, strategies, and best practices to navigate the evolving landscape successfully. Join us as we uncover the opportunities and challenges that lie ahead in this exciting journey towards a more advisory-driven tax season.
        </p>
        <button
          className="featButton"
          style={{ marginTop: "30px" }}
          onClick={() => {
            navigate("/signup");
          }}
        >
          30-Day free trial
        </button>
      </div>

      {/* footer */}
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default FeaturedBlogPage4