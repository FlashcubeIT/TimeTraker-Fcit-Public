import React from "react";
import { useNavigate } from "react-router-dom";
import "./BlogPage.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import blogImg1 from "../img/image 1.jpg";
import blogImg2 from "../img/image 2.jpg";
import blogImg3 from "../img/image 3.jpg";
import blogImg4 from "../img/image 4.jpg";
import blogImg5 from "../img/image 5.jpg";
import blogImg6 from "../img/image 6.jpg";
import blogImg7 from "../img/image 7.jpg";
import blogImg8 from "../img/image 8.jpg";
import blogImg9 from "../img/image 9.jpg";
import image1 from "../img/blogImage1.png";
import image2 from "../img/blogImage2.png";
import image3 from "../img/blogImage3.png";
import FeatureArticleImg1 from "../img/FeatureArticleImg1.png";
import FeatureArticleImg2 from "../img/FeatureArticleImg2.png";
import FeatureArticleImg3 from "../img/FeatureArticleImg3.png";
import Footer2 from "../components/Footer2";

// featBlogImg1
import handImg from "../img/HandImg.png";
import featBlogImg1 from "../img/featBlogImg1.jpg";
import featBlogImg2 from "../img/featBlogImg2.jpg";
import featBlogImg3 from "../img/featBlogImg3.jpg";
import featBlogImg4 from "../img/featBlogImg4.jpg";
import featBlogImg5 from "../img/featBlogImg5.jpg";
import featBlogImg6 from "../img/featBlogImg6.jpg";
import featBlogImg7 from "../img/featBlogImg7.jpg";
import featBlogImg8 from "../img/featBlogImg8.jpg";
import featBlogImg9 from "../img/featBlogImg9.jpg";

const BlogPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#fff" }}>
      {/* navbar */}
      <div className="blogNavar">
        <Navbar />
      </div>

      <div className="blogHero">
        <h1>
          “Innovation in Every Tick Exploring TimeTraker's Latest Advancements”
        </h1>
        <p>
          "Dive into the heartbeat of innovation with 'Innovation in Every Tick:
          Exploring TimeTraker's Latest Advancements.' Uncover the cutting-edge
          features and updates propelling TimeTraker to new heights in the realm
          of time management. Discover how each tick contributes to a dynamic,
          efficient, and forward-thinking approach to optimizing your valuable
          time."
        </p>
        <div style={{ textAlign: "center" }}>
            <button
              className="featButton" 
              style={{marginTop: '40px'}} 
              onClick={() => {
                navigate("/signup");
              }}
            >
              Start a free trial
            </button>
          </div>

      </div>

      {/*  “Featured Blog” */}
      <div className="featured-blog-container">
        <div className="blogPage" id="blog">
          <h1> “Featured Blog”</h1>
          <p className="blogpara">
            "Explore the TimeTraker Blog for insightful articles and helpful
            resources on efficient time and expense management. Stay informed
            about the latest trends, best practices, and product updates that
            can streamline your business processes. Our blog is your go-to
            destination for valuable insights to optimize productivity and make
            the most out of TimeTraker's features. Dive into a wealth of
            knowledge designed to enhance your time tracking experience and
            elevate your business to new heights."
          </p>

          <div style={{ textAlign: "center" }}>
            <button
              className="featButton"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Start a free trial
            </button>
          </div>

          <div className="blogPage-container">
            <div
              className="blogText"
              onClick={() => {
                navigate("/FeaturedBlogPage1");
              }}
            >
              <div className="featBlogImg">
                <img src={featBlogImg1} alt="" />
                <img
                  style={{ height: "150px", width: "150px" }}
                  className="handImg"
                  src={handImg}
                  alt=""
                />
              </div>
              <div className="blog-text">
                <img src={blogImg1} alt="" />
                <span>
                  {" "}
                  <i class="fa-regular fa-clock"></i> 10 mins 01 Nov, 2023
                </span>
                <h5>
                  Make the Switch from Paper Timesheets to Save Time, Money, and
                  Hand Sanitizer
                </h5>
                <p>
                  If you’re still using paper timesheets at your business, save
                  yourself the time, trouble and hand sanitizer by shifting your
                  employee timekeeping to a digital service like TimeTraker.
                </p>
              </div>
            </div>

            <div
              className="blogText"
              onClick={() => {
                navigate("/FeaturedBlogPage2");
              }}
            >
              <div className="featBlogImg">
                <img src={featBlogImg2} alt="" />
                <img
                 style={{ height: "150px", width: "150px" }}
                  className="handImg"
                  src={handImg}
                  alt=""
                />
              </div>

              <div className="blog-text">
                <img src={blogImg2} alt="" />
                <span>
                  {" "}
                  <i class="fa-regular fa-clock"></i> 7 mins, 28 Oct, 2023
                </span>
                <h5>
                  Ensuring Employee and Admin Satisfaction During Month-End
                  Close
                </h5>
                <p style={{ marginBottom: "0px" }}>
                  If you've faced the grueling end-of-month close, you
                  understand the frustration of collecting receipts and reports
                  for timely book closure. Don't worry, we'll share tips to not
                  just endure but conquer this monthly challenge.
                </p>
              </div>
            </div>

            <div
              className="blogText"
              onClick={() => {
                navigate("/FeaturedBlogPage3");
              }}
            >
              <div className="featBlogImg">
                <img src={featBlogImg3} alt="" />
                <img
                 style={{ height: "150px", width: "150px" }}
                  className="handImg"
                  src={handImg}
                  alt=""
                />
              </div>
              <div className="blog-text">
                <img src={blogImg3} alt="" />
                <span>
                  {" "}
                  <i class="fa-regular fa-clock"></i> 15 mins, 25 Oct, 2022
                </span>
                <h5>Manage Your Spend on the Road With TimeTraker</h5>
                <p>
                  In this article, we'll delve into how TimeTraker can enhance
                  your upcoming business trip, whether you're globe-trotting or
                  on a road journey.
                </p>
              </div>
            </div>

            <div
              className="blogText"
              onClick={() => {
                navigate("/FeaturedBlogPage4");
              }}
            >
              <div className="featBlogImg">
                <img src={featBlogImg4} alt="" />
                <img
                  style={{ height: "150px", width: "150px" }}
                  className="handImg"
                  src={handImg}
                  alt=""
                />
              </div>
              <div className="blog-text">
                <img src={blogImg4} alt="" />
                <span>
                  {" "}
                  <i class="fa-regular fa-clock"></i> 8 mins 22 Oct, 2023
                </span>
                <h5>
                  Immersive Webinar: Exploring the Transformative Impact of the
                  Advisory Trend on Tax Season
                </h5>
                <p>
                  As another busy season approaches, accounting and tax
                  professionals might be taking a moment to reflect.
                </p>
              </div>
            </div>

            <div
              className="blogText"
              onClick={() => {
                navigate("/FeaturedBlogPage5");
              }}
            >
              <div className="featBlogImg">
                <img src={featBlogImg5} alt="" />
                <img
                  style={{ height: "150px", width: "150px" }}
                  className="handImg"
                  src={handImg}
                  alt=""
                />
              </div>
              <div className="blog-text">
                <img src={blogImg5} alt="" />
                <span>
                  {" "}
                  <i class="fa-regular fa-clock"></i> 9 mins, 20 Oct, 2023
                </span>
                <h5>
                  Specialized Webinar Insights: Fixed-Fee Billing Strategies for
                  Accounting Services
                </h5>
                <p style={{ marginBottom: "0px" }}>
                  From streaming services for movies to SaaS software platforms,
                  the concept of subscription and fixed-fee billing has
                  transformed the way individuals perceive value.
                </p>
              </div>
            </div>

            <div
              className="blogText"
              onClick={() => {
                navigate("/FeaturedBlogPage6");
              }}
            >
              <div className="featBlogImg">
                <img src={featBlogImg6} alt="" />
                <img
                  style={{ height: "150px", width: "150px" }}
                  className="handImg"
                  src={handImg}
                  alt=""
                />
              </div>
              <div className="blog-text">
                <img src={blogImg6} alt="" />
                <span>
                  {" "}
                  <i class="fa-regular fa-clock"></i> 20 mins, 18 Oct, 2022
                </span>
                <h5>
                  Intelligent Strategies for Credit Card Payments: Maximizing
                  Cash Flow and Client Satisfaction
                </h5>
                <p>
                  I would use my credit card to pay my mortgage if it were
                  allowed. Fortunately, regulations prevent this, but the idea
                  remains.
                </p>
              </div>
            </div>

            <div
              className="blogText"
              onClick={() => {
                navigate("/FeaturedBlogPage7");
              }}
            >
              <div className="featBlogImg">
                <img src={featBlogImg7} alt="" />
                <img
                  style={{ height: "150px", width: "150px" }}
                  className="handImg"
                  src={handImg}
                  alt=""
                />
              </div>
              <div className="blog-text">
                <img src={blogImg7} alt="" />
                <span>
                  {" "}
                  <i class="fa-regular fa-clock"></i> 15 mins 17 Oct, 2023
                </span>
                <h5>Exclusive Guide to QuickBooks Connect 2023</h5>
                <p>
                  Elevate Your Practice: As a gold sponsor, Ignition will be at
                  the core of QuickBooks Connect, delivering insights and
                  opportunities to...
                </p>
              </div>
            </div>

            <div
              className="blogText"
              onClick={() => {
                navigate("/FeaturedBlogPage8");
              }}
            >
              <div className="featBlogImg">
                <img src={featBlogImg8} alt="" />
                <img
                  style={{ height: "150px", width: "150px" }}
                  className="handImg"
                  src={handImg}
                  alt=""
                />
              </div>
              <div className="blog-text">
                <img src={blogImg8} alt="" />
                <span>
                  {" "}
                  <i class="fa-regular fa-clock"></i> 9 mins, 15 Oct, 2023
                </span>
                <h5>
                  Considering Passing Credit Card Fees to Customers or Clients?
                  Here's What to Keep in Mind
                </h5>
                <p>
                  Demystifying Credit Card Processing Fees: Gain insights into
                  the components of these intricate fees, including interchange
                  fees determined by credit card...
                </p>
              </div>
            </div>

            <div
              className="blogText"
              onClick={() => {
                navigate("/FeaturedBlogPage9");
              }}
            >
              <div className="featBlogImg">
                <img src={featBlogImg9} alt="" />
                <img
                  style={{ height: "150px", width: "150px" }}
                  className="handImg"
                  src={handImg}
                  alt=""
                />
              </div>
              <div className="blog-text">
                <img src={blogImg9} alt="" />
                <span>
                  {" "}
                  <i class="fa-regular fa-clock"></i> 20 mins, 12 Oct, 2022
                </span>
                <h5>
                  Essential Webinar Recap: Selling Accounting and Tax Services
                </h5>
                <p>
                  IIn our ever-changing landscape, accounting and tax
                  professionals frequently encounter the challenge of
                  effectively navigating...
                </p>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <button
              className="featButton"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Start a free trial
            </button>
          </div>
        </div>
      </div>

      {/* Subscribe to the Ignition blog */}
      <div className="subscribe-container">
        <div className="subscribe-left">
          <h1>Subscribe to the Ignition blog</h1>
          <p>
            Subscribe today to keep up with the latest trends and receive tips
            on running professional service business
          </p>
        </div>

        <form action="" className="subscribe-right">
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Sign up</button>
        </form>
      </div>

      {/* “Featured Article”  */}
      <div className="featured-blog-container">
        <div className="blogPage" id="blog">
          <h1> “Featured Article”</h1>
          <p className="blogpara">
            "Explore our insightful articles on the TimeTraker website page,
            offering a wealth of information on optimizing time and expense
            management. Stay informed about industry trends, discover best
            practices, and learn about the latest updates to enhance your
            business processes. Delve into a repository of knowledge designed to
            elevate your time tracking experience and boost overall
            productivity. Whether you're a seasoned professional or new to
            TimeTraker, our articles provide valuable insights to empower your
            business success."
          </p>

          <div className="blogPage-container">
            <div
              className="blogText"
              onClick={() => {
                navigate("/FeaturedArticlePage1");
              }}
            >
              <div className="featBlogImg">
                <img src={FeatureArticleImg1} alt="" />
                <img
                  style={{ height: "150px", width: "150px" }}
                  className="handImg"
                  src={handImg}
                  alt=""
                />
              </div>
              <div className="blog-text" style={{ height: "460px" }}>
                <img src={image1} alt="" />
                <span>
                  {" "}
                  <i class="fa-regular fa-clock"></i> 25 mins 09 Nov, 2023
                </span>
                <h5>
                  Presenting Multi-Level Approval System: Enhance Your Time
                  Tracking Journey
                </h5>
                <p style={{marginTop:'-5px', marginBottom: '-5px'}} >
                  We are excited to introduce a robust upgrade to our
                  TimeTracker system: Multi-Level Approvals. This functionality
                  enables administrators to implement an additional level of
                  review for time entries, offering numerous advantages that
                  foster a more precise, accountable, and efficient workflow.
                </p>
              </div>
            </div>

            <div
              className="blogText"
              onClick={() => {
                navigate("/FeaturedArticlePage2");
              }}
            >
              <div className="featBlogImg">
                <img src={FeatureArticleImg2} alt="" />
                <img
                 style={{ height: "150px", width: "150px" }}
                  className="handImg"
                  src={handImg}
                  alt=""
                />
              </div>
              <div className="blog-text" style={{ height: "460px" }}>
                <img src={image2} alt="" />
                <span>
                  {" "}
                  <i class="fa-regular fa-clock"></i>30 mins, 28 Oct, 2023
                </span>
                <h5>Navigating Salary Increments in Employee Conversations</h5>
                <p style={{marginTop:'-5px', marginBottom: '-5px'}}  >
                  As a manager, you frequently encounter the challenging
                  responsibility of addressing salary increases with your team
                  members. This dialogue has the power to either inspire
                  motivation and development or introduce uncertainty and
                  tension. It necessitates a delicate approach, characterized by
                  finesse, empathy, and transparent communication.
                </p>
              </div>
            </div>

            <div
              className="blogText"
              onClick={() => {
                navigate("/FeaturedArticlePage3");
              }}
            >
              <div className="featBlogImg">
                <img src={FeatureArticleImg3} alt="" />
                <img
                  style={{ height: "150px", width: "150px" }}
                  className="handImg"
                  src={handImg}
                  alt=""
                />
              </div>
              <div className="blog-text" style={{ height: "460px" }}>
                <img src={image3} alt="" />
                <span>
                  {" "}
                  <i class="fa-regular fa-clock"></i> 24 mins, 25 Oct, 2022
                </span>
                <h5 style={{fontSize: '18px'}} >Enhancing Remote Team Building Strategies</h5>
                <p style={{marginTop:'-5px', marginBottom: '-5px'}}  >
                  Maintaining motivation, engagement, and collaboration among
                  your remote teams poses a significant challenge. This is
                  exacerbated by the fact that remote employees frequently work
                  independently on their respective tasks. So, how can you
                  establish a sense of community, considering that research
                  indicates the potency of teamwork transcends physical
                  location? This article will delve into various solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <button
          className="featButton"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Start a free trial
        </button>
      </div>

      {/*  */}
      <div className="begain-container">
        <h1>"Are you prepared to begin?"</h1>
        <p>
          "Our mission is to restore valuable time and financial resources to
          businesses, enabling them to thrive and succeed while enhancing the
          lives of those who lead them."
        </p>
        <button
          onClick={() => {
            navigate("/signup");
          }}
        >
          Start a free trial
        </button>
      </div>

      {/* Footer */}
      <Footer />
      <Footer2 />
    </div>
  );
};

export default BlogPage;
