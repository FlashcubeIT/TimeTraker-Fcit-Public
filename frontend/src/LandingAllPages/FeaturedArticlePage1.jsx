import React from "react";
import "./FeaturedArticlePage1.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import PresentingImg from "../img/PresentingImg.png";
import EvolutionImg from "../img/EvolutionImg.png";

const FeaturedArticlePage1 = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#fff" }}>
      {/* navbar */}
      <div className="contactNavbar">
        <Navbar />
      </div>

      {/* Presenting Multi-Level  */}
      <div className="presentingContainer">
        <div className="presentingLeft">
          <h1>
            “Presenting Multi-Level Approval System: Enhance Your Time Tracking
            Journey”
          </h1>
          <p>
            In today's dynamic business environment, efficient time management
            is a cornerstone of success. As organizations strive to optimize
            productivity, the need for a streamlined time tracking process
            becomes paramount. Introducing the Multi-Level Approval System – a
            cutting-edge solution designed to elevate and enhance your time
            tracking journey.
          </p>
        </div>

        <div className="presentingRight">
          <img src={PresentingImg} alt="" />
        </div>
      </div>

      {/* EvolutionContainer */}
      <div className="EvolutionContainer">
        <h1>“The Evolution of Time Tracking”</h1>
        <p>
          Traditional time tracking methods often encounter challenges related
          to accountability, accuracy, and transparency. The Multi-Level
          Approval System addresses these pain points by introducing a
          sophisticated hierarchical approach to the approval process, ensuring
          a more robust and accountable system.
        </p>
        <img src={EvolutionImg} alt="" />
      </div>

      {/* Key Components */}
      <div className="component">
        <div className="componentHeading">
          <div className="textRight">
            <h1>“Key Components of the Multi-Level Approval System”</h1>
          </div>
        </div>

        <div className="componentContainer">
          <h5>Hierarchical Approval Workflow:</h5>
          <li>
            Simplify and expedite the approval process with multiple levels of
            authorization.
          </li>
          <li>
            Define roles and responsibilities, promoting a structured and
            accountable workflow.
          </li>

          <h5>Real-time Visibility:</h5>
          <li>
            Instantly track the status of time entries at each approval stage.
          </li>
          <li>
            Identify and resolve bottlenecks promptly, fostering a proactive
            approach to project management.
          </li>

          <h5>Customizable Approval Paths:</h5>
          <li>
            Tailor approval paths to align with project requirements and
            organizational structure.
          </li>
          <li>
            Easily adapt to changes in team composition or project dynamics.
          </li>

          <h5>Automated Notifications:</h5>
          <li>
            Stay informed with automated notifications at each approval stage.
          </li>
          <li>
            Minimize delays by ensuring all stakeholders are kept in the loop.
          </li>

          <h5>Integration Capabilities:</h5>
          <li>
            Seamlessly integrate the Multi-Level Approval System with existing
            time tracking tools.
          </li>
          <li>
            Foster a cohesive workflow that integrates seamlessly with your
            organization's tech ecosystem.
          </li>
        </div>
      </div>

      {/* Advantages of Adopting */}
      <div className="Adopting">
        <div className="AdoptingHeading">
          <div className="AdoptingtextRight">
            <h1>“Advantages of Adopting the Multi-Level Approval System”</h1>
          </div>
        </div>

        <div className="AdoptingContainer">
          <h5>Enhanced Accuracy:</h5>
          <li>Minimize errors associated with manual approval processes.</li>
          <li>
            Ensure that only validated and accurate time entries progress
            through each approval leve.
          </li>

          <h5>Improved Accountability:</h5>
          <li>
            Foster a culture of responsibility by assigning roles at each
            approval stage.
          </li>
          <li>
            Easily trace the approval history for each time entry, enhancing
            transparency.
          </li>

          <h5>Time and Cost Savings:</h5>
          <li>
            Eliminate the need for time-consuming follow-ups and manual
            tracking.
          </li>
          <li>Accelerate project timelines by reducing approval delays.</li>

          <h5>Scalability:</h5>
          <li>
            Grow your organization without compromising on the efficiency of
            your time tracking process.
          </li>
          <li>
            Scale the Multi-Level Approval System to meet the evolving needs of
            your business seamlessly.
          </li>

          <h5>Integration Capabilities:</h5>
          <li>
            Seamlessly integrate the Multi-Level Approval System with existing
            time tracking tools.
          </li>
          <li>
            Foster a cohesive workflow that integrates seamlessly with your
            organization's tech ecosystem.
          </li>
        </div>
      </div>

      {/* FeaturbottomTextBtn */}
      <div className="FeaturbottomTextBtn">
        <p>
          Elevate your time tracking journey with the Multi-Level Approval
          System – a strategic investment in efficiency, accuracy, and
          scalability. As businesses continue to evolve, staying ahead requires
          embracing innovative solutions. Upgrade your time tracking process
          today and witness a transformative shift in project management,
          empowering your teams to thrive in the ever-changing business
          landscape
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
  );
};

export default FeaturedArticlePage1;
