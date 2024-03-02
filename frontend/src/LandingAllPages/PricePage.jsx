import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Grid } from "@mui/material";
import "../components/webComponents/WebPagesMajor.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Footer2 from "../components/Footer2";
// import Price from '../../components/Price'
import img15 from "../components/webComponents/images/images15.png";
import "../components/Price.css";
import hero_b_rev from "../components/webComponents/images/hero_b_rev.svg";
import img from "../components/webComponents/images/hero8.png";

const PricePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{background: '#fff'}} >
      {/* section 1 */}
      <div>
        <Navbar />
      </div>

      {/* PrimeFeatures */}
      <div className="PrimeFeatures">
        <div className="PrimeFeaturesLeft">
          <img className="img-fluid" src={img} alt="" />
        </div>

        <div className="PrimeFeaturesRight">
          <h1>“Simple Pricing”</h1>
          <p>
            “No extra charges or long-term commitments. You can cancel anytime.
            Try our 30-day free trial with complete feature access.”
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




      {/* section 3  */}
      <div className="section3">
        <p className="section3_heading">"Straightforward and Clear Pricing"</p>
        <div className="section3_des_parent">
          <p className="section3_des">
            Access all TimeTraker features instantly for 30 days. No limits on
            users, no commitments, and easy upgrade options when you're ready.
          </p>
        </div>
      </div>

      {/* section 4  */}

      <div className="price-container price-container_for_single_page">
        <div className="price-card-container">
          <div className="price-card price-card_1">
            <h2>Free</h2>
            <p className="dollar">
              $ 0.00 <strong className="dollar1"> /Month </strong>{" "}
            </p>
            <div className="price-text">
              <p>
                {" "}
                <i className="fa-regular fa-square-check"></i>{" "}
                <span style={{ marginLeft: "10px" }}>Unlimited user</span>
              </p>
              <p>
                {" "}
                <i className="fa-regular fa-square-check"></i>{" "}
                <span style={{ marginLeft: "10px" }}>Timesheets</span>{" "}
              </p>
              <p>
                <span>Employee Expenses</span>
              </p>
              <p>
                <span>Quick-book Integration</span>
              </p>
              <p>
                {" "}
                <i className="fa-regular fa-square-check"></i>{" "}
                <span style={{ marginLeft: "10px" }}>Customizable</span>
              </p>
              <p>
                <span>Approve Workflow</span>
              </p>
              <p>
                <span>Project Assignment</span>{" "}
              </p>
              <p>
                <span> Budgeting </span>
              </p>
              <p>
                <span>Value pricing</span>
              </p>
            </div>
            <p className="para-last">Add Invoicing $2 per user/month</p>
            <div className="price-btn">
              <button
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Free Trial
              </button>
            </div>
          </div>
          <div className="price-card price-card_2 price-card-middle">
            <h2>Professional</h2>
            <p className="dollar">
              $ 6.00 <strong className="dollar1"> /Month </strong>{" "}
            </p>
            <div className="price-text">
              <p>
                {" "}
                <i className="fa-regular fa-square-check"></i>{" "}
                <span style={{ marginLeft: "10px" }}>Unlimited user</span>
              </p>
              <p>
                {" "}
                <i className="fa-regular fa-square-check"></i>{" "}
                <span style={{ marginLeft: "10px" }}>Timesheets</span>{" "}
              </p>
              <p>
                {" "}
                <i className="fa-regular fa-square-check"></i>{" "}
                <span style={{ marginLeft: "10px" }}>Employee Expenses</span>
              </p>
              <p>
                {" "}
                <i className="fa-regular fa-square-check"></i>{" "}
                <span style={{ marginLeft: "10px" }}>
                  Quick-book Integration
                </span>
              </p>
              <p>
                {" "}
                <i className="fa-regular fa-square-check"></i>{" "}
                <span style={{ marginLeft: "10px" }}>Customizable</span>
              </p>
              <p>
                <span>Approve Workflow</span>
              </p>
              <p>
                <span>Project Assignment</span>{" "}
              </p>
              <p>
                <span> Budgeting </span>
              </p>
              <p>
                {" "}
                <i className="fa-regular fa-square-check"></i>{" "}
                <span style={{ marginLeft: "10px" }}>Value pricing</span>
              </p>
            </div>
            <p className="para-last">Add Invoicing $2 per user/month</p>
            <div className="price-btn">
              <button
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Free Trial
              </button>
            </div>
          </div>
          <div className="price-card price-card_3">
            <h2>Enterprise</h2>
            <p className="dollar">
              $ 10.00 <strong className="dollar1"> /Month </strong>{" "}
            </p>
            <div className="price-text">
              <p>
                {" "}
                <i className="fa-regular fa-square-check"></i>{" "}
                <span style={{ marginLeft: "10px" }}>Unlimited user</span>
              </p>
              <p>
                {" "}
                <i className="fa-regular fa-square-check"></i>{" "}
                <span style={{ marginLeft: "10px" }}>Timesheets</span>{" "}
              </p>
              <p>
                {" "}
                <i className="fa-regular fa-square-check"></i>{" "}
                <span style={{ marginLeft: "10px" }}>Employee Expenses</span>
              </p>
              <p>
                {" "}
                <i className="fa-regular fa-square-check"></i>{" "}
                <span style={{ marginLeft: "10px" }}>
                  Quick-book Integration
                </span>
              </p>
              <p>
                {" "}
                <i className="fa-regular fa-square-check"></i>{" "}
                <span style={{ marginLeft: "10px" }}>Customizable</span>
              </p>
              <p>
                {" "}
                <i className="fa-regular fa-square-check"></i>{" "}
                <span style={{ marginLeft: "10px" }}>Approve Workflow</span>
              </p>
              <p>
                {" "}
                <i className="fa-regular fa-square-check"></i>{" "}
                <span style={{ marginLeft: "10px" }}>Project Assignment</span>{" "}
              </p>
              <p>
                {" "}
                <i className="fa-regular fa-square-check"></i>{" "}
                <span style={{ marginLeft: "10px" }}>Budgeting </span>
              </p>
              <p>
                {" "}
                <i className="fa-regular fa-square-check"></i>{" "}
                <span style={{ marginLeft: "10px" }}>Value pricing</span>
              </p>
            </div>
            <p className="para-last">Add Invoicing $2 per user/month</p>
            <div className="price-btn">
              <button
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Free Trial
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* section 5  */}
      <div className="job-container section_4 section_5_mb">
        <div className="job-text">
          <h5>"Choose TimeTraker to simplify your processes"</h5>
          <p className="section_5_para">
            Start with a free 30-day trial, then pay only $6 per month per user.
            No additional fees for registration, download, setup, or updates.
            Cancel anytime without impacting your QuickBooks data. Begin
            tracking effortlessly today!
          </p>
          <button
            className="section_5_btn_1"
            onClick={() => {
              navigate("/signup");
            }}
          >
            30-Day Free Trial
          </button>
        </div>

        <div className="time-img">
          <div className="time-img1">
            <img src={img15} alt="" />
            {/* <div className="timeImg_new timeImg2">
                        <img src={arrow1} alt="" />
                    </div> */}
          </div>
        </div>
        <div className="job-text">
          <button
            className="section_5_btn_2"
            onClick={() => {
              navigate("/signup");
            }}
          >
            30-Day Free Trial
          </button>
        </div>
      </div>

      {/* section 5  */}

      <Footer />
      <Footer2 />
    </div>
  );
};

export default PricePage;
