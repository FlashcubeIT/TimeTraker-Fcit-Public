import React from "react";
import "./FeaturedBlogPage1.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import makeImg from "../img/MakeImg.png";
import TimeSavingImg1 from "../img/TimeSavingImg1.png";
import TimeSavingImg2 from "../img/TimeSavigImg2.png";
import TimeSavngImg3 from "../img/TimeSavigImg3.png";
import EnhanceImg1 from "../img/EnhanceImg1.png";
import EnhanceImg2 from "../img/EnhanceImg2.png";
import { useNavigate } from "react-router-dom";

const FeaturedBlogPage1 = () => {
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
          “Make the Switch from Paper Timesheets to Save Time, Money, and Hand
          Sanitizer”
        </h1>

        <img src={makeImg} alt="" />

        <p>
          In the fast-paced world of business, efficiency is key. One area where
          companies can significantly enhance their efficiency is by
          transitioning from traditional paper timesheets to modern, digital
          alternatives. This switch not only saves time and money but also
          contributes to a healthier and more sustainable work environment,
          especially in the age of heightened hygiene awareness. In this blog
          post, we'll explore the benefits of making the switch and how it can
          positively impact your business.
        </p>
      </div>

      {/* Time Saving */}
      <div className="TimeSaving TimeSavingReverse ">
        <div className="TimeSavingLeft">
          <h1>
            <span>Time Savings:</span> Transitioning from paper timesheets to
            digital solutions eliminates the need for manual data entry and
            calculation. With automated systems, employees can easily log their
            working hours, breaks, and tasks, reducing the time spent on
            administrative tasks. This not only streamlines the payroll process
            but also allows HR and management to focus on more strategic aspects
            of their roles.
          </h1>

          <h1>
            <span>Cost-Effective Solutions:</span> Traditional paper timesheets
            come with hidden costs such as printing, storage, and manual data
            entry errors. Digital timesheet solutions, on the other hand, are
            cost-effective and scalable. They often offer features like
            real-time tracking, reporting, and integration with payroll systems,
            ensuring accurate and timely payment processing. This leads to
            significant cost savings over time.
          </h1>

          <h1>
            <span>Improved Accuracy:</span> Handwritten timesheets are prone to
            errors, whether it's a simple miscalculation or illegible
            handwriting. Digital timesheets reduce the likelihood of mistakes by
            automating the timekeeping process. Additionally, employees can
            easily review and confirm their entries, minimizing discrepancies
            and ensuring accurate records.
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
            <span>Enhanced Accessibility and Remote Work Support:</span> In
            today's globalized and digital workplace, many employees work
            remotely or have flexible schedules. Digital timesheets can be
            accessed from anywhere, providing a convenient solution for remote
            workers to log their hours. This accessibility not only supports a
            more agile workforce but also ensures accurate time tracking
            regardless of location.
          </h1>

          <h1>
            <span>Hygiene and Safety Considerations: </span>
            In the post-pandemic era, hygiene and safety have become top
            priorities for businesses. Handling physical timesheets involves the
            exchange of paper, which can be a potential vector for the
            transmission of germs. By switching to digital timesheets, you
            eliminate the need for physical contact, promoting a safer and
            healthier workplace.
          </h1>

          <h1>
            <span>Environmental Sustainability: </span>
            Going digital aligns with environmentally friendly practices by
            reducing the consumption of paper and minimizing waste. This not
            only contributes to corporate social responsibility but also
            positions your company as a forward-thinking and environmentally
            conscious organization.
          </h1>
        </div>
      </div>

      <div className="bottomTextBtn">
        <p>
          Making the switch from paper timesheets to digital solutions is a
          strategic move that brings about numerous benefits. From saving time
          and money to promoting a safer and more sustainable work environment,
          the advantages are clear. Embracing technology in timekeeping not only
          improves operational efficiency but also positions your business for
          success in the modern, digital age.
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

export default FeaturedBlogPage1;
