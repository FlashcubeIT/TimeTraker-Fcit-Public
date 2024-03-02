import React, { useEffect } from "react";
import "./FeaturesPage.css";
import Navbar from "../components/Navbar";
import "../components/webComponents/WebPagesMajor.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Footer2 from "../components/Footer2";
import img11 from "../components/webComponents/images/hero1.png";
import img12 from "../components/webComponents/images/hero2.png";
import img from "../components/webComponents/images/hero6.png";
import img13 from "../components/webComponents/images/hero4.png";
import reportImg from "../components/webComponents/images/hero6.png";
import Features from "../components/Features";
import bubbleImg from "../components/webComponents/images/hero_b.svg"

const FeaturesPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#fff" }}>
      {/* section 1 */}
      <div>
        <Navbar />
      </div>

      {/* PrimeFeatures */}
      <div className="PrimeFeatures">
        <div className="PrimeFeaturesLeft">
          <img className="PrimeFeaturesLeftImg"  src={img} alt="" />
          <img className="bubbleImg1" src={bubbleImg} alt="" />
        </div>

        <div className="PrimeFeaturesRight">
          <h1>“Our Prime Features”</h1>
          <p>
            Unlock efficiency with our prime features: Timesheets for precise
            time tracking, Expense Tracking for seamless financial management,
            Reporting for insightful analytics, and Mileage Calculator for
            precision in travel expense calculations. Streamline your workflow,
            optimize resource allocation, and make informed decisions with our
            comprehensive suite of tools.
          </p>

          <div className="PrimeFeaturesRightBtn">
            <button
              onClick={() => {
                navigate("/signup");
              }}
            >
              30-Day Free Trial
            </button>
          </div>
        </div>
      </div>

      {/* Precision Timing */}
      <div className="PrecisionTiming">
        <h1>
          “Precision Timing, Seamless Workflow, and Enhanced Productivity
          Unleashed.”
        </h1>
        <p>
          Experience the power of TimerTraker, where precision timing meets
          seamless workflow, unlocking enhanced productivity. This dynamic tool
          ensures accurate time tracking, streamlining tasks for optimal
          efficiency. Unleash the full potential of your workday with
          TimerTraker.
        </p>
      </div>

      {/* TimeTraker Timesheet */}
      <div className="report-container-main">
        <div className="report-right">
          <img className="report-right-img" src={img11} alt="" />
          <img className="bubbleImg2" src={bubbleImg} alt="" />
        </div>

        <div className="report-left">
          <h1>
            “TimeTraker Timesheet: Effortless Time Management for Peak Workforce
            Efficiency.”
          </h1>
          <p>
            Revolutionize your workforce efficiency with TimeTraker Timesheet, a
            game-changer in time management. This innovative tool offers a
            seamless and intuitive interface, making time tracking effortless
            for enhanced productivity. Streamline task allocation, track project
            progress, and ensure accurate payroll with automated calculations.
            TimeTraker Timesheet empowers your team to focus on what matters
            most, eliminating the complexities of time management. Experience
            peak efficiency as you optimize resource allocation, monitor project
            timelines, and foster a culture of accountability with TimeTraker
            Timesheet.
          </p>

          <div className="PrimeFeaturesRightBtn">
            <button
              onClick={() => {
                navigate("/signup");
              }}
            >
              30-Day Free Trial
            </button>
          </div>
        </div>
      </div>

      {/*  TimeTraker Expense: */}
      <div className="mileage-container-main">
        <div className="mileage-left">
          <h1>
            “TimeTraker Expense: Streamlining Financial Management for Ultimate
            Efficiency.”
          </h1>
          <p>
            TimeTraker Expense redefines financial management with a focus on
            ultimate efficiency. This intuitive tool seamlessly integrates
            expense tracking into your workflow, providing a streamlined
            approach to financial management. Users experience unparalleled ease
            with a user-friendly interface, enabling quick and accurate expense
            recording. By automating processes and offering real-time insights,
            TimeTraker Expense enhances productivity, minimizes errors, and
            optimizes resource allocation. Say goodbye to cumbersome financial
            tracking – embrace a more efficient and effective approach with
            TimeTraker Expense.
          </p>
          <button
            onClick={() => {
              navigate("/signup");
            }}
          >
            30-Day free trial
          </button>
        </div>

        <div className="mileage-right">
          <img className="mileage-right-img" src={img12} alt="" />
          <img className="bubbleImg3" src={bubbleImg} alt="" />
        </div>
      </div>

      {/* TimeTraker Report */}
      <div className="report-container-main">
        <div className="report-right">
          <img className="report-right-img" src={img13} alt="" />
          <img className="bubbleImg2" src={bubbleImg} alt="" />
        </div>

        <div className="report-left">
          <h1>
            “TimeTraker Report: Insightful Analytics Redefining Data-Driven
            Decision-Making.”
          </h1>
          <p>
            "Empower your decision-making with TimeTraker Report, a dynamic
            solution reshaping the landscape of analytics. Dive into insightful
            data, as this tool revolutionizes how you understand and leverage
            information. With a user-friendly interface and powerful analytics,
            TimeTraker Report transforms raw data into actionable insights,
            guiding strategic decision-making. Uncover trends, monitor
            performance, and optimize strategies effortlessly. Elevate your
            business intelligence, streamline reporting processes, and harness
            the true potential of data-driven decision-making with TimeTraker
            Report."
          </p>

          <div className="PrimeFeaturesRightBtn">
            <button
              onClick={() => {
                navigate("/signup");
              }}
            >
              30-Day Free Trial
            </button>
          </div>
        </div>
      </div>

      {/*  Mileage Calculator */}
      <div className="mileage-container-main">
        <div className="mileage-left">
          <h1>
            “TimeTraker Mileage: Precision Calculations Redefining Travel
            Expense Management.”
          </h1>
          <p>
            "Embark on a new era of travel expense management with TimeTraker
            Mileage, where precision calculations redefine the norm. This
            innovative tool streamlines the process of tracking and managing
            mileage, ensuring accuracy and efficiency in expense reporting. With
            a user-friendly interface and automated calculations, TimeTraker
            Mileage simplifies the task of recording and reimbursing travel
            expenses. Experience a seamless journey in expense management as
            TimeTraker Mileage transforms the way you handle and optimize
            travel-related financial transactions."
          </p>

          <button
            onClick={() => {
              navigate("/signup");
            }}
          >
            30-Day free trial
          </button>
        </div>

        <div className="mileage-right">
          <img className="mileage-right-img" src={reportImg} alt="" />
          <img className="bubbleImg3" src={bubbleImg} alt="" />
        </div>
      </div>

      {/* more features */}
      <div style={{ margin: "100px 0", textAlign: "center", paddingLeft: '15px', paddingRight: '15px' }}>
        <Features />

        <button
          className="featButton"
          style={{ marginTop: "50px" }}
          onClick={() => {
            navigate("/signup");
          }}
        >
          30-Day free trial
        </button>
      </div>
      {/* section 5  */}

      <Footer />
      <Footer2 />
    </div>
  );
};

export default FeaturesPage;
