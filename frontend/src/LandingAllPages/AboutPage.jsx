import React from "react";
import "./AboutPage.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutPageImg from "../img/Rectangle 207.png";
import feedImg from "../img/Rectangle 209.jpg";
import meetImg from "../img/Rectangle 210.jpg";
import { useNavigate } from "react-router-dom";
import Business from "../components/Business";
import { Container, Row, Col } from 'react-bootstrap'
import feedIconImg from "../img/feedIconImg.jpg";
import Footer2 from "../components/Footer2";

const AboutPage = () => {
  const navigate = useNavigate()

  return (
    <div style={{background:'#fff'}} >
      {/* Navbar section */}
      <div className="aboutNavbar">
        <Navbar />
      </div>

      {/* hero section */}

      <div className="aboutPageContainer">
        <div className="aboutPageLeft">
          <h5>About TimeTraker</h5>
          <h1>Helping Businesses Manage Time</h1>
          <p>
            TimeTraker streamlines business time management with intuitive time
            entry, project tracking, and detailed reporting. It offers a
            user-friendly interface, integrates seamlessly with project
            management tools, ensures compliance with labor laws, and provides
            robust security. Improve efficiency, billing accuracy, and
            decision-making with TimeTraker for comprehensive time management
            solutions. Employees can log and track the time they spend on tasks
            and projects. Tracking can be done manually or automatically based
            on user activity. Integration with project management tools for
            associating time with specific projects and tasks. Generation of
            detailed reports to analyze time data. Visual representations of
            time allocation, helping businesses identify patterns and trends.
          </p>

          <button onClick={() => {navigate('/signup')} } >Start a free trial</button>
        </div>

        <div className="aboutPageRight">
          <img src={AboutPageImg} alt="" />
        </div>
      </div>

      {/* Meet Our Customers */}        
      <div className="meetTopHead">
          <h1>"Efficient time management solution for enhanced productivity and organization."</h1>
          <p>
            "TimeTraker offers an efficient time management solution, empowering users with tools designed to enhance productivity and organizational effectiveness. With intuitive features and user-friendly design, it enables seamless tracking, aiding individuals and teams in optimizing their time for improved performance and efficiency."</p>
        </div>
 
      <div className="customersContainer">      
      <div className="customersLeft">
        <img src={meetImg} alt="" />
      </div>

        <div className="customersRight">
          <h1>Meet Our Customers</h1>
          <p>We’re proud to serve a diverse range of clients from around the globe. Our customers span industries and sizes, from local nonprofits to large multinational corporations. They are innovators, leaders, and game-changers. Learn how TimeTraker helps them optimize their time-tracking and resource-management processes, empowering them to focus on what they do best.</p>
          <button onClick={() => {navigate('/signup')} } >Start a free trial</button>
        </div>       

      </div>


      {/* headline */}
      <div style={{marginBottom: '50px'}} >
        <Business />
      </div>


      {/* Feedback section */}
      <div className='feedback'>
        <Container>
            <div className='feedback-main'>
                <h1>Let's See Our Customers Feedback!</h1>
                <p>
                  Explore valuable feedback from our customers! In the TimerTaker, we prioritize your opinions to enhance our services and ensure your satisfaction.
                  </p>
            </div>

            <Row className='feedback-container'>
            {/* column 1 */}
                <Col lg={6} md={12} sm={12} xs={12}  >
                    <div className="feed-left">
                        <img src={feedImg} alt="" />
                    </div>
                </Col>

                  {/* column 2 */}
                  <Col lg={6} md={12} sm={12} xs={12} >
                <div className="feed-right">
                    <p>"Empower your TimerTracker experience by sharing your feedback. We value your insights to refine features, optimize usability, and cater to your needs. Your input fuels our commitment to delivering a seamless and efficient time tracking solution. Thank you for shaping TimerTracker with us!"tion fuels our commitment to top-tier care." </p>
                    <div className="feed-img-text">
                        <img src={feedIconImg} alt="" />
                        <div className='feed-text' >
                            <h6>Roger Saris</h6>
                            <p>Customers</p>
                        </div>
                    </div>
                </div>
                </Col>
            </Row>
        </Container>
    </div>

      {/* Footer section */}
      <Footer />
      <Footer2 />
    </div>
  );
};

export default AboutPage;
