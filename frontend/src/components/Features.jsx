import React from "react";
import "./Features.css";
import FeatImg1 from "../img/featImg1.svg";
import FeatImg2 from "../img/featImg2.svg";
import FeatImg3 from "../img/featImg3.svg";
import FeatImg4 from "../img/featImg4.svg";
import FeatImg5 from "../img/featImg5.svg";
import FeatImg6 from "../img/featImg6.svg";
import FeatImg7 from "../img/featImg7.svg";
import FeatImg8 from "../img/featImg8.svg";
import { useNavigate } from "react-router-dom";
import FeatureFingerImg from "../img/FeatureFingerImg.png";

const Features = () => {
  const navigate = useNavigate();
  return (
    <div className="main-features" id="feautres">
      <h1>“Features and Benefits”</h1>

      <div className="features-container">
        <div
          className="blogTextContainer"
          onClick={() => {
            navigate("/web-page-timesheet");
          }}
        >
          <div className="featureBlogImg">
            <img src={FeatureFingerImg} alt="" />
          </div>
          <div
            onClick={() => {
              navigate("/web-page-timesheet");
            }}
            className="feat-img feat_img_1"
          >
            <img src={FeatImg1} alt="" />
            <h1>Timesheets</h1>
            <p>
              Workers, whether employees or contractors, have the flexibility to
              monitor their hours worked at any time, using a computer or mobile
              app from any location.
            </p>
          </div>
        </div>

        <div
          className="blogTextContainer"
          onClick={() => {
            navigate("/web-page-expense");
          }}
        >
          <div className="featureBlogImg">
            <img src={FeatureFingerImg} alt="" />
          </div>
          <div
            onClick={() => {
              navigate("/web-page-expense");
            }}
            className="feat-img feat_img_1"
          >
            <img src={FeatImg2} alt="" />
            <h1>Expense Tracking</h1>
            <p>
              Easily monitor both reimbursable and corporate credit card
              expenses for your team, whether online or on your device.
            </p>
          </div>
        </div>

        <div
          className="blogTextContainer"
          onClick={() => {
            navigate("/web-page-secure-data");
          }}
        >
          <div className="featureBlogImg">
            <img src={FeatureFingerImg} alt="" />
          </div>
          <div
            onClick={() => {
              navigate("/web-page-secure-data");
            }}
            className="feat-img feat_img_1"
          >
            <img src={FeatImg3} alt="" />
            <h1>Secure Data</h1>
            <p>
              Workers, whether employees or contractors, have the flexibility to
              monitor their hours worked at any time, using a computer or mobile
              app from any location.
            </p>
          </div>
        </div>

        <div
          className="blogTextContainer"
          onClick={() => {
            navigate("/web-page-reporting");
          }}
        >
          <div className="featureBlogImg">
            <img src={FeatureFingerImg} alt="" />
          </div>
          <div
            onClick={() => {
              navigate("/web-page-reporting");
            }}
            className="feat-img feat_img_1"
          >
            <img src={FeatImg4} alt="" />
            <h1>Reporting</h1>
            <p>
              Efficiently access summaries and reports of the time and expense
              data input by your users in Excel, PDF, or CSV formats.
            </p>
          </div>
        </div>

        <div
          className="blogTextContainer"
          onClick={() => {
            navigate("/web-page-mobile");
          }}
        >
          <div className="featureBlogImg">
            <img src={FeatureFingerImg} alt="" />
          </div>
          <div
            onClick={() => {
              navigate("/web-page-mobile");
            }}
            className="feat-img feat_img_1"
          >
            <img src={FeatImg5} alt="" />
            <h1>Mobile</h1>
            <p>
              Users have the ability to input and retrieve timesheet and expense
              data online or via their mobile devices. Our app is accessible on
              both the iOS and Android app stores.
            </p>
          </div>
        </div>

        <div
          className="blogTextContainer"
          onClick={() => {
            navigate("/web-page-calculator");
          }}
        >
          <div className="featureBlogImg">
            <img src={FeatureFingerImg} alt="" />
          </div>
          <div
            onClick={() => {
              navigate("/web-page-calculator");
            }}
            className="feat-img feat_img_1"
          >
            <img src={FeatImg6} alt="" />
            <h1>Mileage Calculator</h1>
            <p>
              Searching for a convenient method to oversee your employees'
              mileage? Automatically determine trip distances and costs based on
              the current IRS reimbursement rate.
            </p>
          </div>
        </div>

        <div
          className="blogTextContainer"
          onClick={() => {
            navigate("/web-page-receipt");
          }}
        >
          <div className="featureBlogImg">
            <img src={FeatureFingerImg} alt="" />
          </div>
          <div
            onClick={() => {
              navigate("/web-page-receipt");
            }}
            className="feat-img feat_img_1"
          >
            <img src={FeatImg7} alt="" />
            <h1>Attach Receipts</h1>
            <p>
              Upload your expense receipts effortlessly by taking a photo with
              your phone and attaching the receipt directly to your expense
              entry on your computer or mobile app.
            </p>
          </div>
        </div>

        <div
          className="blogTextContainer"
          onClick={() => {
            navigate("/web-page-pricing");
          }}
        >
          <div className="featureBlogImg">
            <img src={FeatureFingerImg} alt="" />
          </div>
          <div
            onClick={() => {
              navigate("/web-page-pricing");
            }}
            className="feat-img feat_img_1"
          >
            <img src={FeatImg8} alt="" />
            <h1>Simple Pricing</h1>
            <p>
              No extra charges or long-term commitments. You can cancel anytime.
              Try our 30-day free trial with complete feature access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
