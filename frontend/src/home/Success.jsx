import React from "react";
import { Link } from "react-router-dom";

const FunFacts = () => {
  return (
    <div className="w-full max-w-[99%] mt-7 relative flex justify-center min-h-[530px]">
      
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7BpE2VjHkXau7u2HhMvkzxlRoMFTvlxIodA&s"
        alt="fun facts background"
        className="w-full h-[530px] sm:h-[535px] lg:h-[530px] object-cover opacity-70"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-blue-600 opacity-60 flex flex-col lg:flex-row items-center justify-center gap-10 px-6">
        
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-3">
          <p className="text-[15px] text-white">FUN FACTS</p>
          <p className="text-4xl font-bold text-white">
            Over 6,781 patients <br />
            trust us
          </p>
          <Link to="/appointment">
            <button className="bg-red-500 h-[50px] max-w-[200px] text-[14px] px-6 font-bold rounded-3xl mt-4 hover:opacity-80 text-white">
              Make an appointment
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:gap-8 text-center">
          <div className="flex flex-col items-center text-white font-bold text-4xl">
            <p>30</p>
            <p className="text-xl font-normal">Years of Experience</p>
          </div>
          <div className="flex flex-col items-center text-white font-bold text-4xl">
            <p>4,500</p>
            <p className="text-xl font-normal">Happy Patients</p>
          </div>
          <div className="flex flex-col items-center text-white font-bold text-4xl">
            <p>65</p>
            <p className="text-xl font-normal">Number of Doctors</p>
          </div>
          <div className="flex flex-col items-center text-white font-bold text-4xl">
            <p>200+</p>
            <p className="text-xl font-normal">Number of Staff</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FunFacts;
