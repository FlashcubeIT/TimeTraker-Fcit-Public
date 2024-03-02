import React from "react";
import "./FeaturedArticlePage1.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import PresentingImg from "../img/NavigatingImg.png";
import EvolutionImg from "../img/EmployeeImg.png";

const FeaturedArticlePage2 = () => {
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
          <h1>“Navigating Salary Increments in Employee Conversations”</h1>
          <p>
            Salary discussions are a critical aspect of employee-manager
            conversations, playing a pivotal role in employee satisfaction,
            motivation, and retention. Navigating the delicate terrain of salary
            increments requires thoughtful communication and a strategic
            approach. In this article, we will explore effective ways to engage
            in salary discussions that benefit both employees and the
            organization.
          </p>
        </div>

        <div className="presentingRight">
          <img src={PresentingImg} alt="" />
        </div>
      </div>

      {/* EvolutionContainer */}
      <div className="EvolutionContainer">
        <h1>“Employee-Manager Conversations ”</h1>
        <p>
          Salary discussions are integral parts of employee-manager
          conversations, playing a crucial role in talent retention and overall
          job satisfaction. Navigating these conversations effectively is key to
          fostering a positive work environment and ensuring employees feel
          valued. In this article, we'll explore strategies for both employees
          and managers to navigate salary increments discussions with
          transparency and success.approval process, ensuring a more robust and
          accountable system.
        </p>
        <img src={EvolutionImg} alt="" />
      </div>

      {/* Key Components */}
      <div className="component">
        <div className="componentHeading">
          <div className="textRight">
            <h1>“For Employees”</h1>
          </div>
        </div>

        <div className="componentContainer">
          <h5>Research and Preparation:</h5>
          <li>
            Before initiating a salary discussion, research industry standards
            and benchmarks for your role and experience.
          </li>
          <li>
            Clearly articulate your accomplishments, contributions, and any
            additional responsibilities you've taken on.
          </li>

          <h5>Choose the Right Timing:</h5>
          <li>
            Opt for a strategic moment to discuss salary, such as during
            performance reviews or after achieving significant milestones.
          </li>
          <li>
            Avoid discussing salary during stressful periods for the company or
            when your manager is preoccupied.
          </li>

          <h5>Highlight Achievements:</h5>
          <li>
            Emphasize specific contributions and achievements that demonstrate
            your value to the organization.
          </li>
          <li>Connect your performance to the company's goals and success.</li>

          <h5>Be Open to Negotiation:</h5>
          <li>Approach the conversation with a collaborative mindset.</li>
          <li>
            Be open to negotiating terms that may include non-monetary benefits,
            professional development opportunities, or flexible work
            arrangements.
          </li>
        </div>
      </div>

      {/* Advantages of Adopting */}
      <div className="Adopting">
        <div className="AdoptingHeading">
          <div className="AdoptingtextRight">
            <h1>“For Managers”</h1>
          </div>
        </div>

        <div className="AdoptingContainer">
          <h5>Regular Performance Reviews:</h5>
          <li>
            Conduct regular performance reviews to assess employee contributions
            and growth.
          </li>
          <li>
            Use these reviews as opportunities to discuss salary expectations
            and adjustments.
          </li>

          <h5>Transparent Communication:</h5>
          <li>
            Be transparent about the company's financial health and constraints.
          </li>
          <li>
            Clearly communicate the criteria for salary increments and the
            factors that influence such decisions.
          </li>

          <h5>Recognize Employee Contributions:</h5>
          <li>
            Acknowledge and appreciate employees for their contributions to the
            team and company.
          </li>
          <li>
            Tie salary discussions to specific achievements and value added to
            the organization.
          </li>

          <h5>Provide Growth Opportunities:</h5>
          <li>
            Discuss potential career paths and growth opportunities within the
            company.
          </li>
          <li>
            Show a commitment to employees' professional development, aligning
            it with potential salary increases.
          </li>
        </div>
      </div>

      {/* FeaturbottomTextBtn */}
      <div className="FeaturbottomTextBtn">
        <p>
          Navigating salary increments in employee conversations is a delicate
          yet essential aspect of maintaining a motivated and engaged workforce.
          By fostering open communication, recognizing contributions, and
          aligning discussions with company goals, both employees and managers
          can contribute to a positive and constructive work environment where
          compensation discussions become opportunities for growth and mutual
          success.
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

export default FeaturedArticlePage2;
