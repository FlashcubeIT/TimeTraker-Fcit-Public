import React from "react";
import "./FeaturedBlogPage1.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import makeImg from "../img/ManageImg.png";
import TimeSavingImg1 from "../img/RealImg1.png";
import TimeSavingImg2 from "../img/RealImg2.png";
import TimeSavngImg3 from "../img/TimeSavigImg3.png";
import EnhanceImg1 from "../img/IntegrationImg1.png";
import EnhanceImg2 from "../img/IntegrationImg2.png";
import { useNavigate } from "react-router-dom";

const FeaturedBlogPage3 = () => {
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
        “Manage your spend on the road with TimeTraker”
      </h1>

      <img src={makeImg} alt="" />

      <p>
      In the fast-paced world of business, professionals often find themselves constantly on the move, attending meetings, conferences, and managing projects from different locations. With this dynamic lifestyle comes the challenge of efficiently tracking and managing expenses incurred on the road. Enter TimeTraker, your ultimate companion in seamlessly managing your spend while on the move. In this blog post, we'll explore how TimeTraker can revolutionize the way you handle expenses, making it a breeze to stay organized and in control.
      </p>
    </div>

    {/* Time Saving */}
    <div className="TimeSaving TimeSavingReverse ">
      <div className="TimeSavingLeft">
        <h1>
          <span>Real-time Expense Tracking:</span> TimeTraker empowers you to capture and record expenses in real-time. Whether you're grabbing a quick coffee, filling up the gas tank, or entertaining clients over dinner, simply log the expense on the spot. No more sifting through receipts at the end of the month—stay on top of your spending as it happens.
        </h1>

        <h1>
          <span>Mobile Accessibility:</span> The beauty of TimeTraker lies in its mobile accessibility. The user-friendly mobile app ensures that you can manage your expenses from anywhere with just a few taps on your smartphone. Say goodbye to the hassle of paperwork and hello to a streamlined expense tracking process that fits right in your pocket.
        </h1>

        <h1>
          <span>Categorization and Customization:</span> Customize TimeTraker to fit your unique spending categories. Whether it's transportation, accommodation, meals, or miscellaneous expenses, easily categorize and sub-categorize your expenditures for a comprehensive overview of your spending patterns. Tailor TimeTraker to suit your specific needs and industry requirements.
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
          <span>Integration with Financial Tools:</span> TimeTraker seamlessly integrates with popular financial tools and accounting software. This integration ensures that your expense data flows effortlessly into your financial systems, eliminating the need for manual data entry and minimizing the risk of discrepancies. Keep your financial records up-to-date with minimal effort.ccurate time tracking
          regardless of location.
        </h1>

        <h1>
          <span>Policy Compliance Checks: </span>
          Stay compliant with company policies and industry regulations using TimeTraker's policy compliance checks. The system can flag potential policy violations, helping you adhere to spending guidelines and avoid unnecessary complications. This feature adds an extr
        </h1>

        <h1>
          <span>Reporting and Analytics: </span>
          Leverage TimeTraker's reporting and analytics features to gain valuable insights into your spending habits. Identify trends, analyze patterns, and make informed decisions to optimize your budget. The robust reporting tools ensure that you have a clear understanding of where your money is going, empowering you to make strategic financial choices.as a forward-thinking and environmentally
          conscious organization.
        </h1>
      </div>
    </div>

    <div className="bottomTextBtn">
      <p>
      Stay compliant with company policies and industry regulations using TimeTraker's policy compliance checks. The system can flag potential policy violations, helping you adhere to spending guidelines and avoid unnecessary complications. This feature adds an extr
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

export default FeaturedBlogPage3