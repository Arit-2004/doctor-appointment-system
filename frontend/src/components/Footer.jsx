import React from "react";

function Footer() {
  return (
    <footer className="!bg-[#e0e0de] shadow-md mt-[20px]">
      <div
        className="p-4 w-full flex flex-col sm:flex-col md:flex-col lg:flex-row justify-between min-h-[200px] sticky bottom-0"
        id="contact"
      >
        {/* Hospital Intro */}
        <div className="introduction flex flex-col gap-2">
          <h2 className="font-bold text-[18px]">XYZ Hospital</h2>
          <p>One of the top hospital in India</p>
          <div className="social flex gap-3 mt-1">
            <i className="fa-brands fa-twitter text-[27px]"></i>
            <i className="fa-brands fa-facebook text-[27px]"></i>
            <i className="fa-brands fa-square-instagram text-[27px]"></i>
          </div>
        </div>

        {/* Departments */}
        <div className="departments flex flex-col gap-2 no-underline mt-2">
          <h3 className="font-semibold text-[18px]">Departments</h3>
          <a href="#" className="!no-underline hover:!underline">
            <i className="fa-solid fa-arrow-right mr-2"></i>Neurology
          </a>
          <a href="#" className="!no-underline hover:!underline">
            <i className="fa-solid fa-arrow-right mr-2"></i>Opthamology
          </a>
          <a href="#" className="!no-underline hover:!underline">
            <i className="fa-solid fa-arrow-right mr-2"></i>Surgical
          </a>
          <a href="#" className="!no-underline hover:!underline">
            <i className="fa-solid fa-arrow-right mr-2"></i>Cardiology
          </a>
          <a href="#" className="!no-underline hover:!underline">
            <i className="fa-solid fa-arrow-right mr-2"></i>Dental
          </a>
        </div>

        {/* Links */}
        <div className="Links flex flex-col gap-2 mt-2">
          <h3 className="font-semibold text-[18px]">Links</h3>
          <a href="#" className="!no-underline hover:!underline">
            <i className="fa-solid fa-arrow-right mr-2"></i>About
          </a>
          <a href="#" className="!no-underline hover:!underline">
            <i className="fa-solid fa-arrow-right mr-2"></i>Departments
          </a>
          <a href="#" className="!no-underline hover:!underline">
            <i className="fa-solid fa-arrow-right mr-2"></i>Doctors
          </a>
          <a href="#" className="!no-underline hover:!underline">
            <i className="fa-solid fa-arrow-right mr-2"></i>Home
          </a>
          <a href="#" className="!no-underline hover:!underline">
            <i className="fa-solid fa-arrow-right mr-2"></i>Contact
          </a>
        </div>

        {/* Services */}
        <div className="Services flex flex-col gap-2 mt-2">
          <h3 className="font-semibold text-[18px]">Services</h3>
          <a href="#" className="!no-underline hover:!underline">
            <i className="fa-solid fa-arrow-right mr-2"></i>Qualified Doctors
          </a>
          <a href="#" className="!no-underline hover:!underline">
            <i className="fa-solid fa-arrow-right mr-2"></i>Outdoors Checkup
          </a>
          <a href="#" className="!no-underline hover:!underline">
            <i className="fa-solid fa-arrow-right mr-2"></i>24 Hours Services
          </a>
          <a href="#" className="!no-underline hover:!underline">
            <i className="fa-solid fa-arrow-right mr-2"></i>Emergency Services
          </a>
        </div>

        {/* Contact / Questions */}
        <div className="Questions flex flex-col gap-2 mt-3">
          <h3 className="font-semibold text-[18px]">Have a Questions ?</h3>
          <a href="#" className="!no-underline hover:!underline">
            <i className="fa-solid fa-location-dot mr-2"></i>Kolkata, India
          </a>
          <a href="tel:+918547XXXX96" className="!no-underline hover:!underline">
            <i className="fa-solid fa-phone mr-2"></i>+91 8547****96
          </a>
          <a href="mailto:xyz@gmail.com" className="!no-underline hover:!underline">
            <i className="fa-solid fa-envelope mr-2"></i>xyz@gmail.com
          </a>
        </div>
      </div>

      <p className="text-center font-bold mt-3">
        Copyright 2025 All rights reserved |
      </p>
    </footer>
  );
}

export default Footer;
