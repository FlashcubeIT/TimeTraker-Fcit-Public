import React from "react";
import "./FaqPage.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Faq from "./Faq";
import Business from "../components/Business";
import AboutPageImg from "../img/Rectangle 209.jpg";
import { useNavigate } from "react-router-dom";
import Hero3 from "./Hero3";
import Footer2 from "../components/Footer2";

const FaqPage = () => {
  const navigate = useNavigate()


  return (
    <div style={{background: '#fff'}} >
      <div className="faqNavbar">
        <Navbar />
      </div>

     {/* hero section */}
      <div className="faqPageContainer">

      <div className="faqPageRight">
          <img src={AboutPageImg} alt="" />
        </div>

        <div className="faqPageLeft">
          <h1>TimeTraker Provide users to reach out for further assistance.</h1>
          <p>At TimeTraker, we understand the importance of timely assistance. For any queries or issues, our users can easily reach out to our dedicated support team. Simply navigate to the "Support" tab within your TimeTraker account, where you can submit a detailed ticket outlining your concern. Our knowledgeable support staff is committed to providing swift and effective solutions to ensure your experience with TimeTraker is seamless. We value your satisfaction and are here to support you every step of the way, making certain that you get the most out of your time tracking and project management endeavors.
          </p>

          <button onClick={() => {navigate('/signup')} } >Start a free trial</button>
        </div>        
      </div>

      {/* hero 3 */}
      <Hero3 />



      {/* Business */}
    <div style={{marginBottom: '50px'}} >
      <Business />
    </div>

      {/* faq section */}
      <Faq />
      <div style={{textAlign: 'center', marginBottom: '50px'}} >
          <button className="featButton" onClick={() => {navigate('/signup')} } >Start a free trial</button>
      </div>

      {/* footer */}
      <Footer />
      <Footer2 />
    </div>
  );
};

export default FaqPage;
