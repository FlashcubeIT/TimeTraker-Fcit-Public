import React from "react";
import "./FeaturedBlogPage1.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import makeImg from "../img/ExclusiveImg.png";
import TimeSavingImg1 from "../img/SessionsImg1.png";
import TimeSavingImg2 from "../img/SessionsImg2.png";
import TimeSavngImg3 from "../img/TimeSavigImg3.png";
import EnhanceImg1 from "../img/ExhibitorImg1.png";
import EnhanceImg2 from "../img/ExhibitorImg2.png";
import { useNavigate } from "react-router-dom";

const FeaturedBlogPage7 = () => {
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
        “Exclusive Guide to QuickBooks Connect 2023”
        </h1>

        <img src={makeImg} alt="" />

        <p>
        QuickBooks Connect 2023 promises to be bigger and better than ever before. With a focus on innovation, education, and networking, this event is designed to empower attendees with the knowledge and tools needed to thrive in the ever-evolving landscape of finance and accounting.
        </p>
      </div>

      {/* Time Saving */}
      <div className="TimeSaving TimeSavingReverse ">
        <div className="TimeSavingLeft">
          <h1>
            <span>Educational Sessions :</span> Dive deep into a wide range of educational sessions tailored to different skill levels and interests. Whether you're looking to master advanced QuickBooks features, stay updated on the latest tax regulations, or explore cutting-edge technologies shaping the industry, there's a session for you. Be sure to plan your schedule in advance to make the most of this valuable learning opportunity.
          </h1>

          <h1>
            <span>Product Demonstrations:</span> Get a firsthand look at the latest updates and features in QuickBooks with live product demonstrations. Discover how new tools and integrations can streamline your workflow, save time, and enhance your overall productivity. Experts will be on hand to answer your questions and provide personalized guidance.
          </h1>

          <h1>
            <span>Networking Opportunities:</span> Connect with like-minded professionals, entrepreneurs, and industry experts during networking sessions. Share your experiences, exchange ideas, and build valuable relationships that can contribute to your professional growth. Don't forget your business cards – you never know who you might meet!
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
            <span>Exhibitor Hall:</span>
            Explore the exhibitor hall to discover a variety of products and services that complement the QuickBooks ecosystem. From third-party integrations to financial tools and business services, the exhibitor hall is a treasure trove of resources for attendees looking to expand their toolkit.
          </h1>

          <h1>
            <span>Keynote Speakers: </span>
            Prepare to be inspired by industry leaders and visionaries who will take the stage to share their insights and experiences. From thought-provoking discussions on the future of accounting to practical tips for business success, the keynote speakers at QuickBooks Connect 2023 are sure to leave a lasting impression.
          </h1>

        </div>
      </div>

      <div className="bottomTextBtn">
        <p>
        QuickBooks Connect 2023 is set to be a game-changer for accounting professionals and business owners alike. Stay tuned for updates, announcements, and exclusive coverage right here. We look forward to seeing you at the event and sharing the exciting experiences that QuickBooks Connect 2023 has in store!
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

export default FeaturedBlogPage7