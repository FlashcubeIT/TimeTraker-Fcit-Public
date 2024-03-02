import React from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
// import UserDashboard from './pages/user/UserDashboard';
import Task from './pages/admin/Task';
import Project from './pages/admin/Project';
// import UserProfile from './pages/user/UserProfile';
import AdminProfile from './pages/admin/AdminProfile';
import AddUser from './pages/admin/AddUser';
import AdminExpense from './pages/admin/AdminExpense';
// import UserExpense from './pages/user/UserExpense';
import AdminDashboardV2 from './pages/admin/AdminDashboardV2';
import AdminWeeklyTimesheet from './pages/admin/AdminWeeklyTimesheet';
// import UserWeeklyTimesheet from './pages/user/UserWeeklyTimesheet';
import TimesheetAprove from './pages/admin/TimesheetAprove';
import Quickbooks from './pages/admin/Quickbooks';
// import TimeSheet from './pages/admin/Test';
import ForgotPassword from './pages/ForgotPassword';
import { MyProvider } from './context/MyProvider';
import Accessibility from './pages/admin/Accessibility';
import TimesheetReport from './pages/admin/TimesheetReport';
import ExpenseReport from './pages/admin/ExpenseReport';
import LandingPage from './pages/LandingPage';
import ExpenseAprove from './pages/admin/ExpenseAprove';
import Timesheet from './pages/webPages/Timesheet';
import Expense from './pages/webPages/Expense';
import SecureData from './pages/webPages/SecureData';
import Reporting from './pages/webPages/Reporting';
import Receipt from './pages/webPages/Receipt';
import Calculator from './pages/webPages/Calculator';
import Mobile from './pages/webPages/Mobile';
import Pricing from './pages/webPages/Pricing';
import CalendarView from './pages/admin/Calendar';
import FeaturesPage from './LandingAllPages/FeaturesPage';
import DisconnectQuickbooks from './pages/admin/DisconnectQuickbooks';
import DailyTimesheetManual from "./pages/userManual/DailyTimesheetManual"
import TimerManual from "./pages/userManual/TimerManual"
import WeeklyTimesheetManual from "./pages/userManual/WeeklyTimesheetManual"
import CalenderManual from './pages/userManual/CalenderManual';
import DashboardManual from './pages/userManual/DashboardManual';
import ProjectManual from './pages/userManual/ProjectManual';
import AddUserManual from './pages/userManual/AddUserManual';
import ApproveTimesheetManual from './pages/userManual/ApproveTimesheetManual';
import QuickbooksManual from './pages/userManual/QuickbooksManual';
import TaskManual from './pages/userManual/TaskManual';
import ExpenseAproveManual from './pages/userManual/ExpenseAproveManual';
import ExpenseManual from './pages/userManual/ExpenseManual';
import ReportManual from './pages/userManual/ReportManual';
import ExportManual from './pages/userManual/ExportManual';
import ImportManual from './pages/userManual/ImportManual';
import TechnicalDoc from './pages/TechnicalDoc/TechnicalDoc';
import BackendFile from './pages/TechnicalDoc/BackendFile';
import FrontendFile from './pages/TechnicalDoc/FrontendFile'
import ServerFile from './pages/TechnicalDoc/ServerFile';
import AboutPage from './LandingAllPages/AboutPage';
import ContactSection from './LandingAllPages/ContactSection';
import BlogPage from './LandingAllPages/BlogPage';
import PricePage from './LandingAllPages/PricePage';
import FaqPage from './LandingAllPages/FaqPage';
import FeaturedBlogPage1 from './LandingAllPages/FeaturedBlogPage1';
import FeaturedBlogPage2 from './LandingAllPages/FeaturedBlogPage2';
import FeaturedBlogPage3 from './LandingAllPages/FeaturedBlogPage3';
import FeaturedBlogPage4 from './LandingAllPages/FeaturedBlogPage4';
import FeaturedBlogPage5 from './LandingAllPages/FeaturedBlogPage5';
import FeaturedBlogPage6 from './LandingAllPages/FeaturedBlogPage6';
import FeaturedBlogPage7 from './LandingAllPages/FeaturedBlogPage7';
import FeaturedBlogPage8 from './LandingAllPages/FeaturedBlogPage8';
import FeaturedBlogPage9 from './LandingAllPages/FeaturedBlogPage9';
import FeaturedArticlePage1 from './LandingAllPages/FeaturedArticlePage1';
import FeaturedArticlePage2 from './LandingAllPages/FeaturedArticlePage2';
import FeaturedArticlePage3 from './LandingAllPages/FeaturedArticlePage3';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';



function App() {
  return (
    <MyProvider>
      <div className="App">


        <Routes>
          <Route path="/daily-timesheet-manual" element={<DailyTimesheetManual />} /> 
          <Route path="/timer-manual" element={<TimerManual />} /> 
          <Route path="/weekly-manual" element={<WeeklyTimesheetManual />} /> 
          <Route path="/calender-manual" element={<CalenderManual />} /> 
          <Route path="/dashboard-manual" element={<DashboardManual />} /> 
          <Route path="/project-manual" element={<ProjectManual />} /> 
          <Route path="/add-user-manual" element={<AddUserManual />} /> 
          <Route path="/approve-timesheet-manual" element={<ApproveTimesheetManual />} /> 
          <Route path="/quickbooks-manual" element={<QuickbooksManual />} /> 
          <Route path="/task-manual" element={<TaskManual />} /> 
          <Route path="/expense-manual" element={<ExpenseManual />} /> 
          <Route path="/aprove-expense-manual" element={<ExpenseAproveManual />} /> 
          <Route path="/report-manual" element={<ReportManual />} /> 
          <Route path="/export-manual" element={<ExportManual />} /> 
          <Route path="/import-manual" element={<ImportManual />} /> 
          <Route path="/technical-doc" element={<TechnicalDoc />} /> 
          <Route path="/backend-file-stuc" element={<BackendFile />} /> 
          <Route path="/frontend-file-stuc" element={<FrontendFile />} /> 
          <Route path="/node-server-file-stuc" element={<ServerFile />} /> 
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} /> 
          <Route path="/TermsConditions" element={<TermsConditions />} /> 
          <Route path="/FeaturedArticlePage1" element={<FeaturedArticlePage1 />} /> 
          <Route path="/FeaturedArticlePage2" element={<FeaturedArticlePage2 />} /> 
          <Route path="/FeaturedArticlePage3" element={<FeaturedArticlePage3 />} /> 
          <Route path="/FeaturedBlogPage1" element={<FeaturedBlogPage1 />} /> 
          <Route path="/FeaturedBlogPage2" element={<FeaturedBlogPage2 />} /> 
          <Route path="/FeaturedBlogPage3" element={<FeaturedBlogPage3 />} /> 
          <Route path="/FeaturedBlogPage4" element={<FeaturedBlogPage4 />} /> 
          <Route path="/FeaturedBlogPage5" element={<FeaturedBlogPage5 />} /> 
          <Route path="/FeaturedBlogPage6" element={<FeaturedBlogPage6 />} /> 
          <Route path="/FeaturedBlogPage7" element={<FeaturedBlogPage7 />} /> 
          <Route path="/FeaturedBlogPage8" element={<FeaturedBlogPage8 />} /> 
          <Route path="/FeaturedBlogPage9" element={<FeaturedBlogPage9 />} /> 
          <Route path="/aboutpage" element={<AboutPage />} /> 
          <Route path="/features" element={<FeaturesPage />} />          
          <Route path="/pricepage" element={<PricePage />} />
          <Route path="/blogpage" element={<BlogPage />} />
          <Route path="/faqpage" element={<FaqPage />} />
          <Route path="/contactpage" element={<ContactSection />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/web-page-timesheet" element={<Timesheet />} />
          <Route path="/web-page-expense" element={<Expense />} />
          <Route path="/calendar-timesheet" element={<CalendarView />} />
          <Route path="/web-page-secure-data" element={<SecureData />} />
          <Route path="/web-page-reporting" element={<Reporting />} />
          <Route path="/web-page-receipt" element={<Receipt />} />
          <Route path="/web-page-calculator" element={<Calculator />} />
          <Route path="/web-page-mobile" element={<Mobile />} />
          <Route path="/web-page-pricing" element={<Pricing />} />
          <Route path="/Signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/my-time" element={<AdminDashboard />} />
          <Route path="/task" element={<Task />} />
          <Route path="/project" element={<Project />} />
          <Route path="/profile" element={<AdminProfile />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/my-expense" element={<AdminExpense />} />
          <Route path="/admin-dashboard-v2" element={<AdminDashboardV2 />} />
          <Route path="/weekly-timesheet" element={<AdminWeeklyTimesheet />} />
          <Route path="/timesheet-aprove" element={<TimesheetAprove />} />
          <Route path="/expense-aprove" element={<ExpenseAprove />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/timesheet-reports" element={<TimesheetReport />} />
          <Route path="/expense-reports" element={<ExpenseReport />} />
          <Route path="/quickbooks" element={<Quickbooks />} />
          <Route path="/disconnect-quickbooks" element={<DisconnectQuickbooks />} />
        </Routes>

      </div>
    </MyProvider>
  );
}

export default App;
