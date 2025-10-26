import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import About from "../home/About.jsx";
import Department from "../home/Department.jsx";
import Doctors from "../home/Doctors.jsx";
import CustomerExperience from "../home/Feedback.jsx";
import FeedbackForm from "../home/Review.jsx";
import FunFacts from "../home/Success.jsx";

const Boilerplate = () => {
  return (
   <div className="flex flex-col min-h-[100vh] ">
      <Navbar />
      <div className="flex-1">
        <About />
        <Department />
        <Doctors />
        <FunFacts />
        <CustomerExperience />
        <FeedbackForm />
       </div>
      <Footer />
    </div>
  );
};

export default Boilerplate;
